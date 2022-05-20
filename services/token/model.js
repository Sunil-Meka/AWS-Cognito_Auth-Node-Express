const { poolData, pool_region } = require("../../utils/admin");
const https = require("https");
const axios = require("axios");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");

exports.Validate = function (token, callback) {
  console.log(token);

  axios
    .get(
      `https://cognito-idp.${pool_region}.amazonaws.com/${poolData.UserPoolId}/.well-known/jwks.json`
    )
    .then((res) => {
		if(res.status === 200){
      pems = {};
      var keys = res.data["keys"];
      for (var i = 0; i < keys.length; i++) {
        var key_id = keys[i].kid;
        var modulus = keys[i].n;
        var exponent = keys[i].e;
        var key_type = keys[i].kty;
        var jwk = { kty: key_type, n: modulus, e: exponent };
        var pem = jwkToPem(jwk);
        pems[key_id] = pem;
      }
      var decodedJwt = jwt.decode(token, { complete: true });
      if (!decodedJwt) {
        console.log("Not a valid JWT token");
        callback(new Error("Not a valid JWT token"));
      }
      var kid = decodedJwt.header.kid;
      var pem = pems[kid];
      if (!pem) {
        console.log("Invalid token");
        callback(new Error("Invalid token"));
      }
      jwt.verify(token, pem, function (err, payload) {
        if (err) {
          console.log("Invalid Token.");
          callback(new Error("Invalid token"));
        } else {
          console.log("Valid Token.");
          callback(null, "Valid token");
        }
      })}
	  else{
		  throw new Error("something went wrong");
	  }
    })
    .catch((err) => {
      console.log(err);
      callback(err,null);
    });
};
