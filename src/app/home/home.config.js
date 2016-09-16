(function () {
    'use strict';

    angular
        .module('app.home')
        .config(function ($stateProvider) {
        	$stateProvider
	        	.state('app.home', {
                		url: "/:type",
				        params:  { username: null, type: null },
				        views: {
                    		'content@': {
		        			   templateUrl: 'app/home/home.template.html',
		        			   controller: 'HomeController',
		        			   controllerAs: 'user'
                    		}
                    	}	
                });
        });
})();