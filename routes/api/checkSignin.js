const keystone = require('keystone');
const User = keystone.list('User');
const cookieParser = require('cookie-parser');
const jwt = require('../../utils/jwt');

module.exports = async function (req, res, next) {
	const accessToken = req.cookies.accessToken;

	if (!accessToken) {
		res.redirect('/signin');
		return;
	} else {
		accessPayload = jwt.verify(accessToken);
		next();
	}
}
