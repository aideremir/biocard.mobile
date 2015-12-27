/**
 * Created by administrator on 03.05.15.
 */
/**
 * Created by administrator on 27.04.15.
 */
module.controller('trackingLKController', function ($scope, $http) {

    ons.ready(function () {

        $scope.searchMatch = function (string) //@todo: move all that shit to app scope!
        {
            var query = $scope.searchQuery;

            if (!query) {
                return true;
            }

            var searchPattern = new RegExp('^' + query, 'i');

            return searchPattern.test(string);
        }


        modal.show();
        $http.get('http://cabinet.biocard.com/api/tracking?company=' + biocard.company).
            success(function (data, status) {

                //console.log(data);

                $scope.projects = data;
                modal.hide();

            }).
            error(function (data, status, headers, config) {

                ons.notification.alert({
                    messageHTML: 'ERR_INTERNET_DISCONNECTED',
                    title: 'Error',
                    buttonLabel: 'OK',
                    animation: 'default'
                });

                modal.hide();
            });

    });


});