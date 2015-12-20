var module = ons.bootstrap('biocardApp', ['onsen']);

var biocard = {

    apiLink: 'http://cabinet.biocard.com/api/courierexe',
    extra: '13',
    login: '',
    password: '',
    dict: dict,
    curLang: 'ru',
    t: function(string){

        if(!!this.dict[string])
            return this.dict[string][this.curLang]
        else
            return string;
    },

    auth: function () {

        //return true; // temp

        this.login = localStorage.getItem('login');
        this.password = localStorage.getItem('password');
        this.name = localStorage.getItem('name');
        this.company = localStorage.getItem('company');

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

    $scope.biocard = biocard;


        $scope.startPage = biocard.auth() ? 'pages/dashboard.html' : 'pages/login.html';


});



