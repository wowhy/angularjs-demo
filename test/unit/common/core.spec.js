import core from '../../../src/common/core.js'

describe('Common', function () {
    describe('#Core', function () {
        let rootScope;

        beforeEach(()=> {
            angular.mock.module(core);

            angular.mock.inject(($rootScope) => {
                rootScope = $rootScope;
            });
        });

        it('正确创建Angulr Core Module', function () {
            assert.notEqual(rootScope.$state, undefined);
            assert.notEqual(rootScope.$state, undefined);
        });
    });
});