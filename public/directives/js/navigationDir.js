angular.module('detailApp').directive('navDir', function ( $document, userHomeService){
    return {
        templateUrl: './directives/templates/navigation.html',
        restrict: 'E',
        controller: 'mainCtrl',
        link: function(scope, elements, attributes) {
            
        }
    };
});