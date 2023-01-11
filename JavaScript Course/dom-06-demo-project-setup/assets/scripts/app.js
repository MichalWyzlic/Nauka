const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');

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

startAddMovieButton.addEventListener('click', toggleMovieModal);
cancelAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', backdropClickHandler);