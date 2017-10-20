angular.module('detailApp').service('selectPackagesService', function(){

    this.showDesc = function($index) {
        document.getElementById('package-desc'+$index.$index).style.display = 'block';
        document.getElementById('downarrow5'+$index.$index).style.display = "none";
        document.getElementById('uparrow5'+$index.$index).style.display = "block";
    };

    this.hideDesc = function($index) {
        document.getElementById('package-desc'+$index.$index).style.display = 'none';
        document.getElementById('downarrow5'+$index.$index).style.display = "block";
        document.getElementById('uparrow5'+$index.$index).style.display = "none";
    };

    this.checkBox = function($index) {
        var checked = document.getElementsByClassName('checked');
        for (var i = 0; i < checked.length; i++) {
            checked[i].style.display = "none";
        }
        document.getElementById('checked'+$index.$index).style.display = "block";
    };
});