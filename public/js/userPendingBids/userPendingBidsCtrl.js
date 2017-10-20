angular.module('detailApp').controller('userPendingBidsCtrl', function($scope, $http, $window, authCheck, pendingBids, userPendingBidsService){

    for (var key in pendingBids.data) {
        if (pendingBids.data[key].appointmentdate) {
            pendingBids.data[key].appointmentdate = JSON.parse(pendingBids.data[key].appointmentdate);
        }
        if (pendingBids.data[key].car) {
            pendingBids.data[key].car = JSON.parse(pendingBids.data[key].car);
        }
        if (pendingBids.data[key].location) {
            pendingBids.data[key].location = JSON.parse(pendingBids.data[key].location);
        }
    }

    $scope.userPendingBids = pendingBids.data;

    $scope.load = function() {

        for (var key2 in $scope.userPendingBids) {
            
                    if (parseFloat($scope.userPendingBids[key2].detailerrating) < 0.5) {
                        $scope.userPendingBids[key2].detailerrating = '../assets/0st.svg';}
                    if (parseFloat($scope.userPendingBids[key2].detailerrating) >= 0.5 && parseFloat($scope.userPendingBids[key2].detailerrating) < 1) {
                        $scope.userPendingBids[key2].detailerrating = '../assets/0_5st.svg';}
                    if (parseFloat($scope.userPendingBids[key2].detailerrating) >= 1 && parseFloat($scope.userPendingBids[key2].detailerrating) < 1.5) {
                        $scope.userPendingBids[key2].detailerrating = '../assets/1st.svg';}
                    if (parseFloat($scope.userPendingBids[key2].detailerrating) >= 1.5 && parseFloat($scope.userPendingBids[key2].detailerrating) < 2) {
                        $scope.userPendingBids[key2].detailerrating = '../assets/1_5st.svg';}
                    if (parseFloat($scope.userPendingBids[key2].detailerrating) >= 2 && parseFloat($scope.userPendingBids[key2].detailerrating) < 2.5) {
                        $scope.userPendingBids[key2].detailerrating = '../assets/2st.svg';}
                    if (parseFloat($scope.userPendingBids[key2].detailerrating) >= 2.5 && parseFloat($scope.userPendingBids[key2].detailerrating) < 3) {
                        $scope.userPendingBids[key2].detailerrating = '../assets/2_5st.svg';}
                    if (parseFloat($scope.userPendingBids[key2].detailerrating) >= 3 && parseFloat($scope.userPendingBids[key2].detailerrating) < 3.5) {
                        $scope.userPendingBids[key2].detailerrating = '../assets/3st.svg';}
                    if (parseFloat($scope.userPendingBids[key2].detailerrating) >= 3.5 && parseFloat($scope.userPendingBids[key2].detailerrating) < 4) {
                        $scope.userPendingBids[key2].detailerrating = '../assets/3_5st.svg';}
                    if (parseFloat($scope.userPendingBids[key2].detailerrating) >= 4 && parseFloat($scope.userPendingBids[key2].detailerrating) < 4.5) {
                        $scope.userPendingBids[key2].detailerrating = '../assets/4st.svg';}
                    if (parseFloat($scope.userPendingBids[key2].detailerrating) >= 4.5 && parseFloat($scope.userPendingBids[key2].detailerrating) < 5) {
                        $scope.userPendingBids[key2].detailerrating = '../assets/4_5st.svg';}
                    if (parseFloat($scope.userPendingBids[key2].detailerrating) >= 5) {
                        $scope.userPendingBids[key2].detailerrating = '../assets/5st.svg';}
                    if ($scope.userPendingBids[key2].detailerrating === null){ 
                        $scope.userPendingBids[key2].rating = '../assets/blank.png'; }
                }

    };

    $scope.currentUser = authCheck.data.passport.user.user;
    
    $scope.insertNav = function() { document.getElementById('navigation').style.display = "block"; };
    $scope.insertNav();
    document.getElementById('nav-profile-name').innerHTML = $scope.currentUser.name;    
    
    $scope.getCars = function() {
        $http.get('/api/users/getCars').then(function(res) { 
            document.getElementById('nav-profile-car').innerHTML = res.data[0].year + " " + res.data[0].make + " " + res.data[0].model;            
            
        });
    };

    $scope.getCars();
    
    $scope.acceptBid = function(index) {
        userPendingBidsService.acceptBid(index);
    };
    
    $scope.cancelBid = function(index) {
        userPendingBidsService.cancelBid(index);
    };
    
    $scope.completeBid = function(index) {
        var bids = $scope.userPendingBids;
        userPendingBidsService.completeBid(index, bids);
    };

    ////////////////////////////////////////////

    $scope.openPayment = function(index) {
        var handler = window.StripeCheckout.configure({
        key: 'pk_test_gtk33c1yHzguHzt86uJgVI9u',
        locale: 'auto',
        token: function(token) {
        var payload = {
        token: token,
        total: $scope.userPendingBids[index].bidprice * 100
        };
        $scope.completeBid(index);
        userPendingBidsService.makePayment(payload).then(function(response) {
       });
       }
       });
    
       handler.open({
            name: $scope.userPendingBids[index].detailername,
            description: "Mobile Detailing Service",
            amount: $scope.userPendingBids[index].bidprice * 100,
        });
};


});
    