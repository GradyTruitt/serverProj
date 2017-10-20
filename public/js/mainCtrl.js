angular.module('detailApp').controller('mainCtrl', function($scope, $http, $state, mainService){

    $scope.showNav = function() {
        document.getElementById('nav-item-container').style.display = 'block';
        setTimeout(function(){
            document.getElementById('nav-item-container').style.opacity = '1';
            document.getElementById('nav-items-tray').style.marginRight = '0';
        },50);
    };


    $scope.hideNav = function() {
        document.getElementById('nav-item-container').style.opacity = '0';
        document.getElementById('nav-items-tray').style.marginRight = '-70%';
        setTimeout(function(){
            document.getElementById('nav-item-container').style.display = 'none';
        },305);
    };

    $scope.logout = function() {
        document.getElementById('my-vehicles').style.display = "block";        
        $http.get('/auth/logout').then(function() {
            $state.go('welcome');
        });
    };

});