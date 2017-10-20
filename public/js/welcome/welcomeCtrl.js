angular.module('detailApp').controller('welcomeCtrl', function($scope, welcomeService){

    $scope.removeNav = function() {
        console.log("ran");
        document.getElementById('navigation').style.display = "none";
    };

    $scope.removeNav();
    
});