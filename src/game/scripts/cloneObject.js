/* eslint no-restricted-syntax: 0 */
/* eslint guard-for-in: 0 */

module.exports = function clone(obj) {
	if (obj === null || typeof (obj) !== 'object') {
		return obj;
	}

	const temp = new obj.constructor();
	for (const key in obj) {
		temp[key] = clone(obj[key]);
	}

	return temp;
};
