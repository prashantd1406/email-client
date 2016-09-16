(function() {
	'use strict';

	angular.module('app').factory('userService', function($http, $resource) {
		
		function checkUser(username) {
			var url = '/~api/username/:username';
			
			return $resource(url, { username: username}).query().$promise;
		}

		function createUser(user) {
			var url = '/~api/user/';

			return $resource(url).save(user).$promise;
		}

		function userAuthentication(username, password) {
			var url = '/~api/userauthentication/:username/:password';

			return $resource(url, { username: username, password: password}).get().$promise;
		}

		function usernames() {
			var url = '/~api/usernames/';

			return $resource(url, {}).query().$promise;
		}

		return {
			checkUser: checkUser,
			createUser: createUser,
			userAuthentication: userAuthentication,
			usernames: usernames
		}
	});
})();