/**
 * Created by hongyuan on 2015/11/18.
 */
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

angular.module('example.utility')
    .factory('modal', ['$uibModal', modalFactory]);