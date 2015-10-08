module.controller('trackingController', function ($scope, $http) {
    ons.ready(function () {

        var getRandomArbitary = function (min, max) {

            return Math.random() * (max - min) + min;

        }


        var placeOnMap = function (orders) {

            var map = new google.maps.Map(document.getElementById('googleMap'),
                {
                    center: { lat: 55.910057, lng: 38.016906},
                    zoom: 16
                });


            google.maps.event.addListenerOnce(map, 'idle', function () {
                //map loaded fully

                var orderMarkers = [], bounds = new google.maps.LatLngBounds(), infoWindows = [];

                for (var i = 0; i < orders.length; i++) {

                    var randLat = getRandomArbitary(53, 55),
                        randLon = getRandomArbitary(36, 38),
                        lat = orders[i].curLat,
                        lon = orders[i].curLon;


                    if (biocard.login == 'aho') {
                        lat = randLat;
                        lon = randLon;
                    }


                    if (lat != '' && lon != '') {

                        lat = parseFloat(lat);
                        lon = parseFloat(lon);

                        var marker = new google.maps.Marker({
                            position: {lat: lat, lng: lon},
                            title: orders[i].orderno,
                            map: map,
                            icon: 'http://www.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png',
                            draggable: false
                        });

                        marker.order = orders[i];

                        var infoWindow = new google.maps.InfoWindow({
                            content: orders[i].orderno
                        });

                        infoWindow.open(map, marker);


                        google.maps.event.addListener(marker, 'click', function (e) {
                            var order = this.order;

                            nav.pushPage('pages/orderDetails.html', { animation: 'slide', order: order });

                        });


                        infoWindows.push(infoWindow);
                        orderMarkers.push(marker);

                        bounds.extend(marker.getPosition());
                    }

                }


                if (orderMarkers.length > 0) {
                    map.fitBounds(bounds);
                }


            });

        }


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

                console.log(data);

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
                        price: $(this).find('deliveryprice').attr('total'),

                        curLat: $(this).find('currcoords').attr('lat'),
                        curLon: $(this).find('currcoords').attr('lon'),
                        accuracy: $(this).find('currcoords').attr('accuracy')
                    }

                    orders.push(order);

                });


                $scope.orders = orders;

                placeOnMap(orders);
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


    });


});



