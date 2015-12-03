(function(window, angular){ "use strict";var hngModule = angular.module('hng', ['ui.router', 'ui.bootstrap']);

hngModule.constant('hngConfig', {
});

hngModule.service('hngCore', [function () {
    this.service = {};
    this.utility = {};
}]);
;(function (hngModule) {
    hngModule.directive('hngShowModal', ['hngModal', hngShowModal]);

    function hngShowModal(hngModal) {
        return {
            scope:{
                hngModalUrl: '@',
                hngModalController: '@',
                hngModalCallback: '&'
            },
            link: function (scope, element, attrs) {
                element.on('click', function() {
                    var dialog = hngModal.show(scope.hngModalUrl, scope.hngModalController);
                    if(scope.hngModalCallback){
                        dialog.closed.then(scope.hngModalCallback);
                    }
                });
            }
        };
    }
})(hngModule);
;//(function (hngModule) {
//    hngModule.service('hngAjaxService', ['$http', 'blockUI', function ($http, blockUI) {
//        this.AjaxPost = function (route, data, successFunction, errorFunction) {
//            blockUI.start();
//
//            $http.post(route, data).success(function (response, status, headers, config) {
//                blockUI.stop();
//                successFunction(response, status);
//            }).error(function (response) {
//                blockUI.stop();
//                if (response.IsAuthenicated == false) {
//                    window.location = "/index.html";
//                }
//                errorFunction(response);
//            });
//        };
//
//        this.AjaxPostWithNoAuthenication = function (route, data, successFunction, errorFunction) {
//            blockUI.start();
//            $http.post(route, data).success(function (response, status, headers, config) {
//                blockUI.stop();
//                successFunction(response, status);
//            }).error(function (response) {
//                blockUI.stop();
//                errorFunction(response);
//            });
//        };
//
//        this.AjaxGet = function (route, successFunction, errorFunction) {
//            blockUI.start();
//            $http({method: 'GET', url: route}).success(function (response, status, headers, config) {
//                blockUI.stop();
//                successFunction(response, status);
//            }).error(function (response) {
//                blockUI.stop();
//                if (response.IsAuthenicated == false) {
//                    window.location = "/index.html";
//                }
//                errorFunction(response);
//            });
//        };
//
//        this.AjaxGetWithData = function (route, data, successFunction, errorFunction) {
//            blockUI.start();
//            $http({method: 'GET', url: route, params: data}).success(function (response, status, headers, config) {
//                blockUI.stop();
//                successFunction(response, status);
//            }).error(function (response) {
//                blockUI.stop();
//                if (response.IsAuthenicated == false) {
//                    window.location = "/index.html";
//                }
//                errorFunction(response);
//            });
//        };
//
//        this.AjaxGetWithNoBlock = function (route, data, successFunction, errorFunction) {
//            $http({method: 'GET', url: route, params: data}).success(function (response, status, headers, config) {
//                successFunction(response, status);
//            }).error(function (response) {
//                ;
//                if (response.IsAuthenicated == false) {
//                    window.location = "/index.html";
//                }
//                errorFunction(response);
//            });
//        }
//    }]);
//})(hngModule);
;//(function (hngModule) {
//    hngModule.service('hngRESTfulService', ['$http', '$q', hngRESTfulService]);
//
//    function hngRESTfulService($http, $q) {
//        this.createProxy = function (api) {
//            var proxy = {};
//
//            return proxy;
//        };
//
//        this.create = function () {
//        };
//
//        this.update = function(){
//
//        };
//    }
//})(hngModule);
;(function (hngModule) {
    hngModule.factory('hngGuid', [function () {
        return {
            newGuid: function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0,
                      v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
        };
    }]);
})(hngModule);
;(function (hngModule) {
    hngModule.factory('hngModal', ['$uibModal', hngModal])
        .run(['$rootScope', '$uibModalStack', function ($rootScope, $uibModalStack) {
            $rootScope.$on('$stateChangeSuccess', function () {
                // 页面跳转后关闭所有模态窗口
                $uibModalStack.dismissAll();
            });
        }]);

    function hngModal($uibModal) {
        var modal = {};

        /**
         * @description
         *
         * 打开模态窗口
         *
         * @param {string} 窗口模板地址
         * @param {string}|{Array}|{Object} Controller
         * @param {Object} 窗口传递参数
         * @returns {dialog}
         */
        modal.show = function (url, controller, hngArgs, options) {
            options = options || {size: 'md'};

            var dialogOptions = angular.extend(options, {
                templateUrl: url,
                windowTemplateUrl: '/hfefx/template/modal.html',
                controller: controller,
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    hngArgs: function () {
                        return hngArgs;
                    }
                }
            });

            var $dialog = $uibModal.open(dialogOptions);

            return {
                close: function (/*...*/) {
                    $dialog.close.apply(arguments);
                },
                closed: $dialog.result,
                opened: $dialog.opened
            };
        };

        return modal;
    }
})(hngModule);
;/**
 * @description
 * 
 * 提示信息模块
 * 
 */
(function (hngModule) {
    hngModule.factory('hngMsg', ['$rootScope', '$uibModal', hngMsg]);

    function hngMsg($rootScope, $uibModal) {
        var msg = {},
            confirmOptions = {
                templateUrl: '/hfefx/template/confirm.html',
                backdrop: 'static',
                title: '提示消息',
                ok: '确定',
                cancel: '取消'
            },
            alertOptions = {
                templateUrl: '/hfefx/template/alert.html',
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                title: '提示消息',
                close: '关闭'
            },
            promptOptions = {
                templateUrl: '/hfefx/template/prompt.html',
                backdrop: 'static',
                title: '提示消息',
                ok: '确定',
                cancel: '取消'
            },
            progressOptions = {
                templateUrl: '/hfefx/template/progress.html',
                backdrop: 'static',
                keyboard: false,
                size: 'sm',
                title: '进度提示'
            };

        /**
         * @description
         * 
         * 提示信息（确认，取消）
         * 
         * @param {string} 内容信息
         * @param {string} 标题
         * @param {function} 回掉函数
         * @returns {promise-boolean}
         */
        msg.confirm = function (text, title, callback) {
            if (arguments.length == 0) {
                text = value = title = '';
            } else {
                callback = angular.isFunction(arguments[arguments.length - 1])
                    ? arguments[arguments.length - 1]
                    : function (result) { return result; }

                title = angular.isString(title) ? title : confirmOptions.title;
            }

            var $dialog = { text: text, title: title, ok: confirmOptions.ok, cancel: confirmOptions.cancel },
                options = angular.extend({}, confirmOptions, {
                    scope: $rootScope.$new()
                });

            options.scope.$dialog = $dialog;

            return $uibModal.open(options).result.then(callback);
        };

        /**
         * @description
         * 
         * 提示信息（关闭）
         * 
         * @param {string} 内容信息
         * @param {string} 标题
         * @param {function} 回掉函数
         * @returns {promise-void}
         */
        msg.alert = function (text, title, callback) {
            if (arguments.length == 0) {
                text = value = title = '';
            } else {
                callback = angular.isFunction(arguments[arguments.length - 1])
                    ? arguments[arguments.length - 1]
                    : function (result) { return result; }

                title = angular.isString(title) ? title : alertOptions.title;
            }

            var $dialog = { text: text, title: title, close: alertOptions.close },
                options = angular.extend({}, alertOptions, {
                    scope: $rootScope.$new()
                });

            options.scope.$dialog = $dialog;

            return $uibModal.open(options).result.then(callback);
        };

        /**
         * @description
         * 
         * 通知消息
         * 
         * @param {string} 内容信息
         */
        msg.notify = function () {
        };

        /**
         * @description
         * 
         * 提示信息（确认，取消，可输入内容）
         * 
         * @param {string} 内容信息
         * @param {string} 初始值
         * @param {string} 标题
         * @param {function} 回掉函数
         * @returns {promise-string}
         */
        msg.prompt = function (text, value, title, callback) {
            if (arguments.length == 0) {
                text = value = title = '';
            } else {
                callback = angular.isFunction(arguments[arguments.length - 1])
                    ? arguments[arguments.length - 1]
                    : function (result) { return result; }

                value = angular.isString(value) ? value : '';
                title = angular.isString(title) ? title : promptOptions.title;
            }

            var $dialog = { text: text, value: value, title: title, ok: promptOptions.ok, cancel: promptOptions.cancel },
                options = angular.extend({}, promptOptions, {
                    scope: $rootScope.$new()
                });

            options.scope.$dialog = $dialog;
            return $uibModal.open(options).result.then(function (result) {
                if (result === false) {
                    return callback(null);
                }

                return callback(result);
            });
        };

        msg.progress = function (title, maxValue) {
            title = title ? title : progressOptions.title;
            maxValue = angular.isNumber(maxValue) ? maxValue : 100;

            function createProgressInstance(_title, _maxValue) {
                var options = angular.extend({}, progressOptions, {
                    scope: $rootScope.$new()
                }), scope = options.scope;

                scope.safeApply = function (fn) {
                    var phase = this.$root.$$phase;
                    if (phase == '$apply' || phase == '$digest') {
                        if (fn && (typeof (fn) === 'function')) {
                            fn();
                        }
                    } else {
                        this.$apply(fn);
                    }
                };

                var $progress = scope.$progress = {
                    title: _title,
                    stacked: [],
                    max: _maxValue
                };

                var $instance = $uibModal.open(options);

                $instance.setValue = function (type, value) {
                    scope.safeApply(function () {
                        for (var i = 0; i < $progress.stacked.length; i++) {
                            var bar = $progress.stacked[i];
                            if (bar.type == type) {
                                bar.value = value;
                                return;
                            }
                        }

                        $progress.stacked.push({ type: type, value: value });
                    });

                    if (this.getValue() >= _maxValue) {
                        this.complete();
                    }
                };
                $instance.getValue = function (type) {
                    if (type !== undefined) {
                        for (var i = 0; i < $progress.stacked.length; i++) {
                            var bar = $progress.stacked[i];
                            if (bar.type == type) {
                                return bar.value;
                            }
                        }

                        return 0;
                    }

                    var value = 0;
                    angular.forEach($progress.stacked, function (bar) {
                        value += bar.value;
                    });

                    return value;
                };
                $instance.increment = function (type) {
                    type = type || 'success';
                    this.setValue(type, this.getValue(type) + 1);
                };
                $instance.complete = function () {
                    this.close(true);
                };

                return $instance;
            }

            return createProgressInstance(title, maxValue);
        };

        return msg;
    }
})(hngModule);
;(function (hngModule) {
    hngModule.factory('hngLocalStorage', [localStorageFactory]);
    hngModule.factory('hngSessionStorage', [sessionStorageFactory]);

    function localStorageFactory() {
        return getStorage('localStorage');
    }

    function sessionStorageFactory() {
        return getStorage('sessionStorage');
    }

    // short version of https://github.com/marcuswestin/store.js,
    // only support modern browsers (Firefox 4.0+, Chrome 11+, IE9+, iOS 4+)
    function getStorage(storageName) {
        var win = window;
        getStorage._storeCache = getStorage._storeCache || {};
        if (getStorage._storeCache[storageName]) {
            return getStorage._storeCache[storageName];
        }

        var store = {},
          doc = win.document,
          localStorageName = storageName,
          storage;
        store.disabled = false;
        store.serialize = function (value) {
            return JSON.stringify(value);
        };
        store.deserialize = function (value) {
            if (typeof value != 'string') {
                return undefined;
            }
            try {
                return JSON.parse(value);
            } catch (e) {
                return value || undefined;
            }
        };
        // Functions to encapsulate questionable FireFox 3.6.13 behavior
        // when about.config::dom.storage.enabled === false
        // See https://github.com/marcuswestin/store.js/issues#issue/13
        function isLocalStorageNameSupported() {
            try {
                return (localStorageName in win && win[localStorageName]);
            } catch (err) {
                return false;
            }
        }
        if (isLocalStorageNameSupported()) {
            store.supported = true;
            storage = win[localStorageName];
            store.set = function (key, val) {
                if (val === undefined) {
                    return store.remove(key);
                }
                storage.setItem(key, store.serialize(val));
                return val;
            };
            store.get = function (key) {
                return store.deserialize(storage.getItem(key));
            };
            store.remove = function (key) {
                storage.removeItem(key);
            };
            store.clear = function () {
                storage.clear();
            };
            store.getAll = function () {
                var ret = {};
                store.forEach(function (key, val) {
                    ret[key] = val;
                });
                return ret;
            };
            store.forEach = function (callback) {
                for (var i = 0; i < storage.length; i++) {
                    var key = storage.key(i);
                    callback(key, store.get(key));
                }
            };
            try {
                var testKey = '__storejs__';
                store.set(testKey, testKey);
                if (store.get(testKey) != testKey) {
                    store.disabled = true;
                }
                store.remove(testKey);
            } catch (e) {
                store.disabled = true;
            }
            store.enabled = !store.disabled;
        } else {
            store.supported = false;
            store.enabled = false;
        }
        getStorage._storeCache[storageName] = store;
        return store;
    };
})(hngModule);
;angular.module('hng').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/hfefx/template/alert.html',
    "<div class=\"modal-header\"><h4 class=\"modal-title\">{{ $dialog.title }}&nbsp;</h4></div><div class=\"modal-body\"><p>{{ $dialog.text }}</p></div><div class=\"modal-footer\"><button type=\"submit\" dlg-focus ng-click=\"$close()\" class=\"btn btn-primary\">{{ $dialog.close }}</button></div>"
  );


  $templateCache.put('/hfefx/template/confirm.html',
    "<div class=\"modal-header\"><button type=\"button\" class=\"close\" ng-click=\"$close(false)\" aria-hidden=\"true\">×</button><h4 class=\"modal-title\">{{ $dialog.title }}&nbsp;</h4></div><div class=\"modal-body\"><p>{{ $dialog.text }}</p></div><div class=\"modal-footer\"><button type=\"submit\" dlg-focus ng-click=\"$close(true)\" class=\"btn btn-primary\">{{ $dialog.ok }}</button> <button ng-click=\"$close(false)\" class=\"btn btn-default\">{{ $dialog.cancel }}</button></div>"
  );


  $templateCache.put('/hfefx/template/modal.html',
    "<div modal-render=\"{{$isRendered}}\" tabindex=\"-1\" role=\"dialog\" class=\"modal\" uib-modal-animation-class=\"fade\" modal-in-class=\"in\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\"><div class=\"modal-dialog\" ng-class=\"size ? 'modal-' + size : ''\" ng-style=\"{'width': width}\"><div class=\"modal-content\" uib-modal-transclude></div></div></div>"
  );


  $templateCache.put('/hfefx/template/progress.html',
    "<div class=\"modal-header\"><h4 class=\"modal-title\">{{ $progress.title }}&nbsp;</h4></div><div class=\"modal-body\"><uib-progress max=\"$progress.max\"><uib-bar ng-repeat=\"bar in $progress.stacked track by $index\" value=\"bar.value\" type=\"{{bar.type}}\"><span>{{bar.value}}</span></uib-bar></uib-progress></div>"
  );


  $templateCache.put('/hfefx/template/prompt.html',
    "<div class=\"modal-header\"><button type=\"button\" class=\"close\" ng-click=\"$close(false)\" aria-hidden=\"true\">×</button><h4 class=\"modal-title\">{{ $dialog.title }}&nbsp;</h4></div><form><div class=\"modal-body\"><p>{{ $dialog.text }}</p><input class=\"form-control\" dlg-focus ng-model=\"$dialog.value\"></div><div class=\"modal-footer\"><button type=\"submit\" ng-click=\"$close($dialog.value)\" class=\"btn btn-primary\">{{ $dialog.ok }}</button> <button ng-click=\"$close(false)\" class=\"btn btn-default\">{{ $dialog.cancel }}</button></div></form>"
  );

}]);
})(window, angular);