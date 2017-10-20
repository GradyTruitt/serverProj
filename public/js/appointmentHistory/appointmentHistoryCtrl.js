angular.module('detailApp').controller('appointmentHistoryCtrl', function($scope, $http, appointmentHistoryService, appointmentHistory, authCheck){
    
    
    if (appointmentHistory.data[0]){
        $scope.historyList = appointmentHistory.data.reverse();
    }
    if (!appointmentHistory.data[0]){
        $scope.historyList = [];
    }

    $scope.currentUser = authCheck.data.passport.user.user;

    $scope.insertNav = function() {
        document.getElementById('navigation').style.display = "block";
    };
    $scope.insertNav();   
    
    $scope.getCars = function() {
        $http.get('/api/users/getCars').then(function(res) { 
            document.getElementById('nav-profile-car').innerHTML = res.data[0].year + " " + res.data[0].make + " " + res.data[0].model;
            document.getElementById('nav-profile-name').innerHTML = $scope.currentUser.name; 
        });
    };
    $scope.getCars();

    $scope.removeBorder = function(id) {
            setTimeout(function() {
            document.getElementById(id).style.border = "2px solid transparent";                    
        },2000);
    };

    angular.element(document).ready(function () {
        for ( var i = 0; i < $scope.historyList.length; i++) {
            if ($scope.historyList[i].feedback !== null ) {
                document.getElementById('leave-feedback' + i).style.display = "none";
                document.getElementById('leave-feedback' + i).style.display = "none";
                document.getElementById('rating-img' + i).style.display = "block";
            }
            if ($scope.historyList[i].completed === null) {
                document.getElementById('hist-list-item' + i).style.border = "2px solid #10EE2A";
                $http.post('/api/users/updateHistory', {id: $scope.historyList[i].id});
                $scope.removeBorder("hist-list-item"+i);
            }
        }
    });

    $scope.showFeedback = function(index) {
        appointmentHistoryService.showFeedback(index);
    };

    $scope.hideFeedback = function(index) {
        appointmentHistoryService.hideFeedback(index);
    };

    $scope.checkBox = function(index, event) { 
        var value = parseInt(event.srcElement.attributes[0].value);
        appointmentHistoryService.checkBox(index, value);
        $scope.feedbackRating = value;
    };

    $scope.submitFeedback = function(index) {
        var feedback = {
        txt: document.getElementById('input'+index).value,
        rating: $scope.feedbackRating,
        userid: $scope.historyList[index].userid,
        detailerid: $scope.historyList[index].detailerid,
        id: $scope.historyList[index].id,
        name: $scope.currentUser.name,
        feedbackdate: {
            day: $scope.historyList[index].apptday,
            month: $scope.historyList[index].apptmonth,
            year: $scope.historyList[index].apptyear
        }
        };
        appointmentHistoryService.submitFeedback(index, feedback);
    };

    $scope.removeItem = function(index) {
        var id = $scope.historyList[index].id;
        appointmentHistoryService.removeItem(index, id);
    };

    for ( var i = 0; i < $scope.historyList.length; i++) {
        if ($scope.historyList[i].feedback !== null ) {

            if (parseFloat($scope.historyList[i].feedback) < 0.5) {
                $scope.historyList[i].feedback = '../assets/0st.svg';
            }
            if (parseFloat($scope.historyList[i].feedback) >= 0.5 && parseFloat($scope.historyList[i].feedback) < 1) {
                $scope.historyList[i].feedback = '../assets/0_5st.svg';
            }
            if (parseFloat($scope.historyList[i].feedback) >= 1 && parseFloat($scope.historyList[i].feedback) < 1.5) {
                $scope.historyList[i].feedback = '../assets/1st.svg';
            }
            if (parseFloat($scope.historyList[i].feedback) >= 1.5 && parseFloat($scope.historyList[i].feedback) < 2) {
                $scope.historyList[i].feedback = '../assets/1_5st.svg';
            }
            if (parseFloat($scope.historyList[i].feedback) >= 2 && parseFloat($scope.historyList[i].feedback) < 2.5) {
                $scope.historyList[i].feedback = '../assets/2st.svg';
            }
            if (parseFloat($scope.historyList[i].feedback) >= 2.5 && parseFloat($scope.historyList[i].feedback) < 3) {
                $scope.historyList[i].feedback = '../assets/2_5st.svg';
            }
            if (parseFloat($scope.historyList[i].feedback) >= 3 && parseFloat($scope.historyList[i].feedback) < 3.5) {
                $scope.historyList[i].feedback = '../assets/3st.svg';
            }
            if (parseFloat($scope.historyList[i].feedback) >= 3.5 && parseFloat($scope.historyList[i].feedback) < 4) {
                $scope.historyList[i].feedback = '../assets/3_5st.svg';
            }
            if (parseFloat($scope.historyList[i].feedback) >= 4 && parseFloat($scope.historyList[i].feedback) < 4.5) {
                $scope.historyList[i].feedback = '../assets/4st.svg';
            }
            if (parseFloat($scope.historyList[i].feedback) >= 4.5 && parseFloat($scope.historyList[i].feedback) < 5) {
                $scope.historyList[i].feedback = '../assets/4_5st.svg';
            }
            if (parseFloat($scope.historyList[i].feedback) >= 5) {
                $scope.historyList[i].feedback = '../assets/5st.svg';
            }
            
            }
            if ($scope.historyList[i].feedback === null ) {
            $scope.historyList[i].feedback = null;
            }
        }

    
});