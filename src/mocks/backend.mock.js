angular.module('app').run(function($httpBackend, countryModel, stateModel, userModel, mailsModel, contactsModel) {
	var logRequest = function(method, url, data) {
		console.log(method);
    		console.log(url);
        	console.log(data);
	}
	var extractQueryParameters = function(url) {
		var query = {};
		var parameterString = url.split('?')[1];
		if (angular.isDefined(parameterString)) {
			var parameters = parameterString.split('&');
    	
			for (var index in parameters) {
			    var keyValues = parameters[index].split('=');
			    query[decodeURIComponent(keyValues[0])] = angular.fromJson(decodeURIComponent(keyValues[1]));
			}
		}
		return query;
	}
	
	$httpBackend.whenGET(/^app\//).passThrough();
	$httpBackend.whenGET(/^views\//).passThrough();
	
	
	/* calling countryModel */
	$httpBackend.whenGET(/\/~api\/countries/).respond(function(method, url, data) {
    	logRequest(method, url, data);
    	var staticList = countryModel.getCountries();
        return [200, staticList, {}];
    });
	
	/* calling stateModel */
	$httpBackend.whenGET(/\/~api\/states\/[a-z]*/).respond(function(method, url, data) {
		var country = url.split('/')[3];
    	logRequest(method, url, data);
    	var staticList = stateModel.getStates(country);
        return [200, staticList, {}];
    });

	/* calling userModel */
	$httpBackend.whenGET(/\/~api\/username\/[a-z]*/).respond(function(method, url, data) {
		var username = url.split('/')[3];
    	logRequest(method, url, data);
    	var staticList = userModel.checkUser(username);
        return [200, staticList, {}];
    });
    
	/* calling userModel to save user details */	
	$httpBackend.whenPOST(/\/~api\/user/).respond(function(method, url, data) {
		logRequest(method, url, data);
		var user = angular.fromJson(data);
		userModel.addUser(user);
		return [200, null, {}];
    });

	/* calling userModel to authenticate user */	
	$httpBackend.whenGET(/\/~api\/userauthentication\/[a-z0-9]*\/[a-z0-9]*/).respond(function(method, url, data) {
		logRequest(method, url, data);
		var username = url.split('/')[3];
		var password = url.split('/')[4];	
		var staticList = userModel.userAuthentication(username, password);
	    return [200, staticList, {}];
	});

    /* calling mailsModel to get mails */
	$httpBackend.whenGET(/\/~api\/mails\/[A-z]*\/[0-9]*\/[0-9]*/).respond(function(method, url, data) {
    	logRequest(method, url, data);
    	var mailType = url.split('/')[3];
    	var pageNo = url.split('/')[4];
    	var size = url.split('/')[5];
    	var staticList = mailsModel.getMails(mailType, pageNo, size);
        return [200, staticList, {}];
    });

    /* calling mailsModel to get mail */
	$httpBackend.whenGET(/\/~api\/mail\/[A-z]*\/[0-9]*/).respond(function(method, url, data) {
    	logRequest(method, url, data);
    	var mailType = url.split('/')[3];
    	var id = url.split('/')[4];
    	var staticList = mailsModel.getMail(mailType, id);
        return [200, staticList, {}];
    });

    /* calling mailsModel to save sent mail */
	$httpBackend.whenPOST(/\/~api\/sentmail/).respond(function(method, url, data) {
		logRequest(method, url, data);
		var mail = angular.fromJson(data);
		mailsModel.saveSentMail(mail);
		return [200, null, {}];
    });

    /* calling mailsModel to save draft mail */
	$httpBackend.whenPOST(/\/~api\/savedraft/).respond(function(method, url, data) {
		logRequest(method, url, data);
		var draft = angular.fromJson(data);
		mailsModel.saveDraft(draft);
		return [200, null, {}];
    });

    /* calling mailsModel to get all usernames */	
	$httpBackend.whenGET(/\/~api\/usernames/).respond(function(method, url, data) {
		logRequest(method, url, data);
    	var staticList = contactsModel.usernames();
        return [200, staticList, {}];
    });

    /* calling mailsModel to get drafts length */	
	$httpBackend.whenGET(/\/~api\/draftlength/).respond(function(method, url, data) {
		logRequest(method, url, data);
    	var staticList = mailsModel.draftLength();
        return [200, staticList, {}];
    });

    /* calling mailsModel to get unread length */	
	$httpBackend.whenGET(/\/~api\/unreadlength/).respond(function(method, url, data) {
		logRequest(method, url, data);
    	var staticList = mailsModel.unreadLength();
        return [200, staticList, {}];
    });

    /* calling mailsModel to get mails length */	
	$httpBackend.whenGET(/\/~api\/mailslength\/[A-z]*/).respond(function(method, url, data) {
		logRequest(method, url, data);
		var mailType = url.split('/')[3];
    	var staticList = mailsModel.mailsLength(mailType);
        return [200, staticList, {}];
    });

    /* calling mailsModel to delete sent mail from draft */
	$httpBackend.whenDELETE(/\/~api\/delete\/[A-z]*\/[0-9]*/).respond(function(method, url, data) {
    	logRequest(method, url, data);
    	var mailType = url.split('/')[3];
    	var id = url.split('/')[4];
    	mailsModel.deleteMail(mailType, id);
        return [200, null, {}];
    });

    /* calling mailsModel to update mail from Drafts */
	$httpBackend.whenPUT(/\/~api\/updatedraft/).respond(function(method, url, data) {
    	logRequest(method, url, data);
    	var draft = angular.fromJson(data);
    	mailsModel.updateDraft(draft);
        return [200, null, {}];
    });
});