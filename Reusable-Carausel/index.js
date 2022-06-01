const carouselContainer = document.querySelector(".carousel__container");
const carouselContainer2 = document.querySelector(".carousel__container2");

class Carousel {
	constructor(el, imgSrc) {
		this.el = el;
		this.sliderCount = 0;
		this.max = imgSrc.length;
		let dots = [];
		this.dots = dots;
		this.createCarousel(el, imgSrc, dots);
	}

	createCarousel(el, imgSrc, dots) {
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
		dotsContanier.className = "carousel__dots-container";
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
			dots[j].addEventListener("click", (e) => {
				this.dotnav(e, j);
			});
		}
	}

	dotnav(e, j) {
		const currentDot = this.el.querySelector(".carousel__dots--active");

		currentDot.classList.remove("carousel__dots--active");
		let targetDot = e.target;
		targetDot.classList.add("carousel__dots--active");
		this.track.style.transform = `translateX(-${j * 100}%)`;
		this.sliderCount = j;
	}

	next() {
		if (this.sliderCount < this.max - 1) {
			this.sliderCount++;
			this.track.style.transform = `translateX(-${
				this.sliderCount * 100
			}%)`;
		} else {
			this.track.style.transform = `translateX(0%)`;
			this.sliderCount = 0;
		}
		const currentDot = this.el.querySelector(".carousel__dots--active");
		// console.log(currentDot);

		currentDot.classList.remove("carousel__dots--active");
		console.log(this.sliderCount);
		let targetDot = this.dots[this.sliderCount];

		targetDot.classList.add("carousel__dots--active");
		console.log(targetDot);
	}

	prev() {
		if (this.sliderCount != 0) {
			this.sliderCount--;
			this.track.style.transform = `translateX(-${
				this.sliderCount * 100
			}%)`;
			console.log(this.sliderCount);
		} else {
			this.track.style.transform = `translateX(-${
				(this.max - 1) * 100
			}%)`;
			this.sliderCount = this.max - 1;
			console.log(this.sliderCount);
		}
		const currentDot = this.el.querySelector(".carousel__dots--active");

		currentDot.classList.remove("carousel__dots--active");
		let targetDot = this.dots[this.sliderCount];

		targetDot.classList.add("carousel__dots--active");
		console.log(targetDot);
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
