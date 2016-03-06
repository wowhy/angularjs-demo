import UserDTO from '../../../src/models/user.js';

describe('Models', function () {
    describe('#User', function () {
        it('正确创建UserDTO实例', function () {
            var user = new UserDTO();
            assert.notEqual(user, null);
            assert.notEqual(user, undefined);

            user.name = 'test';

            assert.equal(user.name, 'test');
        });
    });
});