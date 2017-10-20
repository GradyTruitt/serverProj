angular.module('detailApp').service('passwordService', function($http){

    this.step2 = function(password) {
        if (!document.getElementById('password').value) {
            document.getElementById('password').style.borderBottomColor = 'red';
        }
        if (!document.getElementById('password2').value) {
            document.getElementById('password2').style.borderBottomColor = 'red';
        }
        if (password.password[0] !== password.password[1]) {
            alert('Passwords Do Not Match');
            return;
        }
        if (password.password[0].length < 8 || password.password[0].length > 16) {
            alert('Password must contain at least 8 characters & no more than 16 characters.');
        }
        else {
            document.getElementById('step2-container').style.marginLeft = '-100%';
            document.getElementById('step2-container').style.marginRight = '100%';
            document.getElementById('step2-container').style.opacity = '0';

            setTimeout( function() {
                document.getElementById('step3-container').style.opacity = '0';
                document.getElementById('step3-container').style.display = 'block';
            },250);
            
            
            setTimeout( function() {
                document.getElementById('step2-container').style.display = 'none';
                document.getElementById('step3-container').style.opacity = '1';
            },350);
        }
    };

    this.step3Back = function(){
        document.getElementById('step3-container').style.opacity = '0';
        
        setTimeout( function() {
            document.getElementById('step3-container').style.display = 'none';
            document.getElementById('step2-container').style.display = 'block';
        },250);
        
        
        setTimeout( function() {
            document.getElementById('step2-container').style.opacity = '1';
            document.getElementById('step2-container').style.marginLeft = '0';
            document.getElementById('step2-container').style.marginRight = '0';
        },350);
    };

});