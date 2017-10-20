angular.module('detailApp').controller('customerFeedbackCtrl', function($scope, authCheck, getFeedback){
    
$scope.feedback = getFeedback.data.reverse();
$scope.currentUser = authCheck.data.passport.user.user;

for (var key in $scope.feedback) {
    
            if (parseFloat($scope.feedback[key].rating) < 0.5) {
                $scope.feedback[key].rating = '../assets/0st.svg';
            }
            if (parseFloat($scope.feedback[key].rating) >= 0.5 && parseFloat($scope.feedback[key].rating) < 1) {
                $scope.feedback[key].rating = '../assets/0_5st.svg';
            }
            if (parseFloat($scope.feedback[key].rating) >= 1 && parseFloat($scope.feedback[key].rating) < 1.5) {
                $scope.feedback[key].rating = '../assets/1st.svg';
            }
            if (parseFloat($scope.feedback[key].rating) >= 1.5 && parseFloat($scope.feedback[key].rating) < 2) {
                $scope.feedback[key].rating = '../assets/1_5st.svg';
            }
            if (parseFloat($scope.feedback[key].rating) >= 2 && parseFloat($scope.feedback[key].rating) < 2.5) {
                $scope.feedback[key].rating = '../assets/2st.svg';
            }
            if (parseFloat($scope.feedback[key].rating) >= 2.5 && parseFloat($scope.feedback[key].rating) < 3) {
                $scope.feedback[key].rating = '../assets/2_5st.svg';
            }
            if (parseFloat($scope.feedback[key].rating) >= 3 && parseFloat($scope.feedback[key].rating) < 3.5) {
                $scope.feedback[key].rating = '../assets/3st.svg';
            }
            if (parseFloat($scope.feedback[key].rating) >= 3.5 && parseFloat($scope.feedback[key].rating) < 4) {
                $scope.feedback[key].rating = '../assets/3_5st.svg';
            }
            if (parseFloat($scope.feedback[key].rating) >= 4 && parseFloat($scope.feedback[key].rating) < 4.5) {
                $scope.feedback[key].rating = '../assets/4st.svg';
            }
            if (parseFloat($scope.feedback[key].rating) >= 4.5 && parseFloat($scope.feedback[key].rating) < 5) {
                $scope.feedback[key].rating = '../assets/4_5st.svg';
            }
            if (parseFloat($scope.feedback[key].rating) >= 5) {
                $scope.feedback[key].rating = '../assets/5st.svg';
            }
            if ($scope.feedback[key].rating === null){ 
                $scope.feedback[key].rating = '../assets/blank.png'; 
            }
            $scope.feedback[key].feedbackdate = JSON.parse($scope.feedback[key].feedbackdate);
        }

$scope.insertNav = function() {
    document.getElementById('navigation').style.display = "block";
    document.getElementById('my-vehicles').style.display = "none";    
};
$scope.insertNav();

document.getElementById('nav-profile-name').innerHTML = $scope.currentUser.companyname;
document.getElementById('nav-profile-car').innerHTML = "";
    
});