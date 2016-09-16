(function() {
  'use strict';

  angular
	.module('app.signup')
	.constant('gender', [
		'Male', 'Female'
	])
	
	.controller('SignupController', function(masterService, userService, gender, $scope, $state) {
		
		var vm = angular.extend(this, gender);
		
		function getCountries() {
			masterService.getCountries().then(function(countries) {
				vm.countries = countries;
			});
		}

		vm.user = {};		
		vm.gender = gender;

		vm.checkUser = function() {
			if ($scope.signup_form.username.$valid === true) {
				userService.checkUser(vm.user.username).then(function(data) {
					if (data[0].message != null) {
						vm.errormessage = data[0].message;
					}
				});
			}

		}
			
		vm.getStates = function(country) {
			vm.states = [];
			vm.user.state = '';
			
			masterService.getStates(country).then(function(states) {
				vm.states = states;
			});
		}

		vm.onSubmit = function() {
			if ($scope.signup_form.$valid === true) {
				userService.createUser(vm.user).then(function() {
					vm.user = {};

					$scope.signup_form.$setPristine();
					$scope.signup_form.$setUntouched();

					console.log('congrats! data submitted successfully!');
					$state.go('app.login');
				});
			}
		}

		getCountries();
    })
})();