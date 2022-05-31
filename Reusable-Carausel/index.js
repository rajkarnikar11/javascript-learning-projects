const carouselContainer = document.querySelector(".carousel__container");

class Carousel {
	constructor(el, imgSrc) {
		this.createCarousel(el, imgSrc);
	}

	createCarousel(el, imgSrc) {
		for (let i = 0; i < imgSrc.length; i++) {
			const imageContainer = document.createElement("li");
			imageContainer.classList.add("carousel__image-container");
			const photo = document.createElement("img");
			photo.classList.add("carousel__image");
			photo.src = imgSrc[i];

			imageContainer.appendChild(photo);
			el.appendChild(imageContainer);
		}
	}
}

const imgSrc = [
	"./assets/slide1.jpg",
	"./assets/slide2.jpg",
	"./assets/slide3.jpg",
	"./assets/slide4.jpg",
];

new Carousel(carouselContainer, imgSrc);
