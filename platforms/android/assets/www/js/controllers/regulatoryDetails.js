/**
 * Created by administrator on 27.04.15.
 */
/**
 * Created by administrator on 27.04.15.
 */
module.controller('regulatoryDetailsController', function ($scope, $http) {

    var page = nav.getCurrentPage(), order = (page.options.order); //

    $scope.order = order;

    console.log('test');
    console.log(nav);
    console.log(page);
    console.log($scope);




});