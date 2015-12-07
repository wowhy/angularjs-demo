require('auth/auth');
require('utility/modal');

app.controller('loginController', [
    '$scope', 'auth', loginController
]);

function loginController($scope, auth) {
    auth.showLoginModal();
}

