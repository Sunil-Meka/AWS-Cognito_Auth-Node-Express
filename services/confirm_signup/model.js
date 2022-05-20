const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

const { poolData, pool_region } = require("../../utils/admin");

exports.ConfirmUser = function (body, callback) {
  var userName = body.name;
  var code = body.code;
  var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  var userData = {
    Username: userName,
    Pool: userPool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.confirmRegistration(code, true, function (err, result) {
    console.log("completed confirmation");
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};
