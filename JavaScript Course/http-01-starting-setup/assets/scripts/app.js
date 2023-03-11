const xhr = new XMLHttpRequest();

const listElement = document.querySelector('.posts');
const templateListItem = document.getElementById('single-post');

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.responseType = 'json';

xhr.addEventListener('load', function(){
	const listOfPosts = xhr.response;
	console.log(listOfPosts);
	for(const post of listOfPosts){
		const listItem = document.importNode(templateListItem.content, true);
		listItem.querySelector('h2').textContent = post.title;
		listItem.querySelector('p').textContent = post.body;
		listElement.append(listItem);

	}
});

xhr.send();

// const listElement = document.querySelector('.posts');
// const templateListItem = document.getElementById('single-post');


// listOfPosts.forEach(value => { 
// 	itemH2.innerHTML = value.title;
// 	itemP.innerHTML = value.body;
// 	listElement.append(listItem);


// });
