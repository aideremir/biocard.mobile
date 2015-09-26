/**
 * Created by administrator on 27.04.15.
 */
module.controller('loginController', function ($scope, $http) {

    ons.ready(function () {

        $scope.loginPage = {
            onLine: navigator.onLine,

            auth: function () {
                return false;
            },
            userLogin: function () {
                var login = this.login, password = this.password;

                modal.show();


                $http.get('http://cabinet.biocard.com/api/user?courierLogin=' + login + '&courierPassword=' + password).
                    success(function (data, status, headers, config) {

                        var error = data.error;

                        if (error != undefined) {

                            ons.notification.alert({
                                message: 'Wrong login or password',
                                title: 'Error',
                                buttonLabel: 'OK',
                                animation: 'default'
                            });
                        }
                        else {

                            localStorage.setItem('login', login);
                            localStorage.setItem('password', password);
                            localStorage.setItem('name', data.name);

                            biocard.login = login;
                            biocard.password = password;
                            biocard.name = data.name;

                            menu.setMainPage('pages/dashboard.html', {closeMenu: true});

                        }

                        modal.hide();
                    }).
                    error(function (data, status, headers, config) {

                        console.log(data);
                        console.log(status);
                        console.log(headers);
                        console.log(config);


                        /*
                        ons.notification.alert({
                            message: data,
                            title: status,
                            buttonLabel: 'OK',
                            animation: 'default'
                        });
                        */


                        modal.hide();
                    });

                return true;
            }
        }

    });
});

