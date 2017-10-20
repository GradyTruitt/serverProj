angular.module('detailApp').service('emailService', function($http){
    
    this.step1 = function(email) {
        if (!document.getElementById('email').value) {
            document.getElementById('email').style.borderBottomColor = 'red';
        }
        if (!email.email) {
            alert('Invalid Email Address');
            return;
        }
        else {
            document.getElementById('step1-container').style.marginLeft = '-100%';
            document.getElementById('step1-container').style.marginRight = '100%';
            document.getElementById('step1-container').style.opacity = '0';

            setTimeout( function() {
                document.getElementById('step2-container').style.opacity = '0';
                document.getElementById('step2-container').style.display = 'block';
            },250);
            
            
            setTimeout( function() {
                document.getElementById('step1-container').style.display = 'none';
                document.getElementById('step2-container').style.opacity = '1';
            },350);
        }
    };

    this.step2Back = function(){
        document.getElementById('step2-container').style.opacity = '0';
        
        setTimeout( function() {
            document.getElementById('step2-container').style.display = 'none';
            document.getElementById('step1-container').style.display = 'block';
        },250);
        
        
        setTimeout( function() {
            document.getElementById('step1-container').style.opacity = '1';
            document.getElementById('step1-container').style.marginLeft = '0';
            document.getElementById('step1-container').style.marginRight = '0';
        },350);
    };

});