angular.module('detailApp').controller('detailerScheduleCtrl', function($scope, $http, $injector, $compile, detailerScheduleService, detailerCalService, scheduledAppts, apptDetails, authCheck){


    $scope.currentUser = authCheck.data.passport.user.user;

    $scope.insertNav = function() {
        document.getElementById('navigation').style.display = "block";
        document.getElementById('my-vehicles').style.display = "none";        
    };
    $scope.insertNav();

    document.getElementById('nav-profile-name').innerHTML = $scope.currentUser.companyname;
    document.getElementById('nav-profile-car').innerHTML = "";

    var arr = apptDetails.data;
    for (var i = 0; i < arr.length ; i++ ) {
        if (arr[i].appointmentdate) {
            arr[i].appointmentdate = JSON.parse(arr[i].appointmentdate);
        }
        if (arr[i].endtime) {
            arr[i].apptTitle = arr[i].starttime + " - " + arr[i].endtime;
        }
    }

    var day = new Date().getDate();
    var month = new Date().getMonth();
    var year = new Date().getFullYear();
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];    

    var fullAppts = scheduledAppts.data;
    var filteredAppts = [];
    for (var x = 0; x < fullAppts.length ; x++ ) {
        fullAppts[x].appointmentdate = JSON.parse(fullAppts[x].appointmentdate);
        fullAppts[x].car = JSON.parse(fullAppts[x].car);
        fullAppts[x].location = JSON.parse(fullAppts[x].location);
        fullAppts[x].apptTitle = arr[x].apptTitle;
        if (fullAppts[x].appointmentdate.day !== day && month_name.indexOf(fullAppts[x].appointmentdate.month) !== month && fullAppts[x].appointmentdate.year !== year) {
        }
        else if (fullAppts[x].appointmentdate.day === day && month_name.indexOf(fullAppts[x].appointmentdate.month) === month && fullAppts[x].appointmentdate.year === year) {
            filteredAppts.push(fullAppts[x]);
        }
    }

    $scope.scheduledAppointments = filteredAppts;

    detailerCalService.loadCal(arr);

    $scope.ngClick = function() {
        for (var i = 0; i < 32; i++) {
    
            if(document.getElementById('day'+[i])) {
                var el = document.getElementById("day"+[i]);
                el.setAttribute("ng-click", "selectDate($event)");
                var element = angular.element(document.querySelector('#day'+[i]));
                $compile(element)($scope);
            }
            if (document.getElementById('day_today_schedule')){
                var el = document.getElementById('day_today_schedule');
                el.setAttribute("ng-click", "selectDate($event)");
                var element = angular.element(document.querySelector('day_today_schedule'));
                $compile(element)($scope);
            }
        }
    };

    $scope.setDateBack = function(){
        detailerCalService.setDateBack(arr);
        $scope.ngClick();
    };
    $scope.setDate = function(){
        detailerCalService.setDate(arr);
        $scope.ngClick();
    };

    $scope.selectDate = function(event) {
        $scope.scheduledAppointments = [];
        day = parseInt(event.target.innerText);
        var monthYear = document.getElementById('schedule-month-year').innerText.split(" ");
        month = month_name.indexOf(monthYear[0]);
        year = parseInt(monthYear[1]);
        var count = 0;
        for (var x = 0; x < fullAppts.length ; x++ ) {
            if (fullAppts[x].appointmentdate.day === day && month_name.indexOf(fullAppts[x].appointmentdate.month) === month && fullAppts[x].appointmentdate.year === year) {
                $scope.scheduledAppointments[count] = fullAppts[x];
                count++;
            }
        }
        detailerCalService.selectDate(event, arr);
        $scope.ngClick();
    };

    for (var i = 0; i < 32; i++) {

        if(document.getElementById('day'+[i])) {
            var el = document.getElementById("day"+[i]);
            el.setAttribute("ng-click", "selectDate($event)");
            var element = angular.element(document.querySelector('#day'+[i]));
            $compile(element)($scope);
        }
        if (document.getElementById('day_today_schedule')){
            var el = document.getElementById('day_today_schedule');
            el.setAttribute("ng-click", "selectDate($event)");
            var element = angular.element(document.querySelector('day_today_schedule'));
            $compile(element)($scope);
        };
    }

    $scope.cancel = function(index) {
        detailerScheduleService.cancel(index);
    };

    $scope.markComplete = function(index) {
        detailerScheduleService.markComplete(index);
    };

    $scope.confirmComplete = function(index) {
        var appointment = $scope.scheduledAppointments[index];
        detailerScheduleService.confirmComplete(index, appointment);
    };



});