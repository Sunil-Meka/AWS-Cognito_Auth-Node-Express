var express = require('express');

var router = express.Router();

router.post('/auth/register',require('./services/signup/controller').register);

router.post('/auth/confirmUser',require('./services/confirm_signup/controller').confirm);

router.post('/auth/login', require('./services/signin/controller').login);

router.post('/auth/validate', require('./services/token/controller').validate_token);

router.get('/hello', require('./services/Auth_Middleware/model').Validate, require('./services/hello/controller').simple_hello);

module.exports = router;