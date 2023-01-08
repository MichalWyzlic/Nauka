const h1 =  document.getElementById('main-title');

const changeTitle = () => {
	h1.textContent = 'Content after a click';
	h1.style.color = 'white';
	h1.style.backgroundColor = 'black';
}

const li = document.querySelector('li:last-of-type');

const changeLi = () => {
	li.textContent = li.textContent + ' (Changed!)';
	li.style.color = 'white';
	li.style.backgroundColor = 'red';
}

document.addEventListener('click', changeTitle);
document.addEventListener('keyup', changeLi);
// const listItemElements = document.querySelectorAll('li');

const listItemElements = document.getElementsByTagName('li');

for (const listItemEl of listItemElements){
	console.dir(listItemEl);
}