const ctx = document.getElementById('canvas').getContext('2d');

const Sprite = require('./sprite');
const Animation = require('./animation');

const mapConfig = require('../maps/1.json');

const sidewalk1 = mapConfig.walking.horizontal[0];
const sidewalk2 = mapConfig.walking.horizontal[1];

const spritesheet = new Sprite('sprites/luigi.png', 256, 256);
const character = new Animation(ctx, spritesheet, 6, 0, 7, 128, 128, sidewalk2, 'Luigi');

/* const spritesheet = new Sprite('sprites/spriteNE.png', 88, 144);
const character = new Animation(ctx, spritesheet, 6, 0, 7, 44, 72, sidewalk2, 'Fernando', true); */

const spritesheet2 = new Sprite('sprites/luigi.png', 256, 256);
const character2 = new Animation(ctx, spritesheet2, 6, 0, 7, 128, 128, sidewalk1, 'Mario');

const spritesheet3 = new Sprite('sprites/luigi.png', 256, 256);
const character3 = new Animation(ctx, spritesheet3, 6, 0, 7, 128, 128, sidewalk1, 'Patrick Hernandez');

const go = {
	a: false,
	b: false,
};

function update() {
	if (!character.done || !character2.done || !character3.done) {
		requestAnimationFrame(update);
	}

	character.move();

	if (go.a) {
		character2.move();
	}

	if (go.b) {
		character3.move();
	}
}

update();

setTimeout(() => {
	go.a = true;
}, 3000);

setTimeout(() => {
	go.b = true;
}, 6000);

document.getElementById('canvas').addEventListener('click', () => {
	console.log({ x: character2.x, y: character2.y });
});
