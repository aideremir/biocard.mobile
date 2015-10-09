/**
 * Created by administrator on 27.04.15.
 */
module.controller('customsDetailsController', function ($scope, $http) {

    var page = nav.getCurrentPage(), order = (page.options.order); //

    $scope.project = order;


});