require('customer/customerController');

app.config(['$stateProvider', route]);

function route($stateProvider) {
    var customer = {
        name: 'customer',
        abstract: true,
        url: '/customer',
        data: { pageTitle: '客户管理' },
        template: '<ui-view />'
    }, customerList = {
        name: 'customer.list',
        url: '',
        parent: customer,
        data: { pageTitle: '客户列表' },
        templateUrl: 'modules/customer/customer-list.html',
        controller: 'customerController'
    }, customerAdd = {
        name: 'customer.Add',
        url: '/add',
        parent: customer,
        data: { pageTitle: '新增客户' },
        templateUrl: 'modules/customer/customer-edit.html',
        controller: 'customerController'
    }, customerEdit = {
        name: 'customer.edit',
        url: '/edit/:id',
        parent: customer,
        data: { pageTitle: '修改客户' },
        templateUrl: 'modules/customer/customer-edit.html',
        controller: 'customerController'
    }, customerEdit = {
        name: 'customer.detail',
        url: '/detail/:id',
        parent: customer,
        data: { pageTitle: '客户详细' },
        templateUrl: 'modules/customer/customer-detail.html',
        controller: 'customerController'
    }
    ;

    $stateProvider
        .state(customer)
        .state(customerList)
        .state(customerAdd)
        .state(customerEdit)
    ;
}