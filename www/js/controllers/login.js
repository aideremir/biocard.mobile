/**
 * Created by administrator on 27.04.15.
 */
module.controller('loginController', function ($scope, $http) {


    ons.ready(function () {

        $scope.loginPage = {

            auth: function () {
                return false;
            },
            userLogout: function () {
                biocard.login = null;
                biocard.password = null;

                localStorage.removeItem('login');
                localStorage.removeItem('password');
                localStorage.removeItem('name');
                localStorage.removeItem('company');

            },
            userLogin: function () {


                var login = this.login, password = this.password;

                modal.show();


                $http.get('http://cabinet.biocard.com/api/user?courierLogin=' + login + '&courierPassword=' + password + '&callback=JSON_CALLBACK').
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
                            localStorage.setItem('company', data.company);

                            biocard.login = login;
                            biocard.password = password;
                            biocard.name = data.name;
                            biocard.company = data.company;

                            menu.setMainPage('pages/dashboard.html', {closeMenu: true});

                        }

                        modal.hide();
                    }).
                    error(function (data, status, headers, config) {

                        //console.log(data, status);

                        ons.notification.alert({
                            messageHTML: 'ERR_INTERNET_DISCONNECTED',
                            title: 'Error',
                            buttonLabel: 'OK',
                            animation: 'default'
                        });

                        modal.hide();
                    });

                return true;
            }
        }

    });
});

