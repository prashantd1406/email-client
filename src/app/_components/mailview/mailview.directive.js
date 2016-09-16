(function(){
	'use strict';

	angular
		.module('app.components.mailView', [])
		.controller('MailViewController', function(mailService) {
			var vm = this;

			function showMail() {
				mailService.getMail(vm.mailType, vm.id).then(function(mail) {
					vm.mail = mail;
				});
			}

			showMail();
		})

		.directive('mailView', function() {
			return {
				replace: true,
				restrict: 'EA',
				scope: {
					'id': '=',
					'mailType': '=',
					'mail': '='
				},
				controller: 'MailViewController',
				controllerAs: 'vm',
				bindToController: true,
				templateUrl: 'app/_components/mailview/mailview.template.html'
			};
		});
})();