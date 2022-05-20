const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const {poolData,pool_region} = require('../../utils/admin');


exports.Login = function (body, callback) {
	var userName = body.name;
	var password = body.password;
	var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
		 Username: userName,
		 Password: password
	 });
	 var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	 var userData = {
		 Username: userName,
		 Pool: userPool
	 }
	 var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
	 cognitoUser.authenticateUser(authenticationDetails, {
		 onSuccess: function (result) {
			var accesstoken = result.getAccessToken().getJwtToken();
			callback(null, accesstoken);
		 },
		 onFailure: (function (err) {
			callback(err);
		})
	})
 };