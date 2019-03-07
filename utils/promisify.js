/**
 * Takes a function that takes a callback as the last argument and
 * wraps it in a function that returns a promise.
 * 
 * @param {Function} fn 
 * @returns {Function} promisified function
 * @example
 * fn(arg0, arg1, (err, result) => {
 *    ...
 * }));
 * 
 * const result = await promisify(fn)(arg0, arg1)
 */
function promisify(fn) {
	return function (...args0) {
		return new Promise((resolve, reject) => {
			fn(...args0, (err, args1) => {
				if (err) {
					reject(err);
				} else {
					resolve(args1);
				}
			});
		});
	};
}

module.exports = promisify;
