"use strict";
/**
 * Each module has a <moduleName>.module.js file.  This file contains the angular module declaration -
 * angular.module("moduleName", []);
 * The build system ensures that all the *.module.js files get included prior to any other .js files, which
 * ensures that all module declarations occur before any module references.
 */
(function (module) {
    // 
    module.factory('dataSource', function () {

        function DataSource(callback) {
            this.items = [];
            this.loading = false;
            this.totalCount = 0;
            this.callback = callback;
            this.token = undefined;
            this.firstLoad = true;
            this.load();
        }

        DataSource.prototype.load = function () {

            if ((this.items.length < this.totalCount && !this.loading) || this.firstLoad) {
                this.loading = true;
                this.firstLoad = false;
                this.callback(this.token)
                    .then(angular.bind(this, DataSource.prototype.onLoad))
                    .finally(angular.bind(this, DataSource.prototype.cleanup));
            }
        };

        DataSource.prototype.onLoad = function (result) {
            this.token = typeof result.token !== 'undefined' ? result.token : result.items[result.items.length-1];
            this.totalCount = result.totalCount || result.items.length;
            // append new values
            for (var i = 0; i < result.items.length; i++) {
                this.items.push(result.items[i]);
            }
        };

        DataSource.prototype.cleanup = function () {
            this.loading = false;
        };

        return function (callback) {
            return new DataSource(callback);
        };
    });
}(angular.module("data-source", [])));