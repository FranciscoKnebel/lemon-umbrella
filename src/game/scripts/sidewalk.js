/* eslint no-param-reassign: 0 */

const clone = require('./cloneObject');

module.exports = (config, reverse) => {
	if (reverse) {
		config = {
			startingPoint: config.endingPoint,
			endingPoint: config.startingPoint,
			ratio: { x: -config.ratio.x, y: -config.ratio.y },
		};
	}

	const newConfig = clone(config);

	newConfig.crossings = newConfig.crossings.map((elem) => {
		elem.passed = false;
		return elem;
	});

	return newConfig;
};
