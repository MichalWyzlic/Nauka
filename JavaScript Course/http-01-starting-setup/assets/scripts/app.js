const fetchButton = document.querySelector('#available-posts button');
const form = document.querySelector('#new-post form');

const listElement = document.querySelector('.posts');
const templateListItem = document.getElementById('single-post');

fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', event => {
	event.preventDefault();
	const newTitle = event.currentTarget.querySelector('#title');
	const newBody = event.currentTarget.querySelector('#content');

	createPost(newTitle.value, newBody.value);
});

function sendHttpRequest(method, url, data){
	const promise = new Promise((resolve, reject) =>{
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.responseType = 'json';

		xhr.addEventListener('load', function(){
			resolve(xhr.response);			
		});

		xhr.send(JSON.stringify(data));
	});
	return promise;
};


function fetchPosts(){
	sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts').then(
		responseData => { 
			const listOfPosts = responseData;
			console.log(listOfPosts);
			listElement.innerHTML = '';
			for(const post of listOfPosts){
				const listItem = document.importNode(templateListItem.content, true);
				listItem.querySelector('h2').textContent = post.title;
				listItem.querySelector('p').textContent = post.body;
				listElement.append(listItem);

			}

	});


}

function createPost(title, content){
	const userId = Math.random();
	const post = {
		title: title,
		body: content,
		userId: userId
	};
	sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post).then(
		(responseData) => {
			console.log(responseData);
		}
	);
}


// createPost('DUMMY', 'A dummy post!');

//'GET', 'https://jsonplaceholder.typicode.com/posts'
// const listElement = document.querySelector('.posts');
// const templateListItem = document.getElementById('single-post');


// listOfPosts.forEach(value => { 
// 	itemH2.innerHTML = value.title;
// 	itemP.innerHTML = value.body;
// 	listElement.append(listItem);


// });
