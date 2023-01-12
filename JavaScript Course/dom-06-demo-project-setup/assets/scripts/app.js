const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');

const movies = [];

const clearMovieInput = () => {
	for(const userInput of userInputs){
		userInput.value = '';
	};
}

const toggleMovieModal = () => {
	addMovieModal.classList.toggle('visible');
	toggleBackdrop();
};

const toggleBackdrop = () => {
		backdrop.classList.toggle('visible');
};

const backdropClickHandler = () => {
	toggleMovieModal();
};

const cancelAddMovieHandler = () => {
	clearMovieInput();
	toggleMovieModal();
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
		title: titleValue,
		image: imageUrlValue,
		rating: ratingValue
	};

	movies.push(newMovie);
	console.log(movies);
	clearMovieInput();
	toggleMovieModal();
};

startAddMovieButton.addEventListener('click', toggleMovieModal);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);
backdrop.addEventListener('click', backdropClickHandler);
confirmAddMovieButton.addEventListener('click', confirmAddMovieHandler)