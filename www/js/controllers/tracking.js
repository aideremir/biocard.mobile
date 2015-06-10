module.controller('trackingController', function ($scope, $http) {
    ons.ready(function () {




        navigator.geolocation.getCurrentPosition(function (position) {


            var lat = position.coords.latitude,
                lon = position.coords.longitude;

            ons.notification.alert({
                //message: 'Error loading data',
                messageHTML: lat + ', ' + lon,
                title: 'Geolocation result',
                buttonLabel: 'OK',
                animation: 'default', // or 'none'
                // modifier: 'optional-modifier'
                callback: function () {
                    // Alert button is closed!
                }
            });

            /*
            var latLon = new plugin.google.maps.LatLng(lat, lon),
                bounds = new plugin.google.maps.LatLngBounds(latLon);


            window.map = new plugin.google.maps.Map.getMap(document.getElementById('googleMap'), {
                center: latLon,
                zoom: 16
            });

            map.addEventListener(plugin.google.maps.event.MAP_READY, function () {
                //map loaded fully

                map.addMarker({
                    position: latLon,
                    title: 'I am here',
                    icon: 'blue',
                    draggable: false
                }, function (marker) {

                    marker.showInfoWindow();

                })

            });
            */
        }, function (error) {
            console.log(error);

            ons.notification.alert({
                //message: 'Error loading data',
                messageHTML: error.message,
                title: error.code,
                buttonLabel: 'OK',
                animation: 'default', // or 'none'
                // modifier: 'optional-modifier'
                callback: function () {
                    // Alert button is closed!
                }
            });

            modal.hide();
        })



        modal.show();
            // orders list
            var xml = '<?xml version="1.0" encoding="UTF-8" ?>' +
                '<statusreq>' +
                '<auth extra="' + biocard.extra + '" login="' + biocard.login + '" pass="' + biocard.password + '"></auth>' +
                '<orderno></orderno>' +
                '<datefrom></datefrom>' +
                '<dateto></dateto>' +
                '<done>ONLY_NOT_DONE</done>' +
                '</statusreq>';


            $http.post(biocard.apiLink, xml).
                success(function (data, status, headers, config) {

                    //console.log(data);

                    var $orders = $(data).find('order'), orders = [];

                    $orders.each(function () {
                        var order = {
                            orderno: $(this).attr('orderno'),
                            ordercode: $(this).attr('ordercode'),

                            fromCompany: $(this).find('sender company').text(),
                            fromPerson: $(this).find('sender person').text(),

                            toCompany: $(this).find('receiver company').text(),
                            toPerson: $(this).find('receiver person').text(),

                            fromDate: $(this).find('sender date').text(),
                            toDate: $(this).find('receiver date').text(),

                            fromTown: $(this).find('sender town').text().replace('город', ''),
                            fromAddress: $(this).find('sender address').text(),

                            toTown: $(this).find('receiver town').text().replace('город', ''),
                            toAddress: $(this).find('receiver address').text(),

                            comments: $(this).find('instruction').text(),
                            status: $(this).find('status').text(),
                            weight: $(this).find('weight').text(),
                            price: $(this).find('deliveryprice').attr('total')
                        }

                        orders.push(order);

                    });


                    $scope.orders = orders;
                    modal.hide();


                }).
                error(function (data, status, headers, config) {
                    console.log(error);
                    modal.hide();
                });







    });


});



