angular.module('detailApp').controller('addCarsCtrl', function($scope, $state, $http, authCheck){

    $scope.currentUser = authCheck.data.passport.user.user;
    
    
    
        $scope.insertNav = function() { document.getElementById('navigation').style.display = "block"; };
        $scope.insertNav();
        document.getElementById('nav-profile-name').innerHTML = $scope.currentUser.name;    
        
        $scope.getCars = function() {
            $http.get('/api/users/getCars').then(function(res) { 
                document.getElementById('nav-profile-car').innerHTML = res.data[0].year + " " + res.data[0].make + " " + res.data[0].model; 
                $scope.cars = res.data;
                console.log($scope.cars);         
            });
        };
    
        $scope.getCars();
        $scope.addCar = function() {
            if ($scope.year === undefined || $scope.make === undefined || $scope.model === undefined) {
                document.getElementById('add-car-err').style.display = 'block';
                
            }
            if ($scope.year === null || $scope.make === null || $scope.model === null) {
                document.getElementById('add-car-err').style.display = 'block';
                
            }
            else {
                document.getElementById('add-car-err').style.display = 'none';
                var newCar = {
                    userid: $scope.currentUser.id,
                    year: $scope.year,
                    make: $scope.make,
                    model: $scope.model
                };

                $http.post('/api/users/addNewCar', newCar).then(function(){
                    $state.reload('addCars');
                });
            }
        };

        $scope.removeCar = function(index) {

            document.getElementById('car'+index).style.opacity = "0";
    
            setTimeout(function(){
                    document.getElementById('car'+index).style.display = "none";
                    $http.post('api/users/removeCar', {id: $scope.cars[index].vehicleid});
            }, 305);
            
        };

});
    