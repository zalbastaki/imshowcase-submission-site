const keystone = require('keystone');
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');
const signoutUrl = require('../../utils/signoutUrl');

module.exports = function (req, res) {

	res.clearCookie('accessToken');

	res.redirect(signoutUrl);
};
