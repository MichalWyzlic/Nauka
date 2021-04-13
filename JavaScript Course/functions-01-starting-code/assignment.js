const sayHello1 = (greeting, name = "Tom") => {
	console.log(greeting+ " " + name);
};

sayHello1("Czesc", "Michal");

sayHello1("Czesc");

const sayHello2 = () => {
	console.log("Hi Misza.");
};

sayHello2("Czesc", "Michal");

const sayHello3 = name => "Zdrastwuj " + name + ".";

console.log(sayHello3("Misza"));

const checkInput = (callBack, ...strings) => {
	let text = "";
	for(let string of strings){
		if (!string || string === ""){
			return;
		}
		text += string + " ";
	}
	callBack(text);
};

function callAlert(text){
	alert("This is a result of the callBack function." + text);
}

checkInput(callAlert,"Czesc", "Michal", " spadaj na ", "drzewo.");
