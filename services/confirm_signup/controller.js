const authService = require("./model");

exports.confirm = function (req, res) {
  let confirm = authService.ConfirmUser(req.body, function (err, result) {
    if (err) {
		if (err.code.match("NotAuthorizedException")) {
		  res.status(401).json({ message: `Not Authorized` });
		}
		else {
		  res.status(401).json({ message: `${err.code}` });
		}
	  } else {
		  res.status(200).json(result);
	  }
  });
};
