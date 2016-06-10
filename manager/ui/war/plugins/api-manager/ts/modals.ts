/// <reference path="../../includes.ts"/>
module ApimanModals {

    export var _module = angular.module('ApimanModals', ['ApimanLogger', 'ApimanRPC']);


    export var SelectApiCtrl = _module.controller('SelectApiCtrl',
        [
            '$scope',
            '$uibModalInstance',
            'ApimanSvcs',
            'Logger',
            'OrgSvcs',
            'options',
            function ($scope, $uibModalInstance, ApimanSvcs, Logger, OrgSvcs, options) {

                $scope.options = options;
                $scope.selectedApi = undefined;
                $scope.selectedApiVersion = undefined;
                $scope.title = options.title;

                $scope.search = function () {
                    $scope.selectedApi = undefined;

                    if (!$scope.searchText) {
                        $scope.criteria = undefined;
                        $scope.apis = undefined;
                    } else {
                        $scope.searchButton.state = 'in-progress';

                        var body:any = {};
                        body.filters = [];

                        body.filters.push({
                            'name': 'name',
                            'value': '%' + $scope.searchText + '%',
                            'operator': 'like'
                        });

                        var searchStr = angular.toJson(body);

                        Logger.log('Searching for apis: {0}', $scope.searchText);

                        ApimanSvcs.save({
                            entityType: 'search',
                            secondaryType: 'apis'
                        }, searchStr, function (reply) {
                            if (reply.beans.length > 0) {
                                $scope.apis = reply.beans;
                            } else {
                                $scope.apis = undefined;
                            }

                            $scope.criteria = $scope.searchText;

                            Logger.log('Found {0} apis.', reply.beans.length);

                            $scope.searchButton.state = 'complete';
                        }, function (error) {
                            Logger.error(error);

                            // TODO do something interesting with the error
                            $scope.apis = undefined;
                            $scope.criteria = $scope.searchText;
                            $scope.searchButton.state = 'error';
                        });
                    }
                };

                $scope.onApiSelected = function (api) {
                    if ($scope.selectedApi) {
                        $scope.selectedApi.selected = false;
                    }

                    //console.log('api: ' + JSON.stringify(api));

                    $scope.selectedApi = api;
                    api.selected = true;
                    $scope.selectedApiVersion = undefined;

                    OrgSvcs.query({
                        organizationId: api.organizationId,
                        entityType: 'apis',
                        entityId: api.id,
                        versionsOrActivity: 'versions'
                    }, function (versions) {
                        //console.log('versions: ' + JSON.stringify(versions));

                        if ($scope.options.publishedOnly === true) {
                            //console.log('publishedOnly: ' + JSON.stringify($scope.options.publishedOnly));
                            var validVersions = [];

                            angular.forEach(versions, function (version) {
                                if (version.status == 'Published') {
                                    validVersions.push(version);
                                    //console.log('version: ' + JSON.stringify(version));
                                }
                            });

                            $scope.apiVersions = validVersions;

                            //console.log('apiVersions: ' + JSON.stringify($scope.apiVersions));
                        } else {
                            //console.log('publishedOnly: ' + JSON.stringify($scope.options.publishedOnly));
                            $scope.apiVersions = versions;
                        }

                        if ($scope.apiVersions.length > 0) {
                            //console.log('length is 0');
                            $scope.selectedApiVersion = $scope.apiVersions[0];
                        }
                    }, function (error) {
                        //console.log('error: ' + JSON.stringify(error));

                        $scope.apiVersions = [];
                        $scope.selectedApiVersion = undefined;
                    });
                };

                $scope.ok = function () {
                    $uibModalInstance.close($scope.selectedApiVersion);
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                /*
                    // A simple "Select an API" dialog (allows selecting a single api + version
                    //////////////////////////////////////////////////////////////////////////////////
                    selectApi: function (title, handler, publishedOnly) {
                        var modalScope = $rootScope.$new(true);

                        modalScope.selectedApi = undefined;
                        modalScope.selectedApiVersion = undefined;
                        modalScope.title = title;

                        $('body').append($compile('<apiman-select-api-modal modal-title="{{ title }}"></apiman-select-api-modal>')(modalScope));

                        $timeout(function () {
                            $('#selectApiModal')['modal']({'keyboard': true, 'backdrop': 'static'});
                            $('#selectApiModal').on('shown.bs.modal', function () {
                                $('#selectApiModal .input-search').focus();
                            });
                        }, 75);

                        modalScope.search = function () {
                            modalScope.selectedApi = undefined;

                            if (!modalScope.searchText) {
                                modalScope.criteria = undefined;
                                modalScope.apis = undefined;
                            } else {
                                modalScope.searchButton.state = 'in-progress';

                                var body:any = {};
                                body.filters = [];

                                body.filters.push({
                                    'name': 'name',
                                    'value': '%' + modalScope.searchText + '%',
                                    'operator': 'like'
                                });

                                var searchStr = angular.toJson(body);

                                Logger.log('Searching for apis: {0}', modalScope.searchText);

                                ApimanSvcs.save({
                                    entityType: 'search',
                                    secondaryType: 'apis'
                                }, searchStr, function (reply) {
                                    if (reply.beans.length > 0) {
                                        modalScope.apis = reply.beans;
                                    } else {
                                        modalScope.apis = undefined;
                                    }

                                    modalScope.criteria = modalScope.searchText;

                                    Logger.log('Found {0} apis.', reply.beans.length);

                                    modalScope.searchButton.state = 'complete';
                                }, function (error) {
                                    Logger.error(error);

                                    // TODO do something interesting with the error
                                    modalScope.apis = undefined;
                                    modalScope.criteria = modalScope.searchText;
                                    modalScope.searchButton.state = 'error';
                                });
                            }
                        };

                        modalScope.onApiSelected = function (api) {
                            if (modalScope.selectedApi) {
                                modalScope.selectedApi.selected = false;
                            }

                            modalScope.selectedApi = api;
                            api.selected = true;
                            modalScope.selectedApiVersion = undefined;

                            OrgSvcs.query({
                                organizationId: api.organizationId,
                                entityType: 'apis',
                                entityId: api.id,
                                versionsOrActivity: 'versions'
                            }, function (versions) {
                                if (publishedOnly) {
                                    var validVersions = [];

                                    angular.forEach(versions, function (version) {
                                        if (version.status == 'Published') {
                                            validVersions.push(version);
                                        }
                                    });

                                    modalScope.apiVersions = validVersions;
                                } else {
                                    modalScope.apiVersions = versions;
                                }

                                if (modalScope.apiVersions.length > 0) {
                                    modalScope.selectedApiVersion = modalScope.apiVersions[0];
                                }
                            }, function (error) {
                                modalScope.apiVersions = [];
                                modalScope.selectedApiVersion = undefined;
                            });
                        };

                        modalScope.onOK = function () {
                            if (handler) {
                                handler(modalScope.selectedApiVersion);
                            }
                        };
                    }
                };
                */
            }]);

    /*
    export var Dialogs = _module.factory('Dialogs',
        ['Logger', '$compile', '$rootScope', '$timeout', 'ApimanSvcs', 'OrgSvcs',
            function (Logger, $compile, $rootScope, $timeout, ApimanSvcs, OrgSvcs) {
                return {
                    // Simple data entry dialog
                    ///////////////////////////
                    getValue: function (title, message, label, initialValue, okCallback, cancelCallback) {
                        var modalScope = $rootScope.$new(true);

                        modalScope.onOK = function () {
                            if (okCallback) {
                                okCallback(modalScope.value);
                            }
                            cancelCallback = null;
                        };

                        modalScope.onCancel = function () {
                            if (cancelCallback) {
                                cancelCallback();
                            }
                            cancelCallback = null;
                        };

                        modalScope.title = title;
                        modalScope.message = message;
                        modalScope.label = label;
                        modalScope.value = initialValue;

                        $('body').append($compile('<apiman-getvalue-modal modal-title="{{ title }}" />')(modalScope));

                        $timeout(function() {
                            $('#valueModal').on('hidden.bs.modal', function () {
                                if (cancelCallback) {
                                    $rootScope.$apply(cancelCallback);
                                }
                                cancelCallback = null;
                            });

                            $('#valueModal')['modal']({'keyboard': true, 'backdrop': 'static'});
                        }, 75);

                    },
                    // A standard confirmation dialog
                    /////////////////////////////////
                    confirm: function (title, message, yesCallback, noCallback) {
                        var modalScope = $rootScope.$new(true);

                        modalScope.onYes = function () {
                            if (yesCallback) {
                                yesCallback();
                            }
                        };

                        modalScope.onNo = function () {
                            if (noCallback) {
                                noCallback();
                            }
                            noCallback = null;
                        };

                        modalScope.title = title;
                        modalScope.message = message;

                        $('body').append($compile('<apiman-confirm-modal modal-title="{{ title }}">{{ message }}</apiman-confirm-modal>')(modalScope));

                        $timeout(function () {
                            $('#confirmModal').on('hidden.bs.modal', function () {
                                if (noCallback) {
                                    $rootScope.$apply(noCallback);
                                }
                                noCallback = null;
                            });

                            $('#confirmModal')['modal']({'keyboard': true, 'backdrop': 'static'});
                        }, 75);
                    },

                    // A simple "Select an API" dialog (allows selecting a single api + version
                    //////////////////////////////////////////////////////////////////////////////////
                    selectApi: function (title, handler, publishedOnly) {
                        var modalScope = $rootScope.$new(true);

                        modalScope.selectedApi = undefined;
                        modalScope.selectedApiVersion = undefined;
                        modalScope.title = title;

                        $('body').append($compile('<apiman-select-api-modal modal-title="{{ title }}"></apiman-select-api-modal>')(modalScope));

                        $timeout(function () {
                            $('#selectApiModal')['modal']({'keyboard': true, 'backdrop': 'static'});
                            $('#selectApiModal').on('shown.bs.modal', function () {
                                $('#selectApiModal .input-search').focus();
                            });
                        }, 75);

                        modalScope.search = function () {
                            modalScope.selectedApi = undefined;

                            if (!modalScope.searchText) {
                                modalScope.criteria = undefined;
                                modalScope.apis = undefined;
                            } else {
                                modalScope.searchButton.state = 'in-progress';

                                var body:any = {};
                                body.filters = [];

                                body.filters.push({
                                    'name': 'name',
                                    'value': '%' + modalScope.searchText + '%',
                                    'operator': 'like'
                                });

                                var searchStr = angular.toJson(body);

                                Logger.log('Searching for apis: {0}', modalScope.searchText);

                                ApimanSvcs.save({
                                    entityType: 'search',
                                    secondaryType: 'apis'
                                }, searchStr, function (reply) {
                                    if (reply.beans.length > 0) {
                                        modalScope.apis = reply.beans;
                                    } else {
                                        modalScope.apis = undefined;
                                    }

                                    modalScope.criteria = modalScope.searchText;

                                    Logger.log('Found {0} apis.', reply.beans.length);

                                    modalScope.searchButton.state = 'complete';
                                }, function (error) {
                                    Logger.error(error);

                                    // TODO do something interesting with the error
                                    modalScope.apis = undefined;
                                    modalScope.criteria = modalScope.searchText;
                                    modalScope.searchButton.state = 'error';
                                });
                            }
                        };

                        modalScope.onApiSelected = function (api) {
                            if (modalScope.selectedApi) {
                                modalScope.selectedApi.selected = false;
                            }

                            modalScope.selectedApi = api;
                            api.selected = true;
                            modalScope.selectedApiVersion = undefined;

                            OrgSvcs.query({
                                organizationId: api.organizationId,
                                entityType: 'apis',
                                entityId: api.id,
                                versionsOrActivity: 'versions'
                            }, function (versions) {
                                if (publishedOnly) {
                                    var validVersions = [];

                                    angular.forEach(versions, function (version) {
                                        if (version.status == 'Published') {
                                            validVersions.push(version);
                                        }
                                    });

                                    modalScope.apiVersions = validVersions;
                                } else {
                                    modalScope.apiVersions = versions;
                                }

                                if (modalScope.apiVersions.length > 0) {
                                    modalScope.selectedApiVersion = modalScope.apiVersions[0];
                                }
                            }, function (error) {
                                modalScope.apiVersions = [];
                                modalScope.selectedApiVersion = undefined;
                            });
                        };

                        modalScope.onOK = function () {
                            if (handler) {
                                handler(modalScope.selectedApiVersion);
                            }
                        };
                    }
                };
            }]);
            */

}