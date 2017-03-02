const ctx = document.getElementById('canvas').getContext('2d');

const Sprite = require('./sprite');
const Animation = require('./animation');

const spritesheet = new Sprite('sprites/luigi.png', 256, 256);
const walk = new Animation(ctx, spritesheet, 6, 0, 7);

const spritesheet2 = new Sprite('sprites/luigi.png', 256, 256);
const walk2 = new Animation(ctx, spritesheet2, 6, 0, 7);

const spritesheet3 = new Sprite('sprites/luigi.png', 256, 256);
const walk3 = new Animation(ctx, spritesheet3, 6, 0, 7);

let x = 0;
let	y = 0;
let	j = 0;
let	k = 0;
let	b = 0;
let	n = 0;

const done = {
	x: false,
	j: false,
	b: false,
};

function update() {
	if (!done.x || !done.j || !done.b) {
		requestAnimationFrame(update);
	}

	if (x > 728) {
		x -= 1 * 0.5;
		y += 1 * 0.29;
	} else {
		done.x = true;
	}

	if (j > 728) {
		j -= 1 * 0.5;
		k += 1 * 0.29;
	} else {
		done.j = true;
	}

	if (b > 728) {
		b -= 1 * 0.5;
		n += 1 * 0.29;
	} else {
		done.b = true;
	}

	if (!done.x) {
		ctx.clearRect(x, y, 128, 128);
		walk.update();
		walk.draw(x, y);
	} else {
		ctx.clearRect(x, y, 128, 128);
	}

	if (!done.j) {
		ctx.clearRect(j, k, 128, 128);
		walk2.update();
		walk2.draw(j, k);
	} else {
		ctx.clearRect(j, k, 128, 128);
	}

	if (!done.b) {
		ctx.clearRect(b, n, 128, 128);
		walk3.update();
		walk3.draw(b, n);
	} else {
		ctx.clearRect(b, n, 128, 128);
	}
}

x = 1660;
y = 385;

j = 1378;
k = 548;

b = 1187;
n = 660;
update();
