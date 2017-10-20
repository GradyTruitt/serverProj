angular.module('detailApp').controller('userHomeCtrl', function($scope, $http, $compile, mainService, userHomeService, mapService, authCheck, newAppointmentService, fullHistory){
    

    $scope.showCompleteNotification = function() {

            setTimeout( function() {
                document.getElementById('notification-complete').style.opacity = "1";
                document.getElementById('notification-complete').style.top = "78px";
            },50);

            setTimeout( function() {
                document.getElementById('notification-complete').style.top = "0";
                document.getElementById('notification-complete').style.transitionDuration = "500ms";
                
            },2350);

            setTimeout( function() {
                document.getElementById('notification-complete').style.display = "none";
            },3350);

    };

    for (var i = 0; i< fullHistory.data.length; i++) {
        if (fullHistory.data[i].completed === null) {
            $scope.showCompleteNotification();
            break;
        }
    }

    if (!fullHistory.data[0]) {
        $scope.lastAppointmentDay = 'no appointments.';
        $scope.lastAppointmentMonth = "Sorry";
        document.getElementById('last-appt-date').style.fontWeight = "300";
        document.getElementById('last-appt-date').style.color = "#9CB4C4";
        document.getElementById('last-appt-date').style.fontSize = "16pt";
    }
    else{
        $scope.lastAppointmentDay = fullHistory.data[0].apptday;
        $scope.lastAppointmentMonth = fullHistory.data[0].apptmonth;
    }

    $scope.currentUser = authCheck.data.passport.user.user;
    mapService.userID = $scope.currentUser.id;
    mainService.currentUser = authCheck.data.passport.user.user;
    mapService.oldlon = JSON.parse($scope.currentUser.currentlocation).lon;
    mapService.oldlat = JSON.parse($scope.currentUser.currentlocation).lat;
    mapService.loadMap();
    document.getElementById('nav-profile-name').innerHTML = $scope.currentUser.name;

    $scope.getCars = function(newAppointmentService) {
        $http.get('/api/users/getCars').then(function(res) { 
            document.getElementById('nav-profile-car').innerHTML = res.data[0].year + " " + res.data[0].make + " " + res.data[0].model;            
            newAppointmentService.cars = res.data; }); };
        
    $scope.getCars(newAppointmentService);

    $scope.insertNav = function() { 
        document.getElementById('navigation').style.display = "block";
        document.getElementsByClassName('mapboxgl-ctrl-logo')[0].style.display = "none";
        document.getElementsByClassName('mapboxgl-ctrl')[0].style.display = "none"; 
        document.getElementsByClassName('mapboxgl-ctrl-attrib')[0].style.display = "none";
    };
    $scope.insertNav();

    $scope.getPackages = function() {
        $http.get('api/users/getPackages').then(function(res){
            newAppointmentService.packages = res.data; }); };

    $scope.getPackages(newAppointmentService);

    $http.get('api/users/getBids').then(function(res) {
        if(res.data[0]) {
            $scope.bidCount = res.data.length;
        }
        else {
            $scope.bidCount = 0;
        }
    });

});