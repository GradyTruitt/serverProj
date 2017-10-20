angular.module('detailApp').directive('selectTimes', function (){
    return {
        templateUrl: './directives/templates/selectTimes.html',
        restrict: 'E',
        controller: 'newAppointmentCtrl',
        link: function(scope, elements, attributes) {

        }
    };
});