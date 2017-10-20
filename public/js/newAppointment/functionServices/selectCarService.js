angular.module('detailApp').service('selectCarService', function(){
    
    this.selectCar = function(car) {
        document.getElementById('cars-default').innerHTML = car.car.year + " " + car.car.make + " " + car.car.model;
        document.getElementById('cars-default').style.color = '#5F7584';
        document.getElementById('cars-default').style.fontWeight = '300';
        document.getElementById('downarrow1').style.display = "block";
        document.getElementById('uparrow1').style.display = "none";
        var formOptions = document.getElementsByClassName('form-option');
        for (var i = 0; i < formOptions.length; i++) {
            formOptions[i].style.display = "none";
        }
        var formLines = document.getElementsByClassName('form-line');
        for (var x = 0; x < formLines.length; x++) {
            formLines[x].style.display = "none";
        }
    };

    this.showCars = function(){
        document.getElementById('downarrow1').style.display = "none";
        document.getElementById('uparrow1').style.display = "block";
        var formOptions = document.getElementsByClassName('form-option');
        for (var i = 0; i < formOptions.length; i++) {
            formOptions[i].style.display = "block";
        }
        var formLines = document.getElementsByClassName('form-line');
        for (var x = 0; x < formLines.length; x++) {
            formLines[x].style.display = "block";
        }
    };

    this.hideCars = function(){
        document.getElementById('downarrow1').style.display = "block";
        document.getElementById('uparrow1').style.display = "none";
        var formOptions = document.getElementsByClassName('form-option');
        for (var i = 0; i < formOptions.length; i++) {
            formOptions[i].style.display = "none";
        }
        var formLines = document.getElementsByClassName('form-line');
        for (var x = 0; x < formLines.length; x++) {
            formLines[x].style.display = "none";
        }  
    };

    });