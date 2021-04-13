let ul = document.body.firstElementChild.nextElementSibling;
let firstLi = ul.firstElementChild;

console.log(firstLi);

let section = document.querySelector("section");

//section.style.backgroundColor = "blue";
//section.className = "";

let button = document.querySelector("button");

button.addEventListener("click", function (){
	section.classList.toggle("blue-bg");
	section.classList.toggle("red-bg");
});
