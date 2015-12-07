require('auth/session');
require('service/user');

app.factory('auth', ['$q', '$state', 'session', 'userService', 'modal', authenticator]);

function authenticator($q, $state, session, userService, modal) {
    var auth = {
        getUserName: function () {
            return session.username;
        },
        login: loginUser,
        logout: logoutUser,
        isLogin: function () {
            return !!session.sessionId;
        },
        showLoginModal: function () {
            modal.show('modules/auth/login.html', [
                    '$scope', '$state', 'setting', function ($scope, $state, setting) {
                        $scope.login = function () {
                            auth.login($scope.username, $scope.password)
                                .then(function (result) {
                                    if (result.success) {
                                        setting.layout.path = 'modules/backend/layout/index.html';
                                        $state.go('dashboard', {});
                                    } else {
                                        alert(result.message);
                                    }
                                });
                        };
                    }
                ],
                'login'
            )
            ;
        }
    };
    return auth;

    function loginUser(username, password) {
        var defer = $q.defer();

        username === password;

        session.set({
            username: username
        });

        defer.resolve({
            success: true,
            message: '登录成功'
        });

        auth.username = username;

        return defer.promise;
    }

    function logoutUser() {
        $state.go('login');
    }
}