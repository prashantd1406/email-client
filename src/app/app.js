(function() {
	'use strict';
	
	var appDependencies = [
	'ngResource',
	'ui.router',
	'ui.bootstrap',
	'validation.match',
	'textAngular',
	'oitozero.ngSweetAlert',
	'ui.grid',
	'app.login',
	'app.signup',
	'app.home',
	'app.components'
	];
	
	if (angular.mock) {
		appDependencies.push('ngMockE2E');
	} 
	angular.module('app', appDependencies); // TODO :: Change the app name to appropriate application

})();