/**
 * Created by administrator on 27.04.15.
 */
/**
 * Created by administrator on 27.04.15.
 */
module.controller('warehouseDetailsController', function ($scope, $http) {

    ons.ready(function () {

        var page = nav.getCurrentPage(), order = (page.options.order); //

        $scope.order = order;

        modal.show();
        $http.get('http://cabinet.biocard.com/api/warehouse?studyId=' + order.studyId).
            success(function (data, status) {


                $scope.projects = data;
                modal.hide();

            }).
            error(function (data, status, headers, config) {
                console.log(error);
                modal.hide();
            });

        $scope.tabs = {
            received: true,
            stock: false,
            relabel: false,
            dispatch: false,
            return: false,
            destructed: false
        }

        $scope.show = function(tab)
        {
            $scope.tabs = {
                received: false,
                stock: false,
                relabel: false,
                dispatch: false,
                return: false,
                destructed: false
            }

            $scope.tabs[tab] = true;
        }



    });
});