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
	// const promise = new Promise((resolve, reject) =>{
	// 	// const xhr = new XMLHttpRequest();
	// 	// xhr.open(method, url);
	// 	// xhr.responseType = 'json';

	// 	// xhr.addEventListener('load', function(){
	// 	// 	if( xhr.status >= 200 && xhr.status < 300){
	// 	// 		resolve(xhr.response);			
	// 	// 	} else {
	// 	// 		reject(new Error('Something went wrong!'));
	// 	// 	}
	// 	// });

	// 	// xhr.addEventListener('error', function (){
	// 	// 	reject(new Error('Failed to send the request.'))
	// 	// });

	// 	// xhr.send(JSON.stringify(data));

	// });
	return fetch(url, {
		method: method,
		// body: JSON.stringify(data),
		body: data,
		// headers: {
		// 	'Content-Type': 'application/json'
		// }
	}).then(response => {
		if(response.status >= 200 && response.status < 300){
			return response.json();
		} else {
			return response.json().then( errData => {
				console.log(errData);
				throw new Error('Something went wrong server side.');
			});
		};

	}).catch(error =>{
		console.log(error);
		throw new Error('Something went wrong - inner catch!');
	});
};


function fetchPosts(){
	axios.get('https://jsonplaceholder.typicode.com/posts').then(
		response => { 
			const listOfPosts = response.data;
			console.log(listOfPosts);
			listElement.innerHTML = '';
			for(const post of listOfPosts){
				const listItem = document.importNode(templateListItem.content, true);
				listItem.querySelector('h2').textContent = post.title;
				listItem.querySelector('p').textContent = post.body;
				listItem.querySelector('li').id = post.id;
				listElement.append(listItem);

			}

	}).catch(error => {
		alert(error.message);
		console.log(error.response);
	});


}

function createPost(title, content){
	const userId = Math.random();
	const post = {
		title: title,
		body: content,
		userId: userId
	};

	const fd = new FormData(form);
	// fd.append('title', title);
	// fd.append('body', content);
	fd.append('userId', userId);

	axios.post('https://jsonplaceholder.typicode.com/posts', fd).then(
		(responseData) => {
			console.log(responseData);
		}
	);
}

listElement.addEventListener('click', event =>{
	if (event.target.tagName === 'BUTTON'){
		const postId = event.target.parentElement.id;
		axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(
			() => {
				event.target.parentElement.remove();
		});

	};
});

// createPost('DUMMY', 'A dummy post!');

//'GET', 'https://jsonplaceholder.typicode.com/posts'
// const listElement = document.querySelector('.posts');
// const templateListItem = document.getElementById('single-post');


// listOfPosts.forEach(value => { 
// 	itemH2.innerHTML = value.title;
// 	itemP.innerHTML = value.body;
// 	listElement.append(listItem);


// });
