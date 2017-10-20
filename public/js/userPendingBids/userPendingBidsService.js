angular.module('detailApp').service('userPendingBidsService', function($http){
    
    this.acceptBid = function(index) {
        document.getElementById('accept-bid-btn'+index).style.display = 'none';
        document.getElementById('complete-accept-bid-btn'+index).style.display = 'block';
        document.getElementById('accept-bid-for'+index).style.display = 'block';
        document.getElementById('cancel-btn'+index).style.display = 'block';
    };
    
    this.cancelBid = function(index) {
        document.getElementById('accept-bid-btn'+index).style.display = 'block';
        document.getElementById('complete-accept-bid-btn'+index).style.display = 'none';
        document.getElementById('accept-bid-for'+index).style.display = 'none';
        document.getElementById('cancel-btn'+index).style.display = 'none';
    };

    this.completeBid = function(index, bids) {
        var className = bids[index].id;
        var hideBids = document.getElementsByClassName('index' + className);

        for(var i = 0; i < hideBids.length; i++) {
            hideBids[i].style.marginLeft = "-100%";
            hideBids[i].style.marginRight = "100%";
            hideBids[i].style.opacity = "0";

        }
        setTimeout(function(){
            for(var i = 0; i < hideBids.length; i++){
                hideBids[i].style.display = "none";
            }
        }, 305);

        var str = bids[index].starttime;
        if (str.length === 6 && str.slice(-2) == "AM"){
            str = "0" + str;
          }
        
        if (str.length === 6 && str.slice(-2) == "PM"){
            str = "0" + str;
            var hour = parseInt(str.slice(0,2)) + 12;
            str = str.substring(2,5);
            str = hour.toString() + str;
          }
        
        if (str.length === 7 && str.slice(-2) == "AM"){
          }
        if (str.length === 7 && str.slice(-2) == "AM" && str.substring(0,2) == "12"){
            var hour = parseInt(str.slice(0,2)) + 12;
            str = str.substring(2,5);
            str = hour.toString() + str;
          }
        
        if (str.length === 7 && str.slice(-2) == "PM" && str.substring(0,2) == "11" || str.substring(0,2) == "10"){
            var hour = parseInt(str.slice(0,2)) + 12;
            str = str.substring(2,5);
            str = hour.toString() + str;
          }

        str = parseInt(str.substring(0,2));

        var apptid = className;
        var schedule = {};

        schedule.userid = bids[index].userid;
        schedule.detailerid = bids[index].detailerid;
        schedule.appointmentdate = bids[index].appointmentdate;
        schedule.starttime = bids[index].starttime;
        schedule.endtime = bids[index].endtime;
        schedule.location = bids[index].location;
        schedule.car = bids[index].car;
        schedule.bidprice = bids[index].bidprice;
        schedule.detailername = bids[index].detailername;
        schedule.appointmentid = bids[index].id;
        schedule.instructions = bids[index].instructions;
        schedule.package = bids[index].package;
        schedule.starthour = str;


        $http.put('/api/users/removeBids', {apptid: apptid}).then(function() {
            $http.post('/api/detailers/addToSchedule', schedule).then(function(res) {
            });
        });

    };

    this.makePayment = function(payload) {
        return $http.post('/api/users/payment', payload);
    };

    
    });