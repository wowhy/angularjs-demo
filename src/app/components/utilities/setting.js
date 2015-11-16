function setCookie(name,value,hours){
    var d = new Date();
    d.setTime(d.getTime() + hours * 3600 * 1000);
    document.cookie = name + '=' + value + '; expires=' + d.toGMTString();
}
function getCookie(name){
    var arr = document.cookie.split('; ');
    for(var i = 0; i < arr.length; i++){
        var temp = arr[i].split('=');
        if(temp[0] == name){
            return temp[1];
        }
    }
    return '';
}
function removeCookie(name){
    var d = new Date();
    d.setTime(d.getTime() - 10000);
    document.cookie = name + '=1; expires=' + d.toGMTString();
}

function settingFactory() {
    var setting = {
        applicationName: '培训管理系统',

        setAuth: function (username) {
            this.isAuthenticated = true;
            this.username = username;

            setCookie('username', username, 1);
        }
    };

    var username = getCookie('username');
    if(username){
        setting.setAuth(username);
    }

    return setting;
}

angular.module('example.utility')
    .factory('setting', [settingFactory]);