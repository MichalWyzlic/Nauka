const modal = document.getElementById('add-modal');
const header = document.querySelector('header');
const addMovieButton = header.querySelector('button');

addMovieButton.addEventListener('click', () => {
	modal.className='.modal.visible'
})
