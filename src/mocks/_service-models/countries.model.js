angular.module('app').service('countryModel', function(){
	var countries = ['India', 'USA', 'Australia'];

	this.getCountries = function(){
		return countries;	
	}
});
