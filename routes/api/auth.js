const keystone = require('keystone');
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');
const signinUrl = require('../../utils/signinUrl');
const jwt = require('../../utils/jwt');
const User = keystone.list('User');

module.exports = async function (req, res) {

	const code = req.query.code;
 
	const params = new URLSearchParams();
	params.append("grant_type", 'authorization_code');
	params.append("client_id", process.env.COGNITO_CLIENT_ID);
	params.append("redirect_uri", process.env.COGNITO_CALLBACK_URL);
	params.append("code", code);

	const tokenRes = await fetch(process.env.COGNITO_DOMAIN + 'oauth2/token', {
		method: 'POST',
		headers:
		{
			Authorization: 'Basic ' + new Buffer(process.env.COGNITO_CLIENT_ID+":"+process.env.COGNITO_CLIENT_SECRET).toString('base64'),
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: params
	})

	const tokenResBody = await tokenRes.json();

	if (tokenResBody.error) {
		res.redirect(signinUrl);
		console.error(tokenResBody.error);
		return;
	}

	const idPayload = jwt.verify(tokenResBody.id_token);
	const accessPayload = jwt.verify(tokenResBody.access_token);

	//If this is the first time the user is logging in, create a keystone.js user
	let user = await User.model.findOne({ email: idPayload.email });
	
	if (!user) {
		user = await User.model.create({
			name: { first: idPayload.name }, 
			email: idPayload.email, 
			cognitoUsername: idPayload.sub,
		});
	}

	//Store the access token in cookie
	res.cookie('accessToken', tokenResBody.access_token, {
		expires: new Date(accessPayload.exp*1000),
		httpOnly: true,
		//secure: true,
	});

	res.redirect('/submission');

};
