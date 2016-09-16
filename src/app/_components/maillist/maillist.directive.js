(function(){
	'use strict';

	angular
		.module('app.components.mailList', [])
		.controller('MailListController', function($scope) {
			var vm = this;

			vm.selectedItem = function(id) {
				vm.selectedMailId({ id: id });
			}
		})

		.directive('mailList', function() {
			return {
				restrict: 'EA',
				scope: {
					'mails': '=',
					'selectedMailId': '&'
				},
				controller: 'MailListController',
				controllerAs: 'vm',
				bindToController: true,
				templateUrl: 'app/_components/maillist/maillist.template.html'
			};
		});
})();