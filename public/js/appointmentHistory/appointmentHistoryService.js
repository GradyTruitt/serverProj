angular.module('detailApp').service('appointmentHistoryService', function($http){

    this.showFeedback = function(index) {
        console.log(index);
        document.getElementById('uparrow'+index).style.display = "block";
        document.getElementById('downarrow'+index).style.display = "none";
        document.getElementById('feedback-div'+index).style.display = "block";
    };

    this.hideFeedback = function(index) {
        document.getElementById('uparrow'+index).style.display = "none";
        document.getElementById('downarrow'+index).style.display = "block";
        document.getElementById('feedback-div'+index).style.display = "none";
    };

    this.checkBox = function(index, value) {
        for (var i = 1; i <= 5; i++) {
            document.getElementById('checked'+ i + index).style.display = "none";
            if (i === value) {
                document.getElementById('checked'+ i + index).style.display = "block";
            }
        }
    };

    this.submitFeedback = function(index, feedback) {
        document.getElementById('submitted'+index).style.display = "flex";
        document.getElementById('feedback-div'+index).style.display = "none";
        document.getElementById('leave-feedback'+index).style.display = "none";
        $http.post('/api/users/submitFeedback', feedback);
    };

    this.removeItem = function(index, id) {
        document.getElementById('hist-list-item'+index).style.marginLeft = "-100%";
        document.getElementById('hist-list-item'+index).style.marginRight = "100%";
        document.getElementById('hist-list-item'+index).style.opacity = "0";

        setTimeout(function(){
                document.getElementById('hist-list-item'+index).style.display = "none";
                $http.post('/api/users/removeHistory', {id: id});
        }, 505);
        
    };

});
    