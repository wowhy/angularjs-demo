import authorization from '../../../../src/admin/authorization';
import LoginController from '../../../../src/admin/authorization/login.controller';

describe('Admin', function () {
    describe('#Authorization', function () {
        let ctrl;

        beforeEach(()=> {
            angular.mock.module(authorization);

            angular.mock.inject(($rootScope) => {
                ctrl = new LoginController($rootScope.$new());
            });
        });

        it('初始化LoginController', function () {
            assert.equal(ctrl.message, 'Hello, World!');
        });
    });
});