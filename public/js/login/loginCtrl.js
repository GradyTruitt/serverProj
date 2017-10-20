angular.module('detailApp').controller('loginCtrl', function($scope, loginService){

    $scope.removeNav = function() {
        document.getElementById('navigation').style.display = "none"; };

    $scope.removeNav();
    
    $scope.showUserInfo = function() {
        var username = $scope.username;
        var password = $scope.password;
        loginService.authorizeUser(username, password);
    };

});