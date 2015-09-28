/**
 * Created by administrator on 03.05.15.
 */
/**
 * Created by administrator on 27.04.15.
 */
module.controller('warehouseController', function ($scope, $http) {

    ons.ready(function () {

        modal.show();
        $http.get('http://cabinet.biocard.com/api/warehouse?company=' + biocard.company).
            success(function (data, status) {

                //console.log(data);

                $scope.projects = data;
                modal.hide();

            }).
            error(function (data, status, headers, config) {
                console.log(data);
                modal.hide();
            });



    });
});