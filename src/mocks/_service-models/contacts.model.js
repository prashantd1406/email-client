angular.module('app').service('contactsModel', function() {
	var contacts = [
		{
			username: 'raghavar'
		}
	];

	var usernames = [];
	
	this.usernames = function() {
		var length = contacts.length;
		usernames.length = 0;
		for (var index = 0; index < length; index++) {
			usernames.push(contacts[index].username);
		};
		return usernames;
	}
});