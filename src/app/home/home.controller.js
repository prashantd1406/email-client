(function() {
  'use strict';

  angular
	.module('app.home')
	.controller('HomeController', function($scope, $state, $stateParams, $modal, mailService, SweetAlert) {

		var vm = this;

		vm.username = $stateParams.username;
		vm.mailType = $stateParams.type;
		vm.currentPage = 1;

		function mailsLength() {
			mailService.mailsLength(vm.mailType).then(function(data) {
				vm.allMailsLength = data.length;
			});
		}

		function draftLength() {
			mailService.draftLength().then(function(data) {
				vm.draftLength = data.length;
			});
		}

		function unreadLength() {
			mailService.unreadLength().then(function(data) {
				vm.unreadLength = data.length;
			});
		}

		vm.getMails = function(mailType) {
			vm.mail = null;
			vm.mails = null;
			vm.replyForward = false;
			vm.masterCheckbox = false;
			vm.showDeleteMail = false;
			vm.showDiscardDraft = false;
			vm.showDeleteForever = false;

			mailService.getMails(mailType, vm.currentPage, 5).then(function(mails) {
				if (mails.length !== 0) {
					vm.mails = mails;
					vm.currentMail = mails[0].id;
					vm.lastMail = mails[mails.length - 1].id;
					vm.mailsPerPage = mails.length;
					mailsLength();
				}
			});
		}

		vm.showMail = function(id) {
			vm.mail = {};
			vm.show = true;
			vm.showDeleteMail = false;
			vm.showDiscardDraft = false;
			vm.showDeleteForever = false;
			vm.currentMail = id;

			if (vm.mailType === 'Drafts') {
				mailService.getMail(vm.mailType, id).then(function(mail) {
					vm.mail = mail;
					vm.composeMail(mail);
				});
				return;
			}
		}

		vm.deleteMail = function() {
			if (vm.mailType === 'Inbox' || vm.mailType === 'Sent') {
				mailService.deleteMail(vm.mailType, vm.mail.id).then(function() {
					vm.message = 'The conversation has been moved to the Trash.';
				});
			}

			if (vm.mailType === 'Trash') {
				mailService.deleteMail(vm.mailType, vm.mail.id).then(function() {
					console.log('mail deleted forever!');
				});		
			}
			vm.getMails(vm.mailType);
		}

		vm.replyOrForward = function(responseType) {
			vm.responseMail = {};
			vm.responseMail.length = 0;
			vm.replyForward = true;
			
			if (responseType === 'forward') {
				vm.responseMail.title = 'Fw: ' + vm.mail.title;
				vm.responseMail.from = vm.username + '@mindigit.com';
				vm.responseMail.to = '';
				vm.responseMail.body = '<div><br><br>' + 
								'---------- Forwarded message ----------' +
								'<br>From: ' + vm.mail.from +
								'<br>Subject: ' + vm.mail.title +
								'<br>To: ' + vm.mail.to +
								'<br><br>' + vm.mail.body + '</div>';
			}
			if (responseType === 'reply') {
				vm.responseMail.title = 'Re: ' + vm.mail.title;
				vm.responseMail.from = vm.username + '@mindigit.com';
				vm.responseMail.to = vm.mail.from;
				vm.responseMail.body = '<div><br><br>' + 
								'<span style="color: #500050;">' + vm.mail.from + ' wrote:' +
								'<br>' + vm.mail.body + '</span></div>';
			}
		}

		vm.send = function() {
			if (vm.responseMail.to === "") {
				SweetAlert.swal('Error', 'Please specify at least one recipient.');
			}
			else {
				vm.responseMail.flag = 'sent';
				mailService.sentMail(vm.responseMail).then(function() {
					vm.message = 'Your mail sent successfully.';
				});	
				vm.replyForward = false;
			}
		}

		vm.checkAllCheckboxes = function() {
			var length = vm.mails.length;
			if (vm.masterCheckbox === true) {
				for (var index = 0; index < length; index++) {
					vm.mails[index].checked = true;
				}
				if (vm.mailType === 'Inbox' || vm.mailType === 'Sent') {
					vm.showDeleteMail = true;
				}
				if (vm.mailType === 'Drafts') {
					vm.showDiscardDraft = true;
				}
				if (vm.mailType === 'Trash') {
					vm.showDeleteForever = true;
				}
			}
			else {
				for (var index = 0; index < length; index++) {
					vm.mails[index].checked = false;
				}
				vm.showDeleteMail = false;
				vm.showDiscardDraft = false;
				vm.showDeleteForever = false;
			}
		}

		vm.deleteMails = function() {
			var count = 0;
			var length = vm.mails.length;

			for (var index = 0; index < length; index++) {
				if (vm.mails[index].checked === true) {
					count++;
					mailService.deleteMail(vm.mailType, vm.mails[index].id);
				}
			}

			if (count > 0) {
				if (vm.mailType === 'Drafts') {
					draftLength();
					vm.message = 'Drafts have been deleted from the conversation.';	
				}
				if (vm.mailType === 'Inbox' || vm.mailType === 'Sent') {
					unreadLength();
					if (count === 1) {
						vm.message = 'The conversation has been moved to the Trash.';
					}
					else {
						vm.message = count + ' conversations have been moved to the Trash.';
					}					
				}
			}
			if (vm.currentPage !== 1) {
				vm.currentPage = vm.currentPage - 1;
			}
			vm.getMails(vm.mailType);
		}

		/* Creating angular-bootstrap Modal to compose new mail */
		vm.composeMail = function(mail) {
			var modalInstance = $modal.open({
				templateUrl: 'app/home/sendmail/sendmail.template.html',
				controller: 'SendMailModalController',
				controllerAs: 'modal',
				bindToController: true,
				backdrop: false,
				size: 'lg',
				resolve: {
					mail: function() {
						return mail;
					}
				}
			});

			modalInstance.result.then(function (mail) {
				if (mail.flag === 'sent') {
					mailService.sentMail(mail).then(function() {
						vm.message = 'Your mail sent successfully.';
						vm.getMails('Drafts');
						draftLength();
					});
				}
				if (mail.flag === 'draft') {
					if (mail.id) {
						mailService.updateDraft(mail).then(function() {	
							vm.getMails('Drafts');	
						});
					}
					else {
						mailService.saveDraft(mail).then(function() {
							draftLength();
						});
					}
				}
			},
			function() {
				console.log('Modal dismissed at: ' + new Date());
			})
		}

		$scope.$watch('vm.mails', function() {
			var count = 0;
			for (var index = 0; index < vm.mailsPerPage; index++) {
				if (vm.mails[index].checked === true) {
					count++;
				}
			}
			if (count === vm.mailsPerPage) {
				vm.masterCheckbox = true;
			}
			if (count > 0 && vm.mailType === 'Drafts') {
				vm.showDiscardDraft = true;
			}
			if (count > 0 && (vm.mailType === 'Inbox' || vm.mailType === 'Sent')) {
				vm.showDeleteMail = true;
			}
			if (count > 0 && vm.mailType === 'Trash') {
				vm.showDeleteForever = true;
			}
			if (count === 0) {
				vm.showDiscardDraft = false;
				vm.showDeleteMail = false;
				vm.showDeleteForever = false;
				vm.masterCheckbox = false;
			}
		}, true);

		draftLength();
		unreadLength();
		vm.getMails(vm.mailType);
    })
})();
