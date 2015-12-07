require('utility/setting');

function modalFactory($uibModal, $rootScope, $uibModalStack){
    var modal = {};

    modal.show = function(templateUrl, controller, size){
        var dialog = $uibModal.open({
            templateUrl: templateUrl,
            backdrop: 'static',
            size: (size? size : 'md'),
            controller: controller});

        return dialog.result;
    };

    $rootScope.$on('$stateChangeSuccess', function () {
        $uibModalStack.dismissAll();
    });

    return modal;
}

app.factory('modal', ['$uibModal', '$rootScope', '$uibModalStack', modalFactory]);