import admin from '../../../../src/admin/admin.js'

describe('Admin', function () {
    describe('#Layout', function () {

        let rootScope,
            location,
            state;

        beforeEach(()=> {
            angular.mock.module(admin);

            angular.mock.inject(($rootScope, $location, $state) => {
                rootScope = $rootScope;
                location = $location;
                state = $state;
            });
        });

        it('正确加载并绑定菜单', function () {

        });
    });
});