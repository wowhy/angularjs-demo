import admin from '../../../src/admin/admin.js'

describe('Admin', function () {
    let rootScope,
        location,
        state;

    beforeEach(()=> {
        let app = angular.mock.module(admin);

        angular.mock.inject(($rootScope, $location, $state) => {
            rootScope = $rootScope;
            location = $location;
            state = $state;
        });
    });

    describe('#路由', function () {
        it('后台管理主页', function () {
            location.path('/');
            rootScope.$digest();

            assert.equal(state.current.name, 'index');
        });
    });
});