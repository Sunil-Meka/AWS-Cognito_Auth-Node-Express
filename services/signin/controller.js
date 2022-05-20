const authService = require('./model')

exports.login = function(req, res){
	let login = authService.Login(req.body, function(err, result){
		if (err) {
			if (err.code.match("NotAuthorizedException")) {
			  res.status(401).json({ message: `Not Authorized` });
			}
			else if(err.code.match("UserNotFoundException")){
				res.status(400).json({ message: `User Not Found` });
			}
			else {
			  res.status(401).json({ message: `${err.code}` });
			}
		  } else {
			  res.status(200).json(result);
		  }
	})
 }