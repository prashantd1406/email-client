angular.module("app").service("mailsModel", function() {
	var mails = {
			"Inbox" : [
				{
					"id": "1",
					"title": "Eighth test mail",
					"body": "Hi, we have session on Git tomorrow from 9.30 am to 1.30 pm.",
					"from": "raghavar@mindigit.com",
					"to": "kishors@mindigit.com",
					"flag": "unread"
				},
				{
					"id": "2",
					"title": "Seventh test mail",
					"body": "Hi, we have session on Git tomorrow from 9.30 am to 1.30 pm.",
					"from": "raghavar@mindigit.com",
					"to": "kishors@mindigit.com",
					"flag": "read"
				},
				{
					"id": "3",
					"title": "Sixth test mail",
					"body": "Hi, we have session on Git tomorrow from 9.30 am to 1.30 pm.",
					"from": "raghavar@mindigit.com",
					"to": "kishors@mindigit.com",
					"flag": "unread"
				},
				{
					"id": "4",
					"title": "Fifth test mail",
					"body": "Good Morning Kishor",
					"from": "prashantd@mindigit.com",
					"to": "kishors@mindigit.com",
					"flag": "unread"
				},
				{
					"id": "5",	
					"title": "Fourth test mail",
					"body": "Hi Kishor, How Are You?",
					"from": "prashantd@mindigit.com",
					"to": "kishors@mindigit.com",
					"flag": "read"
				},
				{
					"id": "6",
					"title": "Third test mail",
					"body": "Hi, we have session on Git tomorrow from 9.30 am to 1.30 pm.",
					"from": "raghavar@mindigit.com",
					"to": "kishors@mindigit.com",
					"flag": "unread"
				},
				{
					"id": "7",
					"title": "Second test mail",
					"body": "Good Morning Kishor",
					"from": "prashantd@mindigit.com",
					"to": "kishors@mindigit.com",
					"flag": "unread"
				},
				{
					"id": "8",	
					"title": "First test mail",
					"body": "Hi Kishor, How Are You?",
					"from": "prashantd@mindigit.com",
					"to": "kishors@mindigit.com",
					"flag": "read"
				}
			],

			"Sent" : [
				{
					"id": "1",
					"title": "Sixth sent mail",
					"body": "Good morning!",
					"to": "prashantd@mindigit.com",
					"from": "kishors@mindigit.com",
					"flag": "sent"
				},
				{
					"id": "2",	
					"title": "Fifth sent mail",
					"body": "Hi, Gm",
					"to": "raghavar@mindigit.com",
					"from": "kishors@mindigit.com",
					"flag": "sent"
				},
				{
					"id": "3",
					"title": "Forth sent mail",
					"body": "Good morning!",
					"to": "prashantd@mindigit.com",
					"from": "kishors@mindigit.com",
					"flag": "sent"
				},
				{
					"id": "4",	
					"title": "Third sent mail",
					"body": "Hi, Gm",
					"to": "raghavar@mindigit.com",
					"from": "kishors@mindigit.com",
					"flag": "sent"
				}
			],

			"Drafts": [
				{
					"id": "1",
					"title": "Third Draft",
					"body": "Time to start work!",
					"to": "prashantd@mindigit.com",
					"flag": "draft"
				},
				{
					"id": "2",
					"title": "Second Draft",
					"body": "Time to start work!",
					"to": "prashantd@mindigit.com",
					"flag": "draft"
				},
				{
					"id": "3",
					"title": "First Draft",
					"body": "Time to start work!",
					"to": "prashantd@mindigit.com",
					"flag": "draft"
				}
			],

			"Trash": [
			]
	};

	this.getMails = function(mailType, pageNo, size) {

		angular.forEach (mails, function(array, key) {
			if (mailType === key) {
    			response = array.slice(0, 5);
			}
		})
		return response;
	}

	this.draftLength = function() {
		return ({ 'length':  mails.Drafts.length });
	}

	this.unreadLength = function() {
		var count = 0;
		var length = mails.Inbox.length;

		for (var index = 0; index < length; index++) {
			if(mails.Inbox[index].flag === 'unread') {
				count++;
			}
		};

		return ({ 'length':  count });
	}

	this.mailsLength = function(mailType) {
		return ({ 'length':  mails[mailType].length });
	}

	this.getMail = function(mailType, id) {
		var length = mails[mailType].length;
		for (var index = 0; index < length; index++) {
			if (id === mails[mailType][index].id) {
				return mails[mailType][index];	
			};
		};
	}

	this.saveSentMail = function(mail) {
		var length = mails.Sent.length;
		mail.id = (length + 1).toString();
		mails.Sent.unshift(mail);
	}

	this.saveDraft = function(draft) {
		var length = mails.Drafts.length;

		if(draft.title === null) {
			draft.title = '(no subject)';	
		}

		draft.id = (length + 1).toString();
		mails.Drafts.unshift(draft);
	}

	this.deleteMail = function(mailType, id) {
		for (var index = 0; index < mails[mailType].length; index++) {
			if (id === mails[mailType][index].id) {
				mails[mailType].splice(index, 1);
				break;
			};
		};
		console.log(mails[mailType].length);
	}

	this.updateDraft = function(draft) {
		var length = mails.Drafts.length;

		for (var index = 0; index < length; index++) {
			if(draft.id === mails.Drafts[index].id) {
				mails.Drafts[index].to = draft.to;
				mails.Drafts[index].cc = draft.cc;
				mails.Drafts[index].title = draft.title;
				mails.Drafts[index].body = draft.body;
			}
		};
	}
});
