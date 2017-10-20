angular.module('detailApp').service('newAppointmentService', function($http, $state){
    

    this.cars;
    this.packages;
    this.selectedPackage = '';
    
    this.valid = function(selectedCar, start, end) {
    var validForm = false;
    var checks = document.getElementsByClassName('checked');
    var packages = document.getElementsByClassName('package-title');
    
        if (selectedCar === "Choose A Car" || start === "Start" || end === "End") {
        }
        else {
            for (var i = 0; i < checks.length; i++) {
                if (checks[i].style.display === "none") { }
                if (checks[i].style.display === "block") {
                    this.selectedPackage = packages[i].innerHTML;
                    validForm = true;}
            }
            if (validForm === true) {
                document.getElementById('next-btn-newAppt').setAttribute('onclick', 'showInfo()');
                document.getElementById('next-btn-newAppt').style.backgroundColor = "#10EE2A";
                document.getElementById('next-btn-newAppt').style.border = "none";
                document.getElementById('next-btn-txt').style.color = "#000620";
            }
        }
    };

});