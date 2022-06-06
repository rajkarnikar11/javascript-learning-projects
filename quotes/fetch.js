const body = document.querySelector(".quotes__container");
const button = document.querySelector(".quotes__button");
// const author = document.querySelector(".card__author");
function displayQuote() {
	const loader = document.createElement("div");
	loader.classList.add("quotes__loader");
	body.appendChild(loader);
	fetch("https://type.fit/api/quotes")
		.then((res) => res.json())
		.then((data) => {
			data.forEach((quotes) => {
				console.log(quotes.length);
				loader.style.display = "none";
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
			});
		});
}

document.addEventListener("click", displayQuote);
