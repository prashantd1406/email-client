angular.module('app').service('stateModel', function(){
	var states = [
		{
			'India': [ 'Maharashtra', 'Gujrat', 'Goa' ]
	   	} , {
			'USA': [ 'California', 'Texas', 'Arizona' ]
	    } , {
			'Australia': [ 'New South Wales', 'Victoria', 'Western Australia' ]
		}
	];
	
	var array = [];
	
	this.getStates = function(country) {
		var length = states.length;

		angular.forEach(states, function(countryArr, key) {
			angular.forEach(countryArr, function(states, countryname) {			
				//console.log(countryname);
	
				if(countryname === country) {
					//console.log(states);
					array = states;	
				}						
			});					
		});
		return array;
	}
});