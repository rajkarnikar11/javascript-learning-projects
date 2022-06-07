const body = document.querySelector(".quotes__container");
const button = document.querySelector(".quotes__button");
const paginationContainer = document.querySelector(".pagination__container");
let i = 0;

page = 1;
let dataToFetch = 100;
quotesPerPage = 10;

function navigate(e, page) {
	if (e.target.classList.contains("pagination__button")) {
		const paginationButton = Array.from(paginationContainer.children);
		for (let b = 0; b < paginationButton.length; b++) {
			paginationButton[b].classList.remove("pagination__button--active");
			if (page - 1 === b) {
				paginationButton[b].classList.add("pagination__button--active");
			}
		}
	}

	fetchQuote(page);
}
function displayQuote(quotes, page, i) {
	if (
		i > quotesPerPage * (page - 1) &&
		i <= quotesPerPage * (page - 1) + quotesPerPage
	) {
		const card = document.createElement("div");
		const quote = document.createElement("p");
		quote.innerText = quotes.text;
		quote.classList.add("card__description");
		card.appendChild(quote);

		const author = document.createElement("p");
		author.innerText = `~ ${quotes.author}`;
		author.classList.add("card__author");
		card.appendChild(author);
		body.appendChild(card);
		card.classList.add("card__container");
	}
}
function fetchQuote(page) {
	const loader = document.createElement("div");
	const loaderContainer = document.createElement("div");
	loader.classList.add("quotes__loader");
	loaderContainer.classList.add("quotes__loader-container");

	body.appendChild(loaderContainer);
	loaderContainer.appendChild(loader);
	fetch("https://type.fit/api/quotes")
		.then((res) => res.json())
		.then((data) => {
			loader.style.display = "none";
			wait = false;

			body.innerHTML = "";

			paginationContainer.style.display = "flex";

			data.forEach((quotes) => {
				i++;
				if (i <= dataToFetch) {
					displayQuote(quotes, page, i);
				}
			});
			i = 0;
		})
		.catch((error) => {
			console.log(error, "failed to fetch from api");
		});
}

paginationContainer.addEventListener(
	"click",
	function (e, page = parseInt(e.target.textContent)) {
		navigate(e, page);
	},
);
for (let j = 0; j < Math.ceil(dataToFetch / quotesPerPage); j++) {
	let pageNumber = j + 1;
	paginationButton = document.createElement("button");
	paginationButton.textContent = pageNumber;
	paginationButton.classList.add("pagination__button");
	if (j == 0) {
		paginationButton.classList.add("pagination__button--active");
	}
	paginationContainer.appendChild(paginationButton);
}
button.addEventListener("click", function (e, page = 1) {
	button.style.display = "none";
	navigate(e, page);
});
