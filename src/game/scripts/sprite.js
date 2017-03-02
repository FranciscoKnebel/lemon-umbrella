module.exports = function Sprite(path, frameWidth, frameHeight) {
	this.image = new Image();
	this.frameWidth = frameWidth;
	this.frameHeight = frameHeight;

	this.image.onload = () => {
		this.framesPerRow = Math.floor(this.image.width / this.frameWidth);
	};

	this.image.src = path;
};
