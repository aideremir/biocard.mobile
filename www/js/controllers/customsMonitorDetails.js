/**
 * Created by administrator on 27.04.15.
 */
/**
 * Created by administrator on 27.04.15.
 */
module.controller('customsMonitorDetailsController', function ($scope, $http) {

    ons.ready(function () {

        var page = nav.getCurrentPage(), order = (page.options.order); //

        $scope.order = order;


        modal.show();
        $http.get('http://cabinet.biocard.com/api/customs-monitor.html?guid=' + order.guid +'&servsql=1').
            success(function (data, status) {


                $scope.orderDetails = data;
                modal.hide();

            }).
            error(function (data, status, headers, config) {

                ons.notification.alert({
                    messageHTML: status,
                    title: 'Error',
                    buttonLabel: 'OK',
                    animation: 'default'
                });

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

    });
});