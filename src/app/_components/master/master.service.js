(function() {
	'use strict';

	angular.module('app').factory('masterService', function($http, $resource) {
		
		function getCountries() {
			var url = "/~api/countries";
			
			return $resource(url).query().$promise;
		}

		function getStates(country) {
			var url = '/~api/states/:country';

			return $resource(url, {country: country}).query().$promise;
		}

		return {
			getCountries: getCountries,
			getStates: getStates
		}
	});
})();