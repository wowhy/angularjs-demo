(function(window, angular){ "use strict";var hngModule = angular.module('hng', ['ngSanitize', 'ui.router', 'ui.bootstrap', 'blockUI']);

hngModule.config(['blockUIConfig', function(blockUIConfig){
    blockUIConfig.message = '请稍等...';
    // blockUIConfig.autoBlock = false;
}]);

hngModule.service('hngCore', [
    'hngAjaxService',
    'hngRESTfulService',
    'hngGuid',
    'hngModal',
    'hngMsg',
    'hngLocalStorage',
    'hngSessionStorage',
    function (hngAjaxService
        , hngRESTfulService
        , hngGuid
        , hngModal
        , hngMsg
        , hngLocalStorage
        , hngSessionStorage) {
        this.service = {
            ajax: hngAjaxService,
            rest: hngRESTfulService
        };
        this.utility = {
            guid: hngGuid,
            modal: hngModal,
            msg: hngMsg,
            localStorage: hngLocalStorage,
            sessionStorage: hngSessionStorage
        };
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
            link: function (scope, element/*, attrs*/) {
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
;(function (hngModule) {
    hngModule.service('hngAjaxService', ['$http', '$q', 'blockUI', function ($http, $q, blockUI) {
        this.get = function (url, params, callback) {
            if (angular.isFunction(params)) {
                callback = params;
                params = {};
            }

            return ajax(url, 'GET', params, callback);
        };

        this.post = function (url, params, callback) {
            if (angular.isFunction(params)) {
                callback = params;
                params = {};
            }

            return ajax(url, 'POST', params, callback);
        };

        function ajax(url, method, params, callback) {
            blockUI.start();

            var options = {
                method: method,
                url: url
            };

            options[method == 'POST' ? 'data' : 'params'] = params;

            var defer = $q.defer();
            $http(options).then(function (res) {
                var result = isHngResultLike(res.data) ? res.data : {
                    success: true,
                    data: res.data,
                    message: '操作成功!'
                };
                defer.resolve(result);
            }, function (res) {
                var result = isHngResultLike(res.data) ? res.data : {
                    success: false,
                    status: res.status,
                    data: angular.isObject(res.data) ? res.data : null,
                    message : formatError(res.status)
                };

                defer.resolve(result);
            });

            return defer.promise.then(function (result) {
                blockUI.stop();
                if (angular.isFunction(callback)) {
                    callback(result);
                }

                return result;
            });
        }

        function formatError(status) {
            switch (status) {
                case 404:
                    return '未找到相关操作或资源!';
                case 405:
                    return '服务器不允许此操作!';
            }

            return '服务器发生未知错误!';
        }

        function isHngResultLike(result) {
            return angular.isObject(result) &&
                (
                    result.success !== undefined
                    && (result.data !== undefined || result.message !== undefined)
                );
        }
    }]);
})(hngModule);
;(function (hngModule) {
    hngModule.service('hngRESTfulService', ['$http', '$q', hngRESTfulService]);

    function hngRESTfulService($http, $q) {
        var service = this;

        service.createModelProxy = function (api, model, opt) {
            opt = opt || {};

            var v = opt.v,
                auth = opt.auth;

            if (api.lastIndexOf('/') !== api.length - 1) {
                api += '/';
            }

            v = v ? (v + '/') : '';

            var url = format('%1%2%3', api, v, model);
            return new modelProxy(url, auth);
        };

        service.get = function (url, params, headers) {
            return $http({method: 'GET', url: url, params: params, headers: headers});
        };
        service.post = function (url, params, headers) {
            return $http({method: 'POST', url: url, data: params, headers: headers});
        };
        service.put = function (url, params, headers) {
            return $http({method: 'PUT', url: url, data: params, headers: headers});
        };
        service.patch = function (url, params, headers) {
            return $http({method: 'PATCH', url: url, data: params, headers: headers});
        };
        service.delete = function (url, params, headers) {
            return $http({method: 'DELETE', url: url, params: params, headers: headers});
        };

        function modelProxy(api, auth) {
            var headers = {
                    Authorization: auth
                },
                me = this;

            var getUrl = api + '(%1)',
                deleteUrl = api + '(%1)',
                updateUrl = api + '(%1)',
                createUrl = api,
                allUrl = api,
                queryUrl = api;

            /**
             * @description
             *
             * 获取实体
             * api url: http://api/model/:id
             *
             * @param {string} 实体id
             * @returns {promise} 结果
             */
            me.get = function (id) {
                var ajax = service.get(format(getUrl, id), {}, headers).then(function (res) {
                    return {
                        success: true,
                        data: (angular.isObject(res) ? res.data : res)
                    };
                }, function (res) {
                    return {
                        status: res.status,
                        success: false,
                        data: res.data
                    };
                });

                return $q.all([ajax]).then(function (res) {
                    return res[0];
                });
            };

            /**
             * @description
             *
             * 查询所有实体
             * api url: http://api/model?order=:order&filter=:filter
             *
             * @param {object} 排序方式
             * @param {object} 搜索条件
             * @returns {promise}
             */
            me.all = function (order, filter) {
                var ajax = service.get(allUrl
                    , new queryOption().setOrder(order).setFilter(filter)
                    , headers).then(function (res) {
                    return {
                        success: true,
                        data: res.data
                    };
                }, function (res) {
                    return {
                        status: res.status,
                        success: false,
                        data: res.data
                    };
                });

                return $q.all([ajax]).then(function (res) {
                    return res[0];
                });
            };

            /**
             * @description
             *
             * 分页查询实体
             * api url: http://api/model/model?page=:page&limit=:limit&order=:order&filter=:filter
             *
             * @param {integer} 当前页数
             * @param {integer} 数量
             * @param {object} 排序方式
             * @param {object} 搜索条件
             * @returns {promise}
             */
            me.query = function (page, limit, order, filter) {
                var ajax = service.get(queryUrl
                    , new queryOption(page, limit, order, filter)
                    , headers).then(function (res) {
                    return handleQueryResult(res.data);
                }, function (res) {
                    var result = isHngResultLike(res.data) ? res.data : {
                        success: false,
                        status: res.status,
                        data: angular.isObject(res.data) ? res.data : null
                    };

                    return result;
                });

                return $q.all([ajax]).then(function (res) {
                    return res[0];
                });
            };

            /**
             * @description
             *
             * 创建实体
             * api url: http://api/model/
             *
             * @param {object} 实体
             * @returns {promise}
             */
            me.create = function (model) {
                var ajax = service.post(createUrl, model, headers).then(function (res) {
                    return {
                        success: true,
                        data: res.data
                    };
                }, function (res) {
                    return {
                        status: res.status,
                        success: false,
                        data: res.data
                    };
                });

                return $q.all([ajax]).then(function (res) {
                    return res[0];
                });
            };

            /**
             * @description
             *
             * 修改实体
             * api url: http://api/model/:id
             *
             * @param {object} 需要修改的实体
             * @returns {promise}
             */
            me.update = function (model) {
                var ajax = service.post(format(updateUrl, model.Id)
                    , model
                    , headers).then(function (res) {
                    return {
                        success: true,
                        data: res.data
                    };
                }, function (res) {
                    return {
                        status: res.status,
                        success: false,
                        data: res.data
                    };
                });

                return $q.all([ajax]).then(function (res) {
                    return res[0];
                });
            };

            /**
             * @description
             *
             * 删除实体
             * api url: http://api/model/:id
             *
             * @param {string} 实体ID
             * @returns {promise}
             */
            me.delete = function (id) {
                var ajax = service.delete(format(deleteUrl, id)
                    , model
                    , headers).then(function (res) {
                    return {
                        success: true,
                        data: res.data
                    };
                }, function (res) {
                    return {
                        status: res.status,
                        success: false,
                        data: res.data
                    };
                });

                return $q.all([ajax]).then(function (res) {
                    return res[0];
                });
            };

            function queryOption(page, limit, order, filter) {
                if (arguments.length) {
                    if (angular.isNumber(page)) {
                        if (!angular.isNumber(limit)) {
                            filter = order;
                            order = limit;
                            limit = 10;
                        }

                        this.setPage(page, limit)
                            .setOrder(order)
                            .setFilter(filter);
                    } else {
                        // otherwise
                    }
                }
            }

            queryOption.prototype = {
                setPage: function (page, limit) {
                    this.$skip = (page - 1) * limit;
                    this.$top = limit;
                    return this;
                },
                setOrder: function (order) {
                    if (order) {
                        this.$order = serializeOrder(order);
                    }

                    return this;
                },
                setFilter: function (filter) {
                    if (filter) {
                        this.$filter = serializeFilter(filter);
                    }

                    return this;
                }
            };

            function handleQueryResult(result) {
                if (isHngResultLike(result)) {
                    return result;
                }

                return {
                    success: true,
                    message: '操作成功!',
                    data: result.value
                };
            }
        }
    }

    function format(string) {
        var args = arguments;
        var pattern = new RegExp("%([1-" + arguments.length + "])", "g");
        return String(string).replace(pattern, function (match, index) {
            return args[index];
        });
    }

    function isHngResultLike(result) {
        return angular.isObject(result) &&
            (
                result.success !== undefined
                && (result.data !== undefined || result.message !== undefined)
            );
    }
})(hngModule);
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
        modal.show = function (url, controller, args, options) {
            options = options || {size: 'md'};

            var dialogOptions = angular.extend(options, {
                templateUrl: url,
                windowTemplateUrl: '/hfefx/template/modal.html',
                controller: controller,
                backdrop: 'static',
                keyboard: false,
                resolve: {
                    $routeParams: function(){
                        return args;
                    },
                    $stateParams: function () {
                        return args;
                    }
                }
            });

            var $dialog = $uibModal.open(dialogOptions);

            return {
                close: function (/*...*/) {
                    $dialog.close.apply($dialog, arguments);
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

    var linebreak = new RegExp('\n');

    function hngMsg($rootScope, $uibModal) {
        var msg = {},
            confirmOptions = {
                templateUrl: '/hfefx/template/confirm.html',
                backdrop: 'static',
                size: 'sm',
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
                size: 'sm',
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

            text = text.replace(linebreak, '<br />');

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

            text = text.replace(linebreak, '<br />');

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

            text = text.replace(linebreak, '<br />');

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
    "<div class=\"modal-header\"><h4 class=\"modal-title\">{{ $dialog.title }}&nbsp;</h4></div><div class=\"modal-body\" ng-bind-html=\"$dialog.text\"></div><div class=\"modal-footer\"><button type=\"submit\" dlg-focus ng-click=\"$close()\" class=\"btn btn-primary\">{{ $dialog.close }}</button></div>"
  );


  $templateCache.put('/hfefx/template/confirm.html',
    "<div class=\"modal-header\"><button type=\"button\" class=\"close\" ng-click=\"$close(false)\" aria-hidden=\"true\">×</button><h4 class=\"modal-title\">{{ $dialog.title }}&nbsp;</h4></div><div class=\"modal-body\" ng-bind-html=\"$dialog.text\"></div><div class=\"modal-footer\"><button type=\"submit\" dlg-focus ng-click=\"$close(true)\" class=\"btn btn-primary\">{{ $dialog.ok }}</button> <button ng-click=\"$close(false)\" class=\"btn btn-default\">{{ $dialog.cancel }}</button></div>"
  );


  $templateCache.put('/hfefx/template/modal.html',
    "<div modal-render=\"{{$isRendered}}\" tabindex=\"-1\" role=\"dialog\" class=\"modal\" uib-modal-animation-class=\"fade\" modal-in-class=\"in\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\"><div class=\"modal-dialog\" ng-class=\"size ? 'modal-' + size : ''\" ng-style=\"{'width': width}\"><div class=\"modal-content\" uib-modal-transclude></div></div></div>"
  );


  $templateCache.put('/hfefx/template/progress.html',
    "<div class=\"modal-header\"><h4 class=\"modal-title\">{{ $progress.title }}&nbsp;</h4></div><div class=\"modal-body\"><uib-progress max=\"$progress.max\"><uib-bar ng-repeat=\"bar in $progress.stacked track by $index\" value=\"bar.value\" type=\"{{bar.type}}\"><span>{{bar.value}}</span></uib-bar></uib-progress></div>"
  );


  $templateCache.put('/hfefx/template/prompt.html',
    "<div class=\"modal-header\"><button type=\"button\" class=\"close\" ng-click=\"$close(false)\" aria-hidden=\"true\">×</button><h4 class=\"modal-title\">{{ $dialog.title }}&nbsp;</h4></div><form><div class=\"modal-body\"><div ng-bind-html=\"$dialog.text\"></div><input class=\"form-control\" dlg-focus ng-model=\"$dialog.value\"></div><div class=\"modal-footer\"><button type=\"submit\" ng-click=\"$close($dialog.value)\" class=\"btn btn-primary\">{{ $dialog.ok }}</button> <button ng-click=\"$close(false)\" class=\"btn btn-default\">{{ $dialog.cancel }}</button></div></form>"
  );

}]);
})(window, angular);