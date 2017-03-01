const { Shape, Point } = require('isomer');

module.exports = (addStructure, globals) => {
	const colors = globals.colors;

	addStructure.canvas.add(Shape.Prism(Point(4.25, 6.25, 1), 5, 2, 2), colors.red);

	addStructure.canvas.add(Shape.Prism(Point(0, 6.25, 1), 4.25, 2, 3), colors.blue);
};
