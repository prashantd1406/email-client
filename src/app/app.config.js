(function () {
    'use strict';

    angular
        .module('app')
        .config(function ($stateProvider) {
            $stateProvider.state('app', {
            	abstract: true
            });
        });
})();
