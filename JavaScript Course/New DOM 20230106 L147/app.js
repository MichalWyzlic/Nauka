const ul = document.body.firstElementChild.nextElementSibling;
const firstLi = ul.firstElementChild;

console.log(firstLi);

const section = document.querySelector('section');
const button = section.nextElementSibling;


button.addEventListener('click', () => {
	section.classList.toggle('visible');
	section.classList.toggle('invisible');
})