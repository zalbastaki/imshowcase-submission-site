module.exports = process.env.COGNITO_DOMAIN + 'signup?response_type=code&client_id=' + process.env.COGNITO_CLIENT_ID + '&redirect_uri=' + process.env.COGNITO_CALLBACK_URL;
