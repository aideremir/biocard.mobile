/**
 * Created by administrator on 27.04.15.
 */
/**
 * Created by administrator on 27.04.15.
 */
module.controller('regulatoryDetailsController', function ($scope, $http) {

    ons.ready(function () {

        var page = nav.getCurrentPage(), order = (page.options.order); //

        $scope.order = order;

        console.log(order);

    });

});