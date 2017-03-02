module.exports = function Animation(ctx, spritesheet, frameSpeed, startFrame, endFrame) {
	const animationSequence = [];  // array holding the order of the animation
	let currentFrame = 0;        // the current frame to draw
	let counter = 0;             // keep track of frame rate

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
		const row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
		const col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);

		ctx.drawImage(
        spritesheet.image,
        col * spritesheet.frameWidth,
				row * spritesheet.frameHeight,
        spritesheet.frameWidth,
				spritesheet.frameHeight,
        x, y,
        128,
				128);
	};
};
