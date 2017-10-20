angular.module('detailApp').service('jobFeedService', function($http){
    
    this.placeBid = function(index) {
        document.getElementById('bid-btn'+index).style.display= 'none';
        document.getElementById('bid-input-container'+index).style.display= 'flex';
        document.getElementById('complete-bid-btn'+index).style.display= 'block';

        setTimeout(function(){
            document.getElementById('bid-input-container'+index).style.opacity= '1';
        },50);
    };
    this.completeBid = function(index, params) {
        if(document.getElementById('bid-input'+index).value) {
            document.getElementById('list-item'+index).style.marginLeft = '-500px';
            document.getElementById('list-item'+index).style.marginRight = '500px';
            document.getElementById('list-item'+index).style.opacity = '0';
            
            setTimeout(function(){
                document.getElementById('list-item'+index).style.display= 'none';

                $http.post('/api/detailers/placeBid', params ).then(function(res) {
                });
            },500);


        }
        else { 
            document.getElementById('bid-input'+index).style.borderBottomColor = 'red';
            
        }
    };
    });