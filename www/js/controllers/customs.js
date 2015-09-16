/**
 * Created by administrator on 07.05.15.
 */
module.controller('customsController', function ($scope, $http) {

    ons.ready(function () {

        modal.show();
        $http.get('http://cabinet.biocard.com/api/customs?courierLogin=' + biocard.login + '&courierPassword=' + biocard.password).
            success(function (data, status) {

                //console.log(data);

                $scope.projects = data;
                modal.hide();

            }).
            error(function (data, status, headers, config) {
                console.log(error);
                modal.hide();
            });

    });
});
