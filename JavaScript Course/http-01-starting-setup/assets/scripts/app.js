const listElement = document.querySelector('.posts');
const templateListItem = document.getElementById('single-post');

function sendHTTPRequest(method, url){
	const promise = new Promise((resolve, reject) =>{
			const xhr = new XMLHttpRequest();
		xhr.open(method, url);
		xhr.responseType = 'json';

		xhr.addEventListener('load', function(){
			resolve(xhr.response);
			
		});
		xhr.send();
	});

	return promise;	
};

function fetchPosts(){
	sendHTTPRequest('GET', 'https://jsonplaceholder.typicode.com/posts').then(
		responseData => {
			const listOfPosts = responseData// xhr.response;
			console.log(listOfPosts);
			for(const post of listOfPosts){
				const listItem = document.importNode(templateListItem.content, true);
				listItem.querySelector('h2').textContent = post.title;
				listItem.querySelector('p').textContent = post.body;
				listElement.append(listItem);

			};
	});

};

fetchPosts();

// 
// const listElement = document.querySelector('.posts');
// const templateListItem = document.getElementById('single-post');


// listOfPosts.forEach(value => { 
// 	itemH2.innerHTML = value.title;
// 	itemP.innerHTML = value.body;
// 	listElement.append(listItem);


// });
