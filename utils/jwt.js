const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const jwks = JSON.parse(process.env.COGNITO_JWKS).keys;

module.exports = {
	/**
	 * Verifies and decodes a JWT token using the RS256 algorithm.
	 * 
	 * Throws an error if the token is not verified or if the JWK is not found.
	 * 
	 * @param {String} token 
	 * @returns {Object} JWT Payload
	 */
	verify(token) {
		const { header } = jwt.decode(token, {complete: true});
		const jwk = jwks.find(jwk => jwk.kid === header.kid);
		if (!jwk) {
			throw new Error('jwk kid not found.');
		}
		const pem = jwkToPem(jwk);
		return jwt.verify(token, pem, {
			algorithms: ['RS256'],
		});
	},
}
