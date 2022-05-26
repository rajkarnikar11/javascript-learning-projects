let x = 0;

const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const currentDot = dotsNav.querySelector(".carousel__indicator--current-slide");
const dots = Array.from(dotsNav.children);
let targetDot = dots[0];
const slideWidth = slides[0].getBoundingClientRect().width;

slides.forEach((slide, index) => {
	slide.style.left = slideWidth * index + "px";
});
setInterval(function () {
	document.querySelector(".carousel__button--right").click();
	console.log("swiped");
}, 4000);
nextButton.addEventListener("click", function () {
	const currentDot = dotsNav.querySelector(
		".carousel__indicator--current-slide",
	);

	// const currentSlide = track.querySelector(".current-slide");
	// const nextSlide = currentSlide.nextElementSibling;
	// const amountToMove = nextSlide.style.left;
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

	console.log(x);
	console.log(slides.length);

	// currentSlide.classList.remove("current-slide");
	// nextSlide.classList.add("current-slide");
});
prevButton.addEventListener("click", function () {
	// const currentSlide = track.querySelector(".current-slide");
	// const nextSlide = currentSlide.nextElementSibling;
	// const amountToMove = nextSlide.style.left;
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
	console.log(x);
	console.log(slides.length);
	// currentSlide.classList.remove("current-slide");
	// nextSlide.classList.add("current-slide");
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
