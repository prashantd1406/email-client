(function () {
    'use strict';

    angular
        .module('app.signup')
        .config(function ($stateProvider) {
            $stateProvider
	            .state('app.signup', {
                    url: '/signup',
                    views: {
                        'content@': {
		        	        templateUrl: 'app/signup/signup.template.html',
		        	        controller: 'SignupController',
		        	        controllerAs: 'signup'
                    	}
                    }	
                });
        });
})();