function msgFactory($modal, setting){
    var msg = {};
    
    msg.confirm = function (model) {
        if (!model.ok) {
            model.ok = '确定';
        }
        if (!model.cancel) {
            model.cancel = '取消';
        }

        return $modal.open({
            templateUrl: 'app/templates/confirm.html',
            backdrop: 'static',
            controller: ['$scope', '$modalInstance', 'args', function ($scope, $modalInstance, args) {
                $scope.ok = function () {
                    $modalInstance.close(true);
                }

                $scope.cancel = function () {
                    $modalInstance.close(false);
                }

                $scope.model = args;
            }],
            resolve: {
                args: function () {
                    return model;
                }
            }
        }).result;
    };
    
    msg.notify = function(content, options){
        alert(content);
    }
    
    return msg;
}

angular.module('example.utility')
       .factory('msg', ['$modal', msgFactory]);