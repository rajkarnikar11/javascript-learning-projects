let x = 0;
let myInterval;
const track = document.querySelector(".carousel__track");
const body = document.querySelector(".carousel");

const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const currentDot = dotsNav.querySelector(".carousel__indicator--current-slide");

//carousel class//
class Carousel {
	constructor(image) {
		const slides = Array.from(track.children);
		this.image = image;

		const li = document.createElement("li");
		li.classList.add("carousel__slide");
		const photo = document.createElement("img");
		photo.src = this.image;
		photo.classList.add("carousel__slide-image");
		li.appendChild(photo);
		track.appendChild(li);
		if (slides.length > 0) {
			const slideWidth = slides[0].getBoundingClientRect().width;
			//setting slide horizontally
			slides.forEach((slide, index) => {
				slide.style.left = slideWidth * index + "px";
			});
		}
	}
}

//input images //
const slider1 = new Carousel("./assets/slide1.jpg");
const slider2 = new Carousel("./assets/slide2.jpg");
const slider3 = new Carousel("./assets/slide3.jpg");
const slider4 = new Carousel("./assets/slide4.jpg");
const slides = Array.from(track.children);
//looping for navigation dots//

for (let j = 0; j < slides.length; j++) {
	const dot = document.createElement("button");
	if (j == 0) {
		dot.classList.add(
			"carousel__indicator",
			"carousel__indicator--current-slide",
		);
	} else {
		dot.classList.add("carousel__indicator");
	}
	dotsNav.appendChild(dot);
}
const dots = Array.from(dotsNav.children);

let targetDot = dots[0];

//for pausing while hovering
body.addEventListener("mouseenter", function () {
	clearInterval(myInterval);
});

//for playing back after mouseleave
body.addEventListener("mouseleave", function () {
	myInterval = setInterval(function () {
		document.querySelector(".carousel__button--right").click();
	}, 4000);
});

myInterval = setInterval(function () {
	document.querySelector(".carousel__button--right").click();
}, 4000);

nextButton.addEventListener("click", function () {
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
		x = x - 100 / slides.length;
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
	track.style.transform =
		"translateX(-" + (targetIndex / slides.length) * 100 + "%)";
	x = targetIndex * 100;
	currentDot.classList.remove("carousel__indicator--current-slide");

	targetDot.classList.add("carousel__indicator--current-slide");
});
