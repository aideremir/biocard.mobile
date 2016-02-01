var module = ons.bootstrap('biocardApp', ['onsen']);

var biocard = {

    apiLink: 'http://cabinet.biocard.com/api/courierexe',
    extra: '13',
    login: '',
    password: '',
    dict: dict,
    curLang: 'ru',
    t: function(string){

        if(!!this.dict[string]){
            return this.dict[string][this.curLang]
        }

        else {

            return string;
        }

    },

    auth: function () {

        //return true; // temp

        this.login = localStorage.getItem('login');
        this.password = localStorage.getItem('password');
        this.name = localStorage.getItem('name');
        this.company = localStorage.getItem('company');
        this.userId = localStorage.getItem('userId');

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

document.addEventListener("backbutton", onBackKeyDown, false);

function onBackKeyDown() {
    // Handle the back button
    alert("Backbutton is pressed!");
    //var element = document.querySelector( ".navigator-container");
    //var scope = angular.element( element ).scope();
    //scope.popPage();

    return false;
}


module.controller('appController', function ($scope) {

    if(ons.platform.isIOS())
    {
        document.body.style.marginTop = "20px"; // for IOS only
        document.body.style.backgroundColor = "#660000"; // for IOS only
    }


    $scope.biocard = biocard;

    var dashboard = 'pages/dashboard.html';

    //if(biocard.login.slice(-2) == '_r') //TODO: вернуть!!!!
    if(true)
    {
        dashboard = 'pages/request.html';
    }

        $scope.startPage = biocard.auth() ? dashboard : 'pages/login.html';


});



