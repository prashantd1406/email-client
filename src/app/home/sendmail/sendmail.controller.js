/* Controller for Modal which is used to compose & send mail */
(function() {
	'use strict';

	angular.module('app.home')
	.controller('SendMailModalController', function($modalInstance, mail, userService, SweetAlert) {
		var vm = this;

		vm.mail = mail ? mail : null;

		function usernames() {
			userService.usernames().then(function(data) {
				vm.usernames = data;
			});
		}

		vm.draft = function() {
			if (vm.mail === null) {
				$modalInstance.dismiss('cancel');
			}
			else {
				vm.mail.flag = 'draft';
				vm.mail.from = 'kishor@mindigit.com';
				$modalInstance.close(vm.mail);	
			}
		}

		vm.send = function() {
			if (vm.mail === null) {
				SweetAlert.swal('Error', 'Please specify at least one recipient.');
				return;
			}

			if (!vm.mail.to) {
				SweetAlert.swal('Error', 'Please specify at least one recipient.');
				return;
			}

			if (!vm.mail.title && !vm.mail.body) {
				SweetAlert.swal({
						title: '',
						text: 'Send this message without a subject or text in the body?',
						showCancelButton: true,
						confirmButtonText: 'Yes, send it!',
						cancelButtonText: 'No, cancel it!',
						closeOnConfirm: true
					},
					function(isConfirm) {
						if (isConfirm === true) {
							vm.mail.flag = 'sent';
							vm.mail.from = 'kishor@mindigit.com';
							$modalInstance.close(vm.mail);
						}
					}
				);			
			}

			else {
				vm.mail.flag = 'sent';
				vm.mail.from = 'kishor@mindigit.com';
				$modalInstance.close(vm.mail);
			}
		}
		usernames();
	})
})();