angular.module('detailApp').service('registerService', function($http, loginService, $state){

    this.restrict4 = function(year) {
        if (document.getElementById('year').value.length >= 4) {
            document.getElementById('year').value = document.getElementById('year').value.slice(0,4); 
        }
    };

    this.restrict5 = function(zip) {
        if (document.getElementById('zip').value.length >= 5) {
            document.getElementById('zip').value = document.getElementById('zip').value.slice(0,5); 
        }
    };

    this.createUser = function(username, password, firstName, usertype, location, car) {
        var year = car.year;
        var make = car.make;
        var model = car.model;
        $http.post('/auth/register/user', { username, password, firstName, usertype, location, year, make, model }).then(function(response) {
            loginService.authorizeUser(username, password);
        }).catch(function(err){
            console.log(err);
            $state.go('/');
        });
    };

    this.createDetailer = function(username, password, companyName, usertype, zipcode) {
        $http.post('/auth/register/detailer', { username, password, companyName, usertype, zipcode }).then(function(response) {
            console.log('added');
            loginService.authorizeUser(username, password);
        }).catch(function(err){
            console.log(err);
            $state.go('/');
        });
    };
            

    });