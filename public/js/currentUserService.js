angular.module('detailApp').service('currentUserService', function(){

    this.packages = {
        package1: {
            name: 'Super Shine Pro',
            desc: 'The Super Shine Pro includes a full exterior wash and rinse, thorough interior vacuuming & dusting a tire shine.'
        },
        package2: {
            name: 'Super Shine Premium',
            desc: 'The Super Shine Premium includes a full exterior wash and rinse, wheel polishing, tire shine, thorough interior vacuuming & dusting, interior window cleaning and a leather polishing'
        },
        package4: {
            name: 'Super Shine Platinum',
            desc: 'The Super Shine Pro includes a full exterior wash and rinse and wax, wheel polishing, tire shine, thorough interior vacuuming & dusting, console & dashboard polishing, interior window cleaning and a leather polishing'
        }
    };


});
