angular.module('detailApp').controller('registerCtrl', function(
    $scope, registerService, emailService, passwordService, defineUserService, customerNameService, customerCarService){
    
$scope.user = 'customer';
$scope.newUser = {
    username: "",
    name: "",
    password: "",
    usertype: "",
    car: {
        year: "",
        make: "",
        model: ""
    },
    companyInfo: {
        companyName: "",
        zipcode: "",
        location: '',
    }
};

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position){
        $scope.ln = position.coords.longitude;
        $scope.la = position.coords.latitude;
    });
}
else {console.log('no location');}

$scope.removeNav = function() {
    document.getElementById('navigation').style.display = "none";
};
$scope.removeNav();

$scope.step1 = function(email) {
    $scope.newUser.username = email.email;
    emailService.step1(email); };
$scope.step2Back = function() { emailService.step2Back(); };
$scope.step2 = function(password) {
    $scope.newUser.password = password.password[0];
    passwordService.step2(password); };
$scope.step3Back = function() { passwordService.step3Back(); };
$scope.defineUser = function(user) { 
    $scope.user = user.user;
    defineUserService.defineUser(user); };
$scope.step4 = function() { 
    var userType = $scope.user;
    defineUserService.step4(userType); 
    $scope.newUser.usertype = $scope.user; };
$scope.customerBack = function() { customerCarService.customerBack(); };
$scope.detailerBack = function() { defineUserService.detailerBack(); };
$scope.restrict4 = function(year) { registerService.restrict4(year); };
$scope.restrict5 = function(zip) { registerService.restrict5(zip); };
$scope.step5 = function(car) {
    $scope.newUser.car.year = car.car[0];
    $scope.newUser.car.make = car.car[1];
    $scope.newUser.car.model = car.car[2];
    customerCarService.step5(); };
$scope.customerNameBack = function() { customerNameService.customerNameBack(); };

$scope.showCustomerInfo = function(name) {
    // console.log('ran CUSTOMER');
    // $scope.newUser.usertype = 'customer';
    $scope.newUser.name = name.name;
    var username = $scope.newUser.username;
    var password = $scope.newUser.password;
    var firstName = $scope.newUser.name;  
    var usertype = $scope.newUser.usertype;
    var location = {
        lon: $scope.ln,
        lat: $scope.la
    };
    var car = {
        year: $scope.newUser.car.year,
        make: $scope.newUser.car.make,
        model: $scope.newUser.car.model,
    };
    registerService.createUser(username, password, firstName, usertype, location, car);};

$scope.showCompanyInfo = function(company) {
    // console.log('ran DETAILER');
    // $scope.newUser.usertype = 'detailer';
    $scope.newUser.companyInfo.companyName = company.company[0];
    $scope.newUser.companyInfo.zipcode = company.company[1];
    var username = $scope.newUser.username;
    var password = $scope.newUser.password;
    var companyName = $scope.newUser.companyInfo.companyName;  
    var usertype = $scope.newUser.usertype;
    var zipcode = $scope.newUser.companyInfo.zipcode;
    registerService.createDetailer(username, password, companyName, usertype, zipcode); };

});