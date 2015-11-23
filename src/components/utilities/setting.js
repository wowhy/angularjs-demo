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
        applicationName: '报表管理系统',
        tel: '0411-88888888',
        email: 'wowhy@outlook.com',

        layout: {
            adminLayout: 'layout',
            pageSidebarClosed: false
        },

        setAuth: function (username) {
            this.isAuthenticated = !!username;
            this.username = username;

            setCookie('username', username, 1);
        }
    };

    var username = getCookie('username');
    if(username){
        setting.setAuth(username);
    }

    if(Math.round(Math.random() * 10) > 5){
        setting.layout.adminLayout = 'layout3';
    }

    return setting;
}

app.factory('setting', [settingFactory]);