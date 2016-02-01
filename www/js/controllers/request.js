/**
 * Created by administrator on 27.04.15.
 */
module.controller('requestController', function ($scope, $http) {

    ons.ready(function () {

        $scope.tabs = {
            request: true,
            return: false
        }

        $scope.show = function(tab)
        {
            $scope.tabs = {
                request: false,
                return: false
            }

            $scope.tabs[tab] = true;
        }

        $scope.return = {};
        $scope.request = {materialNames:[], materialNumbers:[]};

        modal.show();

        $http.get('http://biocard.com/requestApi.php?cmd=userStudies&REMOTEUSERS_ID=' + biocard.userId).
            success(function (data, status, headers, config) {


                 console.log(data);

                $scope.studies = data;

                modal.hide();
            })
            .error(function (data, status, headers, config) {

                ons.notification.alert({
                    messageHTML: 'ERR_INTERNET_DISCONNECTED',
                    title: 'Error',
                    buttonLabel: 'OK',
                    animation: 'default'
                });

                modal.hide();
            })

    });

    $scope.selectStudy = function(study_id)
    {
        $scope.studyId = study_id;

        modal.show();

        $http.get('http://biocard.com/requestApi.php?cmd=studyCompanies&studyId=' + study_id).
            success(function (data, status, headers, config) {


                console.log(data);

                $scope.companies = data;

                modal.hide();
            })
            .error(function (data, status, headers, config) {

                ons.notification.alert({
                    messageHTML: 'ERR_INTERNET_DISCONNECTED',
                    title: 'Error',
                    buttonLabel: 'OK',
                    animation: 'default'
                });

                modal.hide();
            })

        $http.get('http://biocard.com/requestApi.php?cmd=studyMaterials&studyId=' + study_id).
            success(function (data, status, headers, config) {


                console.log(data);

                $scope.materials = data;

                modal.hide();
            })
            .error(function (data, status, headers, config) {

                ons.notification.alert({
                    messageHTML: 'ERR_INTERNET_DISCONNECTED',
                    title: 'Error',
                    buttonLabel: 'OK',
                    animation: 'default'
                });

                modal.hide();
            })

    }

    $scope.addMaterial = function(materialName, qty) {
        //console.log(materialName, qty);
        $scope.request.materialNames.push( materialName);
        $scope.request.materialNumbers.push(qty);
    }

    $scope.addOrder = function()
    {
        var order = $scope.order, xml = '<?xml version="1.0" encoding="UTF-8"?>\
            <neworder>\
            <auth extra="' + biocard.extra + '" login="' + biocard.login + '" pass="' + biocard.password + '"></auth>\
            <order>\
            <receiver>\
                <company>' + order.company + '</company>\
                <person>' + order.person + '</person>\
                <phone>' + order.phone + '</phone>\
                <town>' + order.town + '</town>\
                <address>' + order.address + '</address>\
                <date>' + order.date + '</date>\
                <time_min>' + order.timeMin + '</time_min>\
                <time_max>' + order.timeMax + '</time_max>\
            </receiver>\
            <weight>' + order.weight + '</weight>\
            <quantity>' + order.quant + '</quantity>\
            <service>' + order.deliveryType + '</service>\
            <price>' + order.sum + '</price>\
            <enclosure>' + order.attach + '</enclosure>\
            <instruction>' + order.comments + ' | sent with BIOCARDMOBILE</instruction>\
        </order>\
    </neworder>';

        //console.log(xml);

        modal.show();

        $http.post(biocard.apiLink, xml).
            success(function (data, status, headers, config) {

                var errormsg = $(data).find('createorder').attr('errormsg');

                if (errormsg != 'success') {

                    ons.notification.alert({
                        message: errormsg,
                        title: 'Error',
                        buttonLabel: 'OK',
                        animation: 'default'
                    });
                }
                else {

                    ons.notification.alert({
                        message: 'Order sent',
                        title: 'Success',
                        buttonLabel: 'OK',
                        animation: 'default'
                    });



                }

                modal.hide();
            }).
            error(function (data, status, headers, config) {


                ons.notification.alert({
                    message: data,
                    title: status,
                    buttonLabel: 'OK',
                    animation: 'default'
                });



                modal.hide();
            });
    }
});