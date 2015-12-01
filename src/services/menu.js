function menuService($http, $q) {
    this.authorizationMenus = function () {
        var menus = [
            {name: '权限管理系统', icon: 'icon-people', menus: [{name: '用户管理', url: '#/user'}]},
            { name: '报表管理系统', icon: 'icon-home', menus: [{ name: '数据源管理', url: '#/datasource' }] },
            { name: '职员管理', icon: 'icon-home', menus: [{ name: '职员管理', url: '#/employee' }] },
            { name: '房源管理系统', icon: 'icon-map',menus:[{name:'房源管理',url:'#/house'}] }
        ];

        var defer = $q.defer();

        setTimeout(function () {
            defer.resolve(menus);
        }, 200);

        return defer.promise;
    };

    this.frontendMenus = function () {
        var menus = [
            {
                name: '链家集团',
                menus: [
                    {
                        name: '链家网', url: '#', menus: [{
                            name: '大连链家', url: 'https://dl.lianjia.com'
                        },{
                            name: '北京链家', url: 'https://bj.lianjia.com'
                        }]
                    },
                    {name: '链家理财', url: 'https://licai.lianjia.com/'}
                ]
            },{
                name: '关于',
                menus: [
                    { name: '关于', url: '#/about' },
                    { name: '广告合作', url: '#/ad' },
                    { name: '友情链接', url: '#/link' }
                ]
            }
        ];

        var defer = $q.defer();

        setTimeout(function () {
            defer.resolve(menus);
        }, 200);

        return defer.promise;
    };
}

app.service('menuService', ['$http', '$q', menuService]);