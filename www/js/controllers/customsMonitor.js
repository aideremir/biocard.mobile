/**
 * Created by administrator on 07.05.15.
 */
module.controller('customsMonitorController', function ($scope, $http) {

    ons.ready(function () {

        $scope.searchMatch =  function(string) //@todo: move all that shit to app scope!
        {
            var query = $scope.searchQuery;

            if(!query)
            {
                return true;
            }

            var searchPattern = new RegExp('^' + query, 'i');

            return searchPattern.test(string);
        }

        modal.show();
        $http.get('http://cabinet.biocard.com/api/customs-monitor-list?company=' + biocard.company).
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
