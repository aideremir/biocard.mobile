/**
 * Created by administrator on 07.05.15.
 */
module.controller('regulatoryController', function ($scope, $http) {

    ons.ready(function () {

            modal.show();
            $http.get('http://biocard.com/api/regulatory?courierLogin=' + biocard.login + '&courierPassword=' + biocard.password).
                success(function (data, status) {

                    console.log(data);

                    $scope.projects = data;
                    modal.hide();

                }).
                error(function (data, status, headers, config) {
                    console.log(error);
                    modal.hide();
                });



    });
});