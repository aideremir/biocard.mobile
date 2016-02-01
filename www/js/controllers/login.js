/**
 * Created by administrator on 27.04.15.
 */
module.controller('loginController', function ($scope, $http) {


    ons.ready(function () {

        $scope.biocard = biocard;

        //console.log(navigator.globalization);

        $scope.loginPage = {

            setLang: function(lang) {
                $scope.biocard.curLang = lang;
            },

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
                localStorage.removeItem('userId');

            },
            userLogin: function () {


                var login = this.login, password = this.password;

                modal.show();

                if(login.slice(-2) == '_r')
                {
                    $http.get('http://biocard.com/requestApi.php?cmd=auth&login=' + login + '&password=' + password).
                        success(function (data, status, headers, config) {


                            if (data.length == 0) {

                                ons.notification.alert({
                                    message: 'Wrong login or password',
                                    title: 'Error',
                                    buttonLabel: 'OK',
                                    animation: 'default'
                                });
                            }
                            else {

                                data = data[0];

                                localStorage.setItem('login', login);
                                localStorage.setItem('password', password);
                                localStorage.setItem('name', data.REMOTEUSERS_FIO);
                                localStorage.setItem('userId', data.REMOTEUSERS_ID);
                                //localStorage.setItem('company', data.company);

                                biocard.login = login;
                                biocard.password = password;
                                biocard.name = data.REMOTEUSERS_FIO;
                                biocard.userId = data.REMOTEUSERS_ID;
                                //biocard.company = data.company;

                                menu.setMainPage('pages/request.html', {closeMenu: true});

                            }

                            modal.hide();
                        }).
                        error(function (data, status, headers, config) {

                            //console.log(data, status);

                            ons.notification.alert({
                                messageHTML: biocard.t('Wrong login'),
                                title: 'Error',
                                buttonLabel: 'OK',
                                animation: 'default'
                            });

                            modal.hide();
                        });

                    return true;
                }

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
                            messageHTML: biocard.t('Wrong login'),
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

