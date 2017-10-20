angular.module('detailApp').service('defineUserService', function($http){
    
    this.defineUser = function(user) {
        if (user.user === 'customer') {
            document.getElementById('customer').style.color = '#000620';
            document.getElementById('customer').style.backgroundColor = '#10EE2A';
            document.getElementById('detailer').style.color = '#10EE2A';
            document.getElementById('detailer').style.backgroundColor = 'transparent';
        }
        else {
            document.getElementById('detailer').style.color = '#000620';
            document.getElementById('detailer').style.backgroundColor = '#10EE2A';
            document.getElementById('customer').style.color = '#10EE2A';
            document.getElementById('customer').style.backgroundColor = 'transparent';
        }
    };
    
    this.step4 = function(userType) {
        if(userType === 'customer') {
            document.getElementById('step3-container').style.marginLeft = '-100%';
            document.getElementById('step3-container').style.marginRight = '100%';
            document.getElementById('step3-container').style.opacity = '0';

            setTimeout( function() {
                document.getElementById('customer-container').style.opacity = '0';
                document.getElementById('customer-container').style.display = 'block';
            },250);
            
            
            setTimeout( function() {
                document.getElementById('step3-container').style.display = 'none';
                document.getElementById('customer-container').style.opacity = '1';
            },350);
        }
        if(userType === 'detailer') {
            document.getElementById('step3-container').style.marginLeft = '-100%';
            document.getElementById('step3-container').style.marginRight = '100%';
            document.getElementById('step3-container').style.opacity = '0';

            setTimeout( function() {
                document.getElementById('detailer-container').style.opacity = '0';
                document.getElementById('detailer-container').style.display = 'block';
            },250);
            
            
            setTimeout( function() {
                document.getElementById('step3-container').style.display = 'none';
                document.getElementById('detailer-container').style.opacity = '1';
            },350);
        }
    };

    this.detailerBack = function(){
        document.getElementById('detailer-container').style.opacity = '0';
        
        setTimeout( function() {
            document.getElementById('detailer-container').style.display = 'none';
            document.getElementById('step3-container').style.display = 'block';
        },250);
        
        
        setTimeout( function() {
            document.getElementById('step3-container').style.opacity = '1';
            document.getElementById('step3-container').style.marginLeft = '0';
            document.getElementById('step3-container').style.marginRight = '0';
        },350);
    };
    
    });