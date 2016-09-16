(function() {
	'use strict';

	angular.module('app').factory('mailService', function($http, $resource) {
		function saveDraft(draft) {
			var url = '/~api/savedraft/';

			return $resource(url).save(draft).$promise;
		}

		function updateDraft(draft) {
			var url = '/~api/updatedraft/';

			return $resource(url, null, { 'update': { method: 'PUT' } }).update(draft).$promise;
		}

		function deleteMail(mailType, id) {
			var url = '/~api/delete/:mailType/:id';

			return $resource(url, {}, { 'delete': { method: 'DELETE' } }).delete({ mailType: mailType, id: id }).$promise;
		}

		function sentMail(mail) {
			var url = '/~api/sentmail/';

			return $resource(url).save(mail).$promise;
		}

		function draftLength() {
			var url = '/~api/draftlength/';

			return $resource(url, {}).get().$promise;
		}

		function unreadLength() {
			var url = '/~api/unreadlength/';

			return $resource(url, {}).get().$promise;
		}

		function mailsLength(mailType) {
			var url = '/~api/mailslength/:mailType';

			return $resource(url, { mailType: mailType }).get().$promise;
		}

		function getMails(mailType, pageNo, size) {
			var url = '/~api/mails/:mailType/:pageNo/:size';

			return $resource(url, { mailType: mailType, pageNo: pageNo, size: size }).query().$promise;
		}

		function getMail(mailType, id) {
			var url = '/~api/mail/:mailType/:id/';

			return $resource(url, { mailType: mailType, id: id }).get().$promise;	
		}

		return {
			saveDraft: saveDraft,
			updateDraft: updateDraft,
			deleteMail: deleteMail,
			sentMail: sentMail,
			draftLength: draftLength,
			getMails: getMails,
			getMail: getMail,
			unreadLength: unreadLength,
			mailsLength: mailsLength
		}
	});
})();
