var module = ons.bootstrap('biocardApp', ['onsen']);

var biocard = {

    apiLink: 'http://cabinet.biocard.com/api/courierexe',
    extra: '13',
    login: '',
    password: '',

    auth: function () {

        this.login = localStorage.getItem('login');
        this.password = localStorage.getItem('password');

        return (this.login && this.password);

    },


    utils: {
        zeroPad: function (str) {
            str = '' + str;

            if (str.length == 1) {
                return '0' + str;
            }

            return str;
        },
        dateFormat: function (date) {

            var date = new Date(date);

            return date.getFullYear() + '-' + this.zeroPad(date.getMonth()) + '-' + this.zeroPad(date.getDate()) + '&nbsp;' + this.zeroPad(date.getHours()) + ':' + this.zeroPad(date.getMinutes());

        }

    }
};



module.controller('appController', function ($scope) {

    //document.body.style.marginTop = "20px";

    $scope.startPage = biocard.auth() ? 'pages/tracking.html' : 'pages/login.html';


    ons.ready(function () {

        //navigator.getDeviceBackButtonHandler().setListener(function(event) {});

        menu.logout = function () {
            biocard.login = null;
            biocard.password = null;

            localStorage.removeItem('login');
            localStorage.removeItem('password');

            menu.setMainPage('pages/login.html', {closeMenu: true});
        }

    });


});



