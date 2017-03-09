/* eslint max-len: 0 */

const reachedCrossing = require('./reachedCrossing');
const instantiateSidewalk = require('./sidewalk');

module.exports = function Animation(ctx, sprite, frameSpeed, startFrame, endFrame, width, length, sidewalkConfig, name, reversed) {
	const animationSequence = [];  	// array holding the order of the animation
	let currentFrame = 0;        		// the current frame to draw
	let counter = 0;             		// keep track of frame rate

	if (reversed === true) {
		this.x = sidewalkConfig.endingPoint.x;
		this.y = sidewalkConfig.endingPoint.y;

		this.sidewalkConfig = instantiateSidewalk(sidewalkConfig, true);
	} else {
		this.x = sidewalkConfig.startingPoint.x;
		this.y = sidewalkConfig.startingPoint.y;
		this.sidewalkConfig = instantiateSidewalk(sidewalkConfig);
	}

	this.name = name;
	this.done = false;
	this.alive = true;

	for (let frameNumber = startFrame; frameNumber <= endFrame; frameNumber += 1) {
		animationSequence.push(frameNumber);
	}

	this.update = () => {
		if (counter === (frameSpeed - 1)) {
			currentFrame = (currentFrame + 1) % animationSequence.length;
		}

		counter = (counter + 1) % frameSpeed;
	};

	this.draw = (x, y) => {
		const row = Math.floor(animationSequence[currentFrame] / sprite.framesPerRow);
		const col = Math.floor(animationSequence[currentFrame] % sprite.framesPerRow);

		ctx.drawImage(
      sprite.image,
      col * sprite.frameWidth,
			row * sprite.frameHeight,
      sprite.frameWidth,
			sprite.frameHeight,
      x, y,
      width,
			length
		);
	};

	this.animate = (x, y) => {
		if (!this.done) {
			ctx.clearRect(x, y, width, length);

			this.update();
			this.draw(x, y);
		} else if (this.alive) {
			this.alive = false;

			ctx.clearRect(x, y, width, length);
		}
	};

	this.move = () => {
		if (this.x > this.sidewalkConfig.endingPoint.x || (this.x < this.sidewalkConfig.endingPoint.x && reversed)) {
			this.x += this.sidewalkConfig.ratio.x;
			this.y += this.sidewalkConfig.ratio.y;
		} else {
			this.done = true;
		}

		for (const crossing of this.sidewalkConfig.crossings) {
			if (!crossing.passed) {
				if (reachedCrossing(this.x, this.y, crossing)) {
					crossing.passed = true;
					console.log(`${this.name} has just passed a crossing.`);
				}
			}
		}

		this.animate(this.x, this.y);

		return this.done;
	};
};
