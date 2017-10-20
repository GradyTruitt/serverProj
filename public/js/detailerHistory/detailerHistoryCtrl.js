angular.module('detailApp').controller('detailerHistoryCtrl', function($scope, appointmentHistory){
    
    $scope.historyList = appointmentHistory.data;

    $scope.insertNav = function() {
        document.getElementById('navigation').style.display = "block";
        document.getElementById('my-vehicles').style.display = "none";
    };
    $scope.insertNav();
    
});