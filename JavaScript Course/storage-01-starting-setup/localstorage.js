const storeBtn = document.getElementById("store-btn");
const retrBtn = document.getElementById("retrieve-btn");

const userId = "u123";
const user = {
	name: "Max",
	age: 30,
	hobbies: ["Sports", "Cooking"],
};

storeBtn.addEventListener("click", () => {
	localStorage.setItem("uid", userId);
	localStorage.setItem("user", JSON.stringify(user));
});

retrBtn.addEventListener("click", () => {
	const extractedID = localStorage.getItem("uid");
	const extractedUser = JSON.parse(localStorage.getItem("user"));
	if (extractedUser) {
		console.log("Got the user.");
		console.log(extractedUser);
	} else {
		console.log("Could not find the USER.");
	}
	if (extractedID) {
		console.log("Got the ID - " + extractedID);
	} else {
		console.log("Could not find ID.");
	}
});
