(function() {
  'use strict';

  angular
	.module('app.login')
	
	.controller('LoginController', function(userService, $scope, $state) {

		var vm = this;
		
		vm.showErrorMessage = false;
	
		vm.userAunthentication = function() {
			if ($scope.login_form.$valid === true) {
				userService.userAuthentication(vm.username, vm.password).then(function(data) {
					if (data.username != null) {
						$state.go('app.home', { username: data.username, type: 'Inbox' });
					}
					else {
						vm.showErrorMessage = true;
					}
				});
			}
		}	
    })
})();