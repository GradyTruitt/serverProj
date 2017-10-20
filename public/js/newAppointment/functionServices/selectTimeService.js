angular.module('detailApp').service('selectTimeService', function(){

    this.showStartTimes = function () {
        document.getElementById('time-container-2').style.display = "none";
        document.getElementById('downarrow3').style.display = "block";
        document.getElementById('uparrow3').style.display = "none";
        document.getElementById('start').innerHTML = 'Start';
        document.getElementById('start').style.fontWeight = '200';
        document.getElementById('start').style.color = '#9CB4C4';
        document.getElementById('time-container-1').style.display = "block";
        document.getElementById('downarrow2').style.display = "none";
        document.getElementById('uparrow2').style.display = "block";
        document.getElementById('end').innerHTML = 'End';
        var times = document.getElementsByClassName('form-option3');
        for (var i = 0; i < times.length; i++) {
            times[i].setAttribute('name', "");
            times[i].setAttribute('style', 'color: #5F7584; font-weight: 300;');
        }
    };

    this.hideStartTimes = function () {
        document.getElementById('time-container-1').style.display = "none";
        document.getElementById('downarrow2').style.display = "block";
        document.getElementById('uparrow2').style.display = "none";
    };

    this.showEndTimes = function (index) {
        document.getElementById('time-container-1').style.display = "none";
        document.getElementById('downarrow2').style.display = "block";
        document.getElementById('uparrow2').style.display = "none";
        if (index === "7:00AM") {
            index=0;
        }
        var num = parseInt(index);
        var times = document.getElementsByClassName('form-option3');
        for (var i = 0; i <= num; i++) {
            times[i].style.color = '#C5C6C7';
            times[i].setAttribute('name', 'remove');
        }
        document.getElementById('end').innerHTML = 'End';
        document.getElementById('end').style.fontWeight = '200';
        document.getElementById('end').style.color = '#9CB4C4';
        document.getElementById('time-container-2').style.display = "block";
        document.getElementById('downarrow3').style.display = "none";
        document.getElementById('uparrow3').style.display = "block";
    };

    this.hideEndTimes = function () {
        document.getElementById('time-container-2').style.display = "none";
        document.getElementById('downarrow3').style.display = "block";
        document.getElementById('uparrow3').style.display = "none";
    };

    this.selectStartTime = function(elem) {
        var text = elem.elem;
        document.getElementById('start').innerHTML = text;
        document.getElementById('start').style.fontWeight = '300';
        document.getElementById('start').style.color = '#5F7584';
        document.getElementById('time-container-1').style.display = "none";
        document.getElementById('downarrow2').style.display = "block";
        document.getElementById('uparrow2').style.display = "none";
    };

    this.selectEndTime = function(elem) {
        var remove = document.getElementsByName('remove');
        for (var i = 0; i < remove.length; i++) {
            if (remove[i].innerHTML === elem.elem.toString() && remove[i].attributes[3].nodeValue === "remove") {
                return;
            }
        }
        var text = elem.elem;
        document.getElementById('end').innerHTML = text;
        document.getElementById('end').style.fontWeight = '300';
        document.getElementById('end').style.color = '#5F7584';
        document.getElementById('time-container-2').style.display = "none";
        document.getElementById('downarrow3').style.display = "block";
        document.getElementById('uparrow3').style.display = "none";
    };



});