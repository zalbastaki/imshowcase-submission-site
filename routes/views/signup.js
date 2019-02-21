var keystone = require('keystone');
var signupUrl = require('../../utils/signupUrl');

exports = module.exports = function (req, res) {
	res.redirect(signupUrl);
};
