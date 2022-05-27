const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
let score = 0;
class SnakePart {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}
myAudio = new Audio("bg.mp3");
if (typeof myAudio.loop == "boolean") {
	myAudio.loop = true;
} else {
	myAudio.addEventListener(
		"ended",
		function () {
			this.currentTime = 0;
			this.play();
		},
		false,
	);
}
// myAudio.play();
const gulpSound = new Audio("gulp.wav");
const overSound = new Audio("gameover.wav");
let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

//game loop
function drawGame() {
	changeSnakePosition();
	let result = isGameover();
	if (result) {
		return;
	}
	clearScreen();
	checkAppleCollison();
	drawAppple();
	drawSnake();
	drawscore();
	if (score > 2) {
		speed = 11;
	}
	if (score > 5) {
		speed = 15;
	}
	if (score > 10) {
		speed = 17;
	}
	if (score > 15) {
		speed = 20;
	}
	if (score > 20) {
		speed = 22;
	}
	if (score > 25) {
		speed = 13;
	}
	if (score > 30) {
		speed = 25;
	}
	setTimeout(drawGame, 1000 / speed);
	myAudio.play();
}
function isGameover() {
	let gameOver = false;
	if (yVelocity === 0 && xVelocity === 0) {
		return false;
	}

	//walls
	if (headX < 0) {
		gameOver = true;
	} else if (headX >= tileCount) {
		gameOver = true;
	} else if (headY < 0) {
		gameOver = true;
	} else if (headY >= tileCount) {
		gameOver = true;
	}

	//checking fr body collision
	for (let i = 0; i < snakeParts.length; i++) {
		let part = snakeParts[i];
		if (part.x === headX && part.y === headY) {
			gameOver = true;
			break;
		}
	}
	if (gameOver) {
		ctx.fillStyle = "white";
		ctx.font = "50px VT323";
		ctx.fillText("GAME OVER!!!", canvas.width / 4.6, canvas.height / 2);
		overSound.play();
		myAudio.pause();
	}
	return gameOver;
}
function drawscore() {
	ctx.fillStyle = "white";
	ctx.font = "15px VT323";
	ctx.fillText("SCORE   " + score, canvas.width - 70, 20);
}
function clearScreen() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawSnake() {
	ctx.fillStyle = "green";
	for (let i = 0; i < snakeParts.length; i++) {
		let part = snakeParts[i];
		ctx.fillRect(
			part.x * tileCount,
			part.y * tileCount,
			tileSize,
			tileSize,
		);
	}
	snakeParts.push(new SnakePart(headX, headY));
	while (snakeParts.length > tailLength) {
		snakeParts.shift();
	}
	ctx.fillStyle = "orangered";
	ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}
function changeSnakePosition() {
	headX = headX + xVelocity;
	headY = headY + yVelocity;
}

function drawAppple() {
	ctx.fillStyle = "red";
	ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollison() {
	if (appleX === headX && appleY === headY) {
		appleX = Math.floor(Math.random() * tileCount);
		appleY = Math.floor(Math.random() * tileCount);
		tailLength++;
		score++;
		gulpSound.play();
	}
}

document.body.addEventListener("keydown", keyDown);
function keyDown(event) {
	//up
	if (event.keyCode == 38) {
		if (yVelocity == 1) return;
		yVelocity = -1;
		xVelocity = 0;
	}

	//down
	if (event.keyCode == 40) {
		if (yVelocity == -1) return;

		yVelocity = 1;
		xVelocity = 0;
	}

	//left
	if (event.keyCode == 37) {
		if (xVelocity == 1) return;

		yVelocity = 0;
		xVelocity = -1;
	}

	// right
	if (event.keyCode == 39) {
		if (xVelocity == -1) return;

		yVelocity = 0;
		xVelocity = 1;
	}
}
drawGame();
