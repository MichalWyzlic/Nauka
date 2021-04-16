let addMovieModal = document.getElementById("add-modal");
let startMovieButton = document.querySelector("header button");
let backdrop = document.getElementById("backdrop");
let cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
let confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
let entryTextSection = document.getElementById("entry-text");

const deleteMovieModal = document.getElementById("delete-modal");
const deleteMovieButtonNo = deleteMovieModal.querySelector("button");
const deleteMovieButtonYes = deleteMovieButtonNo.nextElementSibling;

let userInputs = addMovieModal.querySelectorAll("input");

let movies = [];


let toggleBackdrop = function () {
	backdrop.classList.toggle("visible");
};

const closeMovieModal = function (){
	addMovieModal.classList.remove("visible");
}

let showMovieModal = function () {
	addMovieModal.classList.add("visible");
	toggleBackdrop();
};

let backdropClickHandler = function (){
	closeMovieModal();
	closeDeleteMovieModal();
};

let clearMovieInputs = function () {
	for(let userInput of userInputs){
		userInput.value = "";
	};
};

let cancelAddMovieHandler = function () {
	clearMovieInputs();
	closeMovieModal();
};

let confirmAddMovieHandler = function () {
	let titleValue = userInputs[0].value;
	let imageUrlValue = userInputs[1].value;
	let ratingValue	= userInputs[2].value;

	if (titleValue.trim() === "" ||
		imageUrlValue.trim() === ""  ||
		ratingValue === "" ||
		parseInt(ratingValue) < 1 || parseInt(ratingValue) >5
		){
		alert("Values not valid");
		return;
	}

	let newMovie = {
		id: Math.random().toString(),
		title: titleValue,
		image: imageUrlValue,
		rating: ratingValue
	};

	movies.push(newMovie);
	console.log(movies);
	renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
	clearMovieInputs();
	closeMovieModal();
	toggleBackdrop();
	updateUI();
};


const updateUI = () => {
	if(movies.length === 0){
		entryTextSection.style.display = "block";
	} else {
		entryTextSection.style.display = "none";
	}
};

const deleteMovie = function (movieId){
	let movieIndex = 0;
	for(const movie of movies){
		if (movie.id === movieId){
			break; 
		}
		movieIndex ++;
	};

	movies.splice(movieIndex, 1);
	const listRoot = document.getElementById("movie-list");
	listRoot.children[movieIndex].remove();
};


const closeDeleteMovieModal = () => {
	deleteMovieModal.classList.remove("visible");
	toggleBackdrop();
}


const deleteMovieHandler = (movieId) => {

	deleteMovieModal.classList.add("visible");
	toggleBackdrop();

	deleteMovieButtonNo.addEventListener("click", closeDeleteMovieModal);
	deleteMovieButtonYes.addEventListener("click", deleteMovieHandler.bind(null, movieId));

};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
	const newMovieElement = document.createElement("li");
	newMovieElement.className = "movie-element";
	newMovieElement.innerHTML = `
		<div class="movie-element__image">
			<img src="${imageUrl}" alt="${title}">
		</div>
		<div class="movie-element__info">
			<h2>${title}</h2>
			<p>${rating}/5 stars</p>
		</div>
	`;

	newMovieElement.addEventListener("click", deleteMovie.bind(null, id));
	const listRoot = document.getElementById("movie-list");
	listRoot.append(newMovieElement);
}

startMovieButton.addEventListener("click",  showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);

//Modal actions click handlers
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", confirmAddMovieHandler);

