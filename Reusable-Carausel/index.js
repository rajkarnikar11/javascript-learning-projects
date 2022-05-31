const carouselContainer = document.querySelector(".carousel__container");
const carouselContainer2 = document.querySelector(".carousel__container2");
let buttonCounter = 0;
let dots = [];
let sliderCount = 0;
class Carousel {
	constructor(el, imgSrc) {
		this.createCarousel(el, imgSrc);

		// let max = imgSrc.length;
		this.max = imgSrc.length;
	}

	createCarousel(el, imgSrc) {
		const track = document.createElement("ul");
		track.classList.add("carousel__track");
		el.appendChild(track);

		for (let i = 0; i < imgSrc.length; i++) {
			const imageContainer = document.createElement("li");
			imageContainer.classList.add(".carousel__image-container");

			const photo = document.createElement("img");
			photo.classList.add("carousel__image");
			photo.src = imgSrc[i];

			imageContainer.appendChild(photo);
			track.appendChild(imageContainer);
			this.track = track;
		}
		const dotsContanier = document.createElement("ul");
		dotsContanier.classList.add("carousel__dots-container");
		el.appendChild(dotsContanier);

		for (let j = 0; j < imgSrc.length; j++) {
			dots[j] = document.createElement("li");
			if (j == 0) {
				dots[j].classList.add(
					"carousel__dots",
					"carousel__dots--active",
				);
			} else {
				dots[j].classList.add("carousel__dots");
			}

			dotsContanier.appendChild(dots[j]);
			console.log(j);
		}

		//next button
		const nextButton = document.createElement("button");
		nextButton.classList.add("carousel__next");
		nextButton.addEventListener("click", () => this.next());
		el.appendChild(nextButton);

		//prevbutton
		const prevButton = document.createElement("button");
		prevButton.addEventListener("click", () => this.prev());
		prevButton.classList.add("carousel__prev");
		el.appendChild(prevButton);

		//dot navigation

		for (let j = 0; j < imgSrc.length; j++) {
			dots[j].addEventListener("click", function (e) {
				const currentDot = document.querySelector(
					".carousel__dots--active",
				);
				console.log(e.target);

				currentDot.classList.remove("carousel__dots--active");
				// dots[j].classList.add("carousel__dots--active");
				let targetDot = e.target;
				targetDot.classList.add("carousel__dots--active");
				track.style.transform = `translateX(-${j * 100}%)`;
				sliderCount = j;
			});
		}
	}
	next() {
		if (sliderCount < this.max - 1) {
			// console.log("next");
			// console.log(this.max);
			sliderCount++;
			// console.log(sliderCount);
			this.track.style.transform = `translateX(-${sliderCount * 100}%)`;
			console.log(this.track);
		} else {
			this.track.style.transform = `translateX(0%)`;
			sliderCount = 0;
		}
	}

	prev() {
		if (sliderCount != 0) {
			// console.log("next");
			// console.log(this.max);
			sliderCount--;
			// console.log(sliderCount);
			this.track.style.transform = `translateX(-${sliderCount * 100}%)`;
			console.log(sliderCount);
		} else {
			this.track.style.transform = `translateX(-${
				(this.max - 1) * 100
			}%)`;
			sliderCount = this.max - 1;
			console.log(sliderCount);
		}
	}
}

const imgSrc = [
	"./assets/slide4.jpg",
	"./assets/slide2.jpg",
	"./assets/slide3.jpg",
	"./assets/slide1.jpg",
];

new Carousel(carouselContainer, imgSrc);
new Carousel(carouselContainer2, imgSrc);
