angular.module('detailApp').service('detailerScheduleService', function($http){

    this.cancel = function(index) {
        document.getElementById("mark-complete"+index).style.display = "block";
        document.getElementById("cancel-btn"+index).style.display = "none";
        document.getElementById("confirm-complete"+index).style.display = "none";
    };

    this.markComplete = function(index) {
        document.getElementById("mark-complete"+index).style.display = "none";
        document.getElementById("cancel-btn"+index).style.display = "block";
        document.getElementById("confirm-complete"+index).style.display = "block";
    };

    this.confirmComplete = function(index, appointment) {
        document.getElementById("scheduled-appts-item"+index).style.marginLeft = "-100%";
        document.getElementById("scheduled-appts-item"+index).style.marginRight = "100%";
        document.getElementById("scheduled-appts-item"+index).style.opacity = "0";
        
        setTimeout(function(){
                document.getElementById("scheduled-appts-item"+index).style.display = "none";
        }, 300);

        appointment.day = appointment.appointmentdate.day;
        appointment.month = appointment.appointmentdate.month;
        appointment.year = appointment.appointmentdate.year;
        appointment.deletehistoryid = appointment.userid;

        $http.post('/api/detailers/completeAppt', appointment).then(function (res){
        });
    };
    

    });