angular.module('detailApp').service('customerCarService', function($http){


this.step5 = function(name) {
    document.getElementById('customer-container').style.marginLeft = '-100%';
    document.getElementById('customer-container').style.marginRight = '100%';
    document.getElementById('customer-container').style.opacity = '0';

    setTimeout( function() {
        document.getElementById('step5-container').style.opacity = '0';
        document.getElementById('step5-container').style.display = 'block';
    },250);
    
    
    setTimeout( function() {
        document.getElementById('customer-container').style.display = 'none';
        document.getElementById('step5-container').style.opacity = '1';
    },350);
};

this.customerBack = function(){
    document.getElementById('customer-container').style.opacity = '0';
    
    setTimeout( function() {
        document.getElementById('customer-container').style.display = 'none';
        document.getElementById('step3-container').style.display = 'block';
    },250);
    
    
    setTimeout( function() {
        document.getElementById('step3-container').style.opacity = '1';
        document.getElementById('step3-container').style.marginLeft = '0';
        document.getElementById('step3-container').style.marginRight = '0';
    },350);
};

});