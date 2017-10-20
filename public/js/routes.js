angular.module('detailApp').config(function($stateProvider, $urlRouterProvider) {
    
        $urlRouterProvider.otherwise('/newappointment');
    
        $stateProvider
            .state('welcome', {
                templateUrl: './views/welcome.html',
                url: '/',
                controller: 'welcomeCtrl'
            })
            .state('register', {
                templateUrl: './views/register.html',
                url: '/register',
                controller: 'registerCtrl'
            })
            .state('login', {
                templateUrl: './views/login.html',
                url: '/login',
                controller: 'loginCtrl'
            })
            .state('newappointment', {
                templateUrl: './views/newAppointment.html',
                url: '/newappointment',
                controller: 'newAppointmentCtrl',
                resolve: {
                    authCheck($http, $state) {
                        return $http.get('/authcheck')
                        .catch(function(err){
                            $state.go('login');
                        });
                    }
                }
            })
            .state('complete', {
                templateUrl: './views/complete.html',
                url: '/complete',
                controller: 'completeCtrl',
                resolve: {
                    authCheck($http, $state) {
                        return $http.get('/authcheck')
                        .catch(function(err){
                            $state.go('login');
                        });
                    }
                }
            })
            .state('userhome', {
                templateUrl: './views/userHome.html',
                url: '/home/user',
                controller: 'userHomeCtrl',
                resolve: {
                    authCheck($http, $state) {
                        return $http.get('/authcheck')
                        .catch(function(err){
                            $state.go('login');
                        });
                    },
                    fullHistory($http, $state) {
                        return $http.get('/api/users/fullHistory');
                    }
                }
            })
            .state('userPendingBids', {
                templateUrl: './views/userPendingBids.html',
                url: '/userPendingBids',
                controller: 'userPendingBidsCtrl',
                resolve: {
                    authCheck($http, $state) {
                        return $http.get('/authcheck')
                        .catch(function(err){
                            $state.go('login');
                        });
                    },
                    pendingBids($http, $state) {
                        return $http.get('api/users/getBids')
                        .catch(function(err){
                            console.log('No bids To Display');
                        });
                    }
                }
            })
            .state('appointmentHistory', {
                templateUrl: './views/appointmentHistory.html',
                url: '/appointmentHistory',
                controller: 'appointmentHistoryCtrl',
                resolve: {
                    authCheck($http, $state) {
                        return $http.get('/authcheck')
                        .catch(function(err){
                            $state.go('login');
                        });
                    },
                    appointmentHistory($http, $state) {
                        return $http.get('/api/users/appointmentHistory');
                    }
                }
            })
            .state('detailerHistory', {
                templateUrl: './views/detailerHistory.html',
                url: '/detailerHistory',
                controller: 'detailerHistoryCtrl',
                resolve: {
                    authCheck($http, $state) {
                        return $http.get('/authcheck')
                        .catch(function(err){
                            $state.go('login');
                        });
                    },
                    appointmentHistory($http, $state) {
                        return $http.get('/api/detailers/detailerHistory');
                    }
                }
            })
            .state('detailerHome', {
                templateUrl: './views/detailerHome.html',
                url: '/home/detailer',
                controller: 'detailerHomeCtrl',
                params: {

                },
                resolve: {
                    authCheck2($http, $state) {
                        return $http.get('/authcheck')
                        .catch(function(err){
                            $state.go('login');
                        });
                    },
                    apptDetails($http, $state) {
                        return $http.get('/api/detailers/scheduledAppts/details').then(function(res) {
                            var day = new Date().getDate();
                            var month = new Date().getMonth();
                            var year = new Date().getFullYear();
                            var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
                            var arr = res.data;
                            var newArr = [];
                            for (var i = 0; i < arr.length ; i++ ) {
                                if (arr[i].appointmentdate) {
                                    arr[i].appointmentdate = JSON.parse(arr[i].appointmentdate);
                                }
                                if (arr[i].appointmentdate.day === day && month_name.indexOf(arr[i].appointmentdate.month) === month && arr[i].appointmentdate.year === year) {
                                    newArr.push(arr[i]);
                                }
                        
                            }
                            return newArr;  
                        })
                        .catch(function(err){
                            console.log('No Appointments To Display');
                        });
                    },
                    updateRating($http) {
                        return $http.get('/api/detailers/updateRating').then( function(res) {
                            var rating = 0;
                            for (var i = 0; i < res.data.length; i++) {
                                rating = rating + parseFloat(res.data[i].rating);
                            }
                            return rating / res.data.length;
                        });
                    } 
                }
            })
            .state('jobFeed', {
                templateUrl: './views/jobFeed.html',
                url: '/jobFeed',
                controller: 'jobFeedCtrl',
                resolve: {
                    authCheck($http, $state) {
                        return $http.get('/authcheck')
                        .catch(function(err){
                            $state.go('login');
                        });
                    },
                    newAppointments($http) {
                        return $http.get('/api/detailers/newAppointments')
                        .catch(function(err){
                            console.log(err);
                        });
                    },
                    updateRating($http) {
                        return $http.get('/api/detailers/updateRating').then( function(res) {
                            var rating = 0;
                            for (var i = 0; i < res.data.length; i++) {
                                rating = rating + parseFloat(res.data[i].rating);
                            }
                            return rating / res.data.length;
                        });
                    } 
                }
            })
            .state('detailerSchedule', {
                templateUrl: './views/detailerSchedule.html',
                url: '/home/detailerSchedule',
                controller: 'detailerScheduleCtrl',
                resolve: {
                    authCheck($http, $state) {
                        return $http.get('/authcheck')
                        .catch(function(err){
                            $state.go('login');
                        });
                    },
                    scheduledAppts($http, $state) {
                        return $http.get('/api/detailers/scheduledAppts')
                        .catch(function(err){
                            console.log('No Appointments To Display');
                        });
                    },
                    apptDetails($http, $state) {
                        return $http.get('/api/detailers/scheduledAppts/details')
                        .catch(function(err){
                            console.log('No Appointments To Display');
                        });
                    }
                    
                }
            })
            .state('customerFeedback', {
                templateUrl: './views/customerFeedback.html',
                url: '/customerFeedback',
                controller: 'customerFeedbackCtrl',
                resolve: {
                    authCheck($http, $state) {
                        return $http.get('/authcheck')
                        .catch(function(err){
                            $state.go('login');
                        });
                    },
                    getFeedback($http, $state) {
                        return $http.get('/api/detailers/getFeedback');

                    }
                }
            })
            .state('addCars', {
                templateUrl: './views/addCars.html',
                url: '/addCars',
                controller: 'addCarsCtrl',
                resolve: {
                    authCheck($http, $state) {
                        return $http.get('/authcheck')
                        .catch(function(err){
                            $state.go('login');
                        });
                    },
                }
            })
    
});