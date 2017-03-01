module.exports = (addStructure, globals) => {
	const floorLevel = globals.mapSize.z;
	const colors = globals.colors;

	// Asphalt
	const asphalt = colors.asphalt;
	addStructure.road(0, 2, 15, 3, asphalt);
	addStructure.road(10, 5, 3, 10, asphalt);

	// Sidewalk and Roadlines
	const roadSeparator = globals.roadSeparator;

	for (let i = 0; i < 15; i += 0.5) {
		if (i >= 10 && i <= 13) {
			if (i === 10 || i === 13) {
				for (let j = 5; j < 15; j += 0.5) {
					addStructure.sidewalk(i, j, floorLevel, 0.5, 0.5, colors.concrete);
				}

				// Add crosswalks
				for (let k = 3; k < 5; k += 0.5) {
					addStructure.rotatedCrosswalk(i, k, floorLevel, colors.white);
				}
			} else if (i === 11.5) {
				for (let j = 6.5; j < 15; j += 0.5) {
					const offsetI = 0.2 + i;
					addStructure.rectangle(
						offsetI,
						j,
						roadSeparator.x,
						roadSeparator.y,
						floorLevel,
						colors.yellow
					);
				}

				for (let k = 11; k < 13; k += 0.5) {
					addStructure.crosswalk(k, 5, floorLevel, colors.white);
				}
			}
		} else {
			addStructure.sidewalk(i, 5, floorLevel, 0.5, 0.5, colors.concrete);

			if (i !== 9.5 && i !== 13.5) {
				addStructure.rotatedRoadSeparator(0.2 + i, 3.75, floorLevel, colors.yellow);
			}
		}

		addStructure.sidewalk(i, 2, floorLevel, 0.5, 0.5, colors.concrete);
	}
};
