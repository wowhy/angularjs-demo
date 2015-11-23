require('utility/setting');

function modalFactory($uibModal, setting){
    var modal = {};

    modal.show = function(templateUrl, controller, size){
        var dialog = $uibModal.open({
            templateUrl: templateUrl,
            backdrop: 'static',
            size: (size? size : 'md'),
            controller: controller});

        return dialog.result;
    };

    return modal;
}

app.factory('modal', ['$uibModal', modalFactory]);