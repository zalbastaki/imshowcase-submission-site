module.exports = process.env.COGNITO_DOMAIN + 'logout?client_id=' + process.env.COGNITO_CLIENT_ID + '&logout_uri=' + process.env.COGNITO_SIGNOUT_URL;
