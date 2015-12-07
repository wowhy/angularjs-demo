function settingFactory() {
    var setting = {
        applicationName: '报表管理系统',
        tel: '0411-88888888',
        email: 'wowhy@outlook.com',

        layout: {
            path: '',
            pageSidebarClosed: false,
            menuCollapse: true
        },

        API: {
            baseUrl: ''
        }
    };

    if(Math.round(Math.random() * 10) > 5) {
        setting.layout.adminLayout = 'layout3';
    }

    return setting;
}

app.factory('setting', [settingFactory]);