(function(){
	'use strict';

	angular
		.module('app.components.password', [])
		.controller('PasswordController', function($scope) {
			var vm = this;
		})
		.directive('password', function() {
			return {
				replace: true,
				restrict: 'EA',
				scope: {
					form: '=',
					password1: '='
				},
				controller: 'PasswordController',
				controllerAs: 'vm',
				bindToController: true,
				templateUrl: 'app/_components/password/password.template.html'
			};
		});
})();
