var authService = require("./model");
exports.register = function (req, res) {
  let register = authService.Register(req.body, function (err, result) {
    if (err) {
      if (err.code.match("UsernameExistsException")) {
        res.status(400).json({ message: `Username already exists` });
      }
	 else if(err.code.match("InvalidParameterException")){
		res.status(400).json({ message: `Invalid user name format` });
	 } 
	  else {
        res.status(401).json({ message: `${err.code}` });
      }
    } else {
        res.status(200).json(result);
    }
  });
};
