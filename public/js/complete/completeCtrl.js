angular.module('detailApp').controller('completeCtrl', function($scope, $http, authCheck){
    
    $scope.currentUser = authCheck.data.passport.user.user;
    document.getElementById('nav-profile-name').innerHTML = $scope.currentUser.name;

    $scope.getCars = function() {
        $http.get('/api/users/getCars').then(function(res) { 
            document.getElementById('nav-profile-car').innerHTML = res.data[0].year + " " + res.data[0].make + " " + res.data[0].model;            
         });
        };
        
    $scope.getCars();

    $scope.insertNav = function() { 
        document.getElementById('navigation').style.display = "block";
    };
    $scope.insertNav();

    setTimeout( function() {
        document.getElementById('dot').style.opacity = "1";
        document.getElementById('dot').style.marginBottom = "-12px";
        document.getElementById('animation-logo').style.opacity = "1";
        document.getElementById('animation-logo').style.width = "150px";
        document.getElementById('heading').style.opacity = "1";
        document.getElementById('complete-divider').style.opacity = "1";
        document.getElementById('complete-blurb').style.opacity = "1";
        document.getElementById('animation-logo').style.opacity = "1";
        document.getElementById('finish-button').style.opacity = "1";
        document.getElementById('finish-button').style.marginTop = "10%";
        document.getElementById('finish-button').style.marginBottom = "30%";
    }, 200);

    });