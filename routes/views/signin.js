var keystone = require('keystone');
var signinUrl = require('../../utils/signinUrl');

exports = module.exports = function (req, res) {
	res.redirect(signinUrl);
};
