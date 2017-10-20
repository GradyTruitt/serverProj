angular.module('detailApp').controller('detailerHomeCtrl', function($scope, $http, detailerHomeService, authCheck2, apptDetails, updateRating){

    $scope.rating = updateRating;
        
                if ($scope.rating < 0.5) {
                    $scope.rating = '../assets/0st.svg';}
                if ($scope.rating >= 0.5 && $scope.rating < 1) {
                    $scope.rating = '../assets/0_5st.svg';}
                if ($scope.rating >= 1 && $scope.rating < 1.5) {
                    $scope.rating = '../assets/1st.svg';}
                if ($scope.rating >= 1.5 && $scope.rating < 2) {
                    $scope.rating = '../assets/1_5st.svg';}
                if ($scope.rating >= 2 && $scope.rating < 2.5) {
                    $scope.rating = '../assets/2st.svg';}
                if ($scope.rating >= 2.5 && $scope.rating < 3) {
                    $scope.rating = '../assets/2_5st.svg';}
                if ($scope.rating >= 3 && $scope.rating < 3.5) {
                    $scope.rating = '../assets/3st.svg';}
                if ($scope.rating >= 3.5 && $scope.rating < 4) {
                    $scope.rating = '../assets/3_5st.svg';}
                if ($scope.rating >= 4 && $scope.rating < 4.5) {
                    $scope.rating = '../assets/4st.svg';}
                if ($scope.rating >= 4.5 && $scope.rating < 5) {
                    $scope.rating = '../assets/4_5st.svg';}
                if ($scope.rating >= 5) {
                    $scope.rating = '../assets/5st.svg';}
                if ($scope.rating === null){ 
                    $scope.rating = '../assets/blank.png'; }



    $scope.balance = authCheck2.data.passport.user.user.acctbalance.toFixed(2).replace(/./g, function(c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
    });

    $scope.currentUser = authCheck2.data.passport.user.user;

    if (apptDetails[0]) {
        $scope.nextAppt = apptDetails[0].starttime;
        $scope.apptCount = apptDetails.length;
    }
    if (!apptDetails[0]){
        $scope.nextAppt = "";
        $scope.apptCount = 0;
    }

    $scope.insertNav = function() {
        document.getElementById('navigation').style.display = "block";
        document.getElementById('my-vehicles').style.display = "none";        
    };
    $scope.insertNav();

    document.getElementById('nav-profile-name').innerHTML = $scope.currentUser.companyname;
    document.getElementById('nav-profile-car').innerHTML = "";

});