const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
let x = 0;

const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

slides.forEach((slide, index) => {
	slide.style.left = slideWidth * index + "px";
});

nextButton.addEventListener("click", function () {
	// const currentSlide = track.querySelector(".current-slide");
	// const nextSlide = currentSlide.nextElementSibling;
	// const amountToMove = nextSlide.style.left;

	if (x < (slides.length - 1) * 100) {
		x = x + 100;
		track.style.transform = "translateX(-" + x + "%)";
	} else {
		track.style.transform = "translateX(0px)";
		x = 0;
	}
	console.log(x);
	console.log(slides.length);

	// currentSlide.classList.remove("current-slide");
	// nextSlide.classList.add("current-slide");
});
prevButton.addEventListener("click", function () {
	// const currentSlide = track.querySelector(".current-slide");
	// const nextSlide = currentSlide.nextElementSibling;
	// const amountToMove = nextSlide.style.left;

	if (x != 0) {
		x = x - 100;
		track.style.transform = "translateX(-" + x + "%)";
	} else {
		track.style.transform =
			"translateX(-" + (slides.length - 1) * 100 + "%)";
		x = 300;
	}
	console.log(x);
	console.log(slides.length);
	// currentSlide.classList.remove("current-slide");
	// nextSlide.classList.add("current-slide");
});
