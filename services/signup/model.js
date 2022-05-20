global.fetch = require("node-fetch");
global.navigator = () => null;
const { poolData, pool_region } = require("../../utils/admin");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
exports.Register = function (body, callback) {
  var name = body.name;
  var email = body.email;
  var password = body.password;
  var attributeList = [];
  console.log(name, email, password);

  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: email,
    })
  );
  userPool.signUp(name, password, attributeList, null, function (err, result) {
    if (result) {
      var cognitoUser = result.user;
      callback(null, cognitoUser);
    } else {
      callback(err);
    }
  });
};
