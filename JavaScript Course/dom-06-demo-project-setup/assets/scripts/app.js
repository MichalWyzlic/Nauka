const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const noMoviesMessage = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');



const movies = [];





const updateUI = () => {
	if(movies.length > 0){
		noMoviesMessage.style.display = 'none';
	} else{
		noMoviesMessage.style.display = 'block';
	};
};

// const deleteMovie = (movieId) => {
// 	let i;
// 	for(i = 0; i < movies.length; i++){
// 		if(movies[i].id = id){
// 			break;
// 		};
// 	};
// 	movies.splice(i, 1);
// 	const movieList = document.getElementById('movie-list');
// 	movieList.children[i].remove();
// };

const closeDeleteMovieModal = () => {
	deleteMovieModal.classList.remove('visible');
}

const confirmMovieDeleteHandler = (movieId) =>{
	// let movieIndex;
	//const iD = movieId;
	for(let i = 0; i < movies.length; i++){
		if(movies[i].id === movieId){
			movies.splice(i, 1);
			const movieList = document.getElementById('movie-list');
			movieList.children[i].remove();
		};
	};

	
	deleteMovieModal.classList.remove('visible');
	backdrop.classList.remove('visible');
	updateUI();
};

const deleteMovieHandler = (movieId) => {		
	
	const cancelMovieDelete = deleteMovieModal.querySelector('.btn--passive');
	const confirmMovieDelete = cancelMovieDelete.nextElementSibling;

	// const cancelMovieDeleteHandler = () => {
	// 	toggleCancelMovieModal();
	// };
	
	

	deleteMovieModal.classList.add('visible');
	toggleBackdrop();

	cancelMovieDelete.addEventListener('click', () => {
		deleteMovieModal.classList.remove('visible');
		backdrop.classList.remove('visible');
	} );
	confirmMovieDelete.addEventListener('click', confirmMovieDeleteHandler.bind(null, movieId));

};

const renderNewMovieElement = (id, title, imageURL, rating) => {
	const newMovieElement = document.createElement('li');
	newMovieElement.className = 'movie-element';
	newMovieElement.innerHTML =`
	<div class="movie-element__image">
		<img src=${imageURL} alt="${title}">
	</div>
	<div class=movie-element__info">
		<h2>${title}</h2>
		<p>${rating}/5 stars</p>
	</div>
	`;
	const movieList = document.getElementById('movie-list');
	movieList.appendChild(newMovieElement);
	newMovieElement.addEventListener('click', deleteMovieHandler.bind(null, id));
};

const clearMovieInput = () => {
	for(const userInput of userInputs){
		userInput.value = '';
	};
};

const openMovieModal = () => {
	addMovieModal.classList.add('visible');
	toggleBackdrop();
};

const closeMovieModal = () => {
	addMovieModal.classList.remove('visible');
	toggleBackdrop();
}

const toggleBackdrop = () => {
		backdrop.classList.toggle('visible');
};

const backdropClickHandler = () => {
	closeMovieModal();
	closeDeleteMovieModal();
};

const cancelAddMovieHandler = () => {
	clearMovieInput();
	closeMovieModal();
};

const confirmAddMovieHandler = () => {


	const titleValue = userInputs[0].value;
	const imageUrlValue = userInputs[1].value;
	const ratingValue = userInputs[2].value;
	
	if(titleValue.trim() === ''
		|| imageUrlValue.trim() === ''
		|| ratingValue.trim() === ''
		|| ratingValue < 1
		|| +ratingValue > 5){
			alert('Please enter valid input.');
			return;

	}

	const newMovie = {
		id: Math.random().toString(),
		title: titleValue,
		image: imageUrlValue,
		rating: ratingValue
	};

	movies.push(newMovie);
	console.log(movies);
	clearMovieInput();
	closeMovieModal();
	updateUI();
	renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
};

startAddMovieButton.addEventListener('click', openMovieModal);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
backdrop.addEventListener('click', backdropClickHandler);
confirmAddMovieButton.addEventListener('click', confirmAddMovieHandler);

