angular.module('detailApp').controller('jobFeedCtrl', function($scope, $http, authCheck, newAppointments, jobFeedService, updateRating){
    

    for(var key in newAppointments.data) {
        if (newAppointments.data[key].appointmentdate) {
            newAppointments.data[key].appointmentdate = JSON.parse(newAppointments.data[key].appointmentdate);
        }
        if (newAppointments.data[key].car) {
            newAppointments.data[key].car = JSON.parse(newAppointments.data[key].car);
        }
        if (newAppointments.data[key].location) {
            newAppointments.data[key].location = JSON.parse(newAppointments.data[key].location);
        }

    }
    
    $scope.newAppts = newAppointments.data;

    $scope.insertNav = function() {
        document.getElementById('navigation').style.display = "block";
        document.getElementById('my-vehicles').style.display = "none";        
    };
    $scope.insertNav();

    $scope.placeBid = function(index) {
        jobFeedService.placeBid(index);
    };

    $scope.completeBid = function(index) {
        
        var params = {};
        params.id = $scope.newAppts[index].id;
        params.userid = $scope.newAppts[index].userid;
        params.detailerid = authCheck.data.passport.user.user.id;
        params.appointmentdate = $scope.newAppts[index].appointmentdate;
        params.starttime = $scope.newAppts[index].starttime;
        params.endtime = $scope.newAppts[index].endtime;
        params.location = $scope.newAppts[index].location;
        params.car = $scope.newAppts[index].car;
        params.instructions = $scope.newAppts[index].instructions;
        params.package = $scope.newAppts[index].package;
        params.bidprice = document.getElementById('bid-input'+index).value;
        params.detailername = authCheck.data.passport.user.user.companyname;
        params.detailerrating = updateRating;

        jobFeedService.completeBid(index, params);
    };

});
    