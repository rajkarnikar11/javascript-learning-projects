let x = 0;

const track = document.querySelector(".carousel__track");
const body = document.querySelector(".carousel");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const currentDot = dotsNav.querySelector(".carousel__indicator--current-slide");
const dots = Array.from(dotsNav.children);
let targetDot = dots[0];
const slideWidth = slides[0].getBoundingClientRect().width;
let a = 0;
let myInterval;

// body.addEventListener("click", function () {
// 	clearInterval(myInterval);
// });
body.addEventListener("mouseenter", function () {
	clearInterval(myInterval);
});

body.addEventListener("mouseleave", function () {
	myInterval = setInterval(function () {
		document.querySelector(".carousel__button--right").click();
	}, 4000);
});

slides.forEach((slide, index) => {
	slide.style.left = slideWidth * index + "px";
});
myInterval = setInterval(function () {
	document.querySelector(".carousel__button--right").click();
}, 4000);

nextButton.addEventListener("click", function () {
	const currentDot = dotsNav.querySelector(
		".carousel__indicator--current-slide",
	);

	currentDot.classList.remove("carousel__indicator--current-slide");

	if (x < (slides.length - 1) * 100) {
		x = x + 100;
		track.style.transform = "translateX(-" + x + "%)";
	} else {
		track.style.transform = "translateX(0px)";
		x = 0;
	}
	targetDot.classList.remove("carousel__indicator--current-slide");

	targetDot = dots[x / 100];
	targetDot.classList.add("carousel__indicator--current-slide");
});
prevButton.addEventListener("click", function () {
	const currentDot = dotsNav.querySelector(
		".carousel__indicator--current-slide",
	);

	currentDot.classList.remove("carousel__indicator--current-slide");

	if (x != 0) {
		x = x - 100;
		track.style.transform = "translateX(-" + x + "%)";
	} else {
		track.style.transform =
			"translateX(-" + (slides.length - 1) * 100 + "%)";
		x = (slides.length - 1) * 100;
	}
	targetDot.classList.remove("carousel__indicator--current-slide");

	targetDot = dots[x / 100];
	targetDot.classList.add("carousel__indicator--current-slide");
});
dotsNav.addEventListener("click", function (e) {
	const targetDot = e.target.closest("button");
	const currentDot = dotsNav.querySelector(
		".carousel__indicator--current-slide",
	);

	if (!targetDot) return;
	const targetIndex = dots.findIndex((dot) => dot === targetDot);
	track.style.transform = "translateX(-" + targetIndex * 100 + "%)";
	x = targetIndex * 100;
	currentDot.classList.remove("carousel__indicator--current-slide");

	targetDot.classList.add("carousel__indicator--current-slide");
});
