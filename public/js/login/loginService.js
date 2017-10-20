angular.module('detailApp').service('loginService', function($http, $state, mapService){
    
    this.authorizeUser = function(username, password) {
        $http.post('/auth/login', { username, password }).then(function(response) {
            if (response.data.passport.user.user.usertype === 'customer') {
            $state.go('userhome');
            }
            if (response.data.passport.user.user.usertype === 'detailer') {
                $state.go('detailerHome');
            }
        });
    };

     if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(position){
            mapService.ln = position.coords.longitude;
            mapService.la = position.coords.latitude;
        });
    }
    else {console.log('no location');}
    
});