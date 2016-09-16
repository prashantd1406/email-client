angular.module('app').service('userModel', function() {
	var users = [
		{
			username: 'kishors',
			password: 'mindigit'
		},
		{
			username: 'prashantd',
			password: 'mindigit'
		},
		{
			username: 'raghavar',
			password: 'mindigit'
		},
		{
			username: 'rajnit',
			password: 'mindigit'
		},
		{
			username: 'rajeshd',
			password: 'mindigit'
		},
		{
			username: 'sonalz',
			password: 'mindigit'
		},
	];

	this.checkUser = function(username) {
		var length = users.length;
		for(var index=0; index<length; index++) {
			if(users[index].username === username) {
				return [{ 'message': 'Someone already has that username. Try another?' }];
			}				
		}
		return [{'message': null}];
	}

	this.addUser = function(user) {
		users.push(user);
	}

	this.userAuthentication = function(username, password) {
		var length = users.length;
		for(var index=0; index<length; index++) {
			if(username === users[index].username && password === users[index].password) {
				return { 'username': username }
			}
		}
		return { 'response': false }
	}
});