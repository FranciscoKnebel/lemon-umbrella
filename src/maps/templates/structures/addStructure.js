const { Shape, Point, Path } = require('isomer');

const globals = require('../../globals');

module.exports = class addStructures {
	constructor(canvas) {
		this.canvas = canvas;
		this.globals = globals;

		const map = {
			x: this.globals.mapSize.x,
			y: this.globals.mapSize.y,
			z: this.globals.mapSize.z,
		};

		// foundation base layer
		this.canvas.add(Shape.Prism(Point.ORIGIN, map.x, map.y, map.z));
	}

	// Shapes
	rectangle(x, y, offsetX, offsetY, level, color) {
		this.canvas.add(
			new Path([
				Point(x, y, level),
				Point(x + offsetX, y, level),
				Point(x + offsetX, y + offsetY, level),
				Point(x, y + offsetY, level),
			]), color
		);
	}

	prism(x, y, z, offsetX, offsetY, level, color) {
		this.canvas.add(Shape.Prism(Point(x, y, z), offsetX, offsetY, level), color);
	}

	// Recolour
	ground(color) {
		const off = {
			x: this.globals.mapSize.x,
			y: this.globals.mapSize.y,
			z: this.globals.mapSize.z,
		};

		this.canvas.add(this.rectangle(0, 0, off.x, off.y, off.z, color));
	}

	// Structures
	sidewalk(x, y, level, offsetX, offsetY, color) {
		this.prism(x, y, level, offsetX, offsetY, 0, color);
	}

	road(x, y, offsetX, offsetY, color) {
		this.rectangle(x, y, offsetX, offsetY, globals.mapSize.z, color);
	}

	roadSeparator(x, y, level, color) {
		const off = {
			x: globals.roadSeparator.x,
			y: globals.roadSeparator.y,
		};

		this.rectangle(x, y, off.x, off.y, level, color);
	}

	rotatedRoadSeparator(x, y, level, color) {
		const off = {
			x: globals.roadSeparator.x,
			y: globals.roadSeparator.y,
		};

		this.rectangle(x, y, off.y, off.x, level, color);
	}

	crosswalk(x, y, level, color) {
		this.rectangle(x, y, globals.crosswalk.x, globals.crosswalk.y, level, color);
	}

	rotatedCrosswalk(x, y, level, color) {
		this.rectangle(x, y, globals.crosswalk.y, globals.crosswalk.x, level, color);
	}
};
