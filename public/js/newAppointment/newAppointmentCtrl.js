angular.module('detailApp').controller('newAppointmentCtrl', function(
    $scope, $http, $state, mainService, newAppointmentService, selectCarService, selectTimeService, dateSelectionService, selectPackagesService){

    ///// DEFINE USER & CARS ////////////
    $scope.packages = newAppointmentService.packages;
    $scope.cars = newAppointmentService.cars;

    ///// AUTH CHECK ////////////
    $scope.getUser = function() {
        $http.get('/authcheck').then(function(res){
            $scope.currentUser = res.data.passport.user.user;
            document.getElementById('nav-profile-name').innerHTML = $scope.currentUser.name;                
        })
        .catch(function(err){
            $state.go('login');
        });
    };
    $scope.getUser();


    ///// CREATE APPOINTMENT ////////////
    $scope.appointment = {
        car: "Choose A Car",
        location: "",
        date: dateSelectionService.defaultDate,
        start: "Start",
        end: "End",
        package: '',
        instructions: '',
        userid: '',
    };


    ///// FUNCTION VARIABLES - FOR CHECKS ////////////
    var selectedCar = $scope.appointment.car;
    var start = $scope.appointment.start;
    var end = $scope.appointment.end;
    var startTime;

    
    ///// GET CARS ON REFRESH ////////////
    $scope.getCars = function() {
        $http.get('/api/users/getCars').then(function(res) { 
            $scope.cars = res.data;
            $scope.appointment.userid = res.data[0].userid;
            document.getElementById('nav-profile-car').innerHTML = res.data[0].year + " " + res.data[0].make + " " + res.data[0].model; 
        });
    };
    if(!$scope.cars) {
        $scope.getCars();
    }
        
    
    ///// GET PACKAGES ON REFRESH ////////////
    $scope.getPackages = function() {
        $http.get('/api/users/getPackages').then(function(res) { 
            $scope.packages = res.data;
        });
    };
    if(!$scope.packages) {
        $scope.getPackages();
    }


    ///// INSERT NAVIGATION DIRECTIVE ////////////
    $scope.insertNav = function() {
        document.getElementById('navigation').style.display = "block";
    };
    $scope.insertNav();


    ///// SELECT CAR FUNCTIONS ////////////
    $scope.showCars = function() {
        selectCarService.showCars();
    };
    $scope.hideCars = function() {
        selectCarService.hideCars();
    };
    $scope.selectCar = function(car) { 
        $scope.appointment.car = car.car;
        selectedCar = car.car.year + " " + car.car.make + " " + car.car.model;
        selectCarService.selectCar(car);
        this.validateForm(selectedCar, start, end);
    };
        
    
    ///// SELECT DATE FUNCTIONS ////////////
    $scope.showCal = function() {
        dateSelectionService.showCal();
    };
    $scope.hideCal = function() {
        dateSelectionService.hideCal();
    };
    $scope.setDate = function() {
        dateSelectionService.setDate();
    };
    $scope.setDateBack = function() { dateSelectionService.setDateBack();}; 
    selectDate = function(event) { dateSelectionService.selectDate(event); 
        if (!dateSelectionService.dateInformation) {
            return;
        }
        else {
            $scope.appointment.date = dateSelectionService.dateInformation;
        }
    }; 


    ///// SELECT TIME FUNCTIONS ////////////
    $scope.showStartTimes = function() {
        startTime = ''; selectTimeService.showStartTimes();
    };
    $scope.hideStartTimes = function() {
        selectTimeService.hideStartTimes();
    };
    $scope.showEndTimes = function() { 
        var index = startTime;
        var times = document.getElementsByClassName('form-option3');
        for (var key in times) {
            if (times[key].innerHTML === startTime) {
                index = key;
                selectTimeService.showEndTimes(index);
                return;}
            if (!startTime) {
                break;}
            } 
        selectTimeService.showEndTimes(index);
    };
    $scope.hideEndTimes = function() {
        selectTimeService.hideEndTimes();
    };
    $scope.selectStartTime = function(elem) {
        $scope.appointment.start = elem.elem; 
        start = $scope.appointment.start;
        startTime = elem.elem;
        selectTimeService.selectStartTime(elem);
        this.validateForm(selectedCar, start, end);
    };
    $scope.selectEndTime = function(elem) {
        $scope.appointment.end = elem.elem;
        end = $scope.appointment.end;
        selectTimeService.selectEndTime(elem);
        this.validateForm(selectedCar, start, end);
    };


    ///// SELECT PACKAGE FUNCTIONS ////////////
    $scope.showDesc = function($index) {
        selectPackagesService.showDesc($index); };

    $scope.hideDesc = function($index) {
        selectPackagesService.hideDesc($index); };

    $scope.checkBox = function($index, value) { 
        selectPackagesService.checkBox($index);
        this.validateForm(selectedCar, start, end);
        $scope.appointment.package = newAppointmentService.selectedPackage; };


    ///// SUBMIT NEW APPT FUNCTIONS ////////////
    showInfo = function() {
        var location;
        $scope.appointment.instructions = $scope.instructions;
        $scope.appointment.userid = $scope.cars[0].userid;
        if(!$scope.locationInput){
            var currentLocation = function() {
                $http.get('/api/users/currentLocation').then(function(res){
                    location = JSON.parse(res.data);
                    var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+ location.lat + ',' + location.lon + '&key=AIzaSyAk4TE1NnSEhExlnj46a-_1TuBkktgZzzc';
                    $http.get(url).then( function(res) {
                        location.address = res.data.results[0].formatted_address;
                        var id = $scope.appointment.userid;
                        var date = $scope.appointment.date;
                        var start = $scope.appointment.start;
                        var end = $scope.appointment.end;
                        var package = $scope.appointment.package;
                        var car = $scope.appointment.car;
                        var instructions = $scope.appointment.instructions || "";
                        $http.post('/api/users/createAppointment', {id: id, date: date, location: location, start: start, end: end, package: package, car: car, instructions: instructions}).then(function(res){
                            $state.go('complete');
                        });
                    });
                });
            };
            currentLocation();
        }
        else {
            var location = {};
            location.address = $scope.locationInput;
            var query = location.address.split(" ").join("+");
            var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ query + '&key=AIzaSyAk4TE1NnSEhExlnj46a-_1TuBkktgZzzc';
            $http.get(url).then( function(res){
                location.lat = res.data.results[0].geometry.location.lat;
                location.lon = res.data.results[0].geometry.location.lng;
                var id = $scope.appointment.userid;
                var date = $scope.appointment.date;
                var start = $scope.appointment.start;
                var end = $scope.appointment.end;
                var package = $scope.appointment.package;
                var car = $scope.appointment.car;
                var instructions = $scope.appointment.instructions || "";
                $http.post('/api/users/createAppointment', {id: id, date: date, location: location, start: start, end: end, package: package, car: car, instructions: instructions}).then(function(res){
                    $state.go('complete');
                });
            });
        }
    };

    $scope.validateForm = function(selectedCar, start, end) {
        newAppointmentService.valid(selectedCar, start, end); };

    });