angular.module('detailApp').service('customerNameService', function($http){

    this.customerNameBack = function(){
        document.getElementById('step5-container').style.opacity = '0';
        
        setTimeout( function() {
            document.getElementById('step5-container').style.display = 'none';
            document.getElementById('customer-container').style.display = 'block';
        },250);
        
        
        setTimeout( function() {
            document.getElementById('customer-container').style.opacity = '1';
            document.getElementById('customer-container').style.marginLeft = '0';
            document.getElementById('customer-container').style.marginRight = '0';
        },350);
    };

});