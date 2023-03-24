console.log(document.cookie);

const storeBtn = document.getElementById("store-btn");
const retrBtn = document.getElementById("retrieve-btn");

const userId = "u123";
const user = {
	name: "Max",
	age: 30,
	hobbies: ["Sports", "Cooking"],
};

storeBtn.addEventListener("click", () => {
	document.cookie = `uid=${userId}; max-age=360`;
	document.cookie = `user=${JSON.stringify(user)}`;
});

retrBtn.addEventListener("click", () => {
	const data = document.cookie.split(";").map((item) => {
		return item.trim();
	});
	console.log(data);
	console.log(JSON.parse(data[1].split("=")[1]));
});
