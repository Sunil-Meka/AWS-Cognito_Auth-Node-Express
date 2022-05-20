const authService = require("./model");
exports.validate_token = function (req, res) {
  let validate = authService.Validate(req.body.token, function (err, result) {
    if (err) {
      res.status(401).json({ message: `${err.message}` });
    } else {
      res.status(201).json({ message: `${result}` });
    }
  });
};
