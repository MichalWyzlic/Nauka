const startGameBtn = document.getElementById("start-game-btn");

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "Player won!";
const RESULT_COMP_WINS = "Computer won!";

let gameIsRunning = false;

const getPlayerChoice = () => {
	const selection = prompt(
		`${ROCK}, ${PAPER} or ${SCISSORS}?`,
		""
	).toUpperCase();
	gameIsRunning = true;
	if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
		alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you!`);
		return;
	}
	return selection;
};

const getComputerChoice = () => {
	const result = Math.random();
	if (result <= 0.33) {
		return ROCK;
	} else if (result >= 0.66) {
		return SCISSORS;
	} else {
		return PAPER;
	}
};

const getWinner = (cChoice, pChoice = DEFAULT_USER_CHOICE) => {
	if (cChoice === pChoice) {
		return RESULT_DRAW;
	} else if (
		(cChoice === ROCK && pChoice === SCISSORS) ||
		(cChoice === PAPER && pChoice === ROCK) ||
		(cChoice === SCISSORS && pChoice === PAPER)
	) {
		return RESULT_COMP_WINS;
	} else {
		return RESULT_PLAYER_WINS;
	}
};

startGameBtn.addEventListener("click", () => {
	if (gameIsRunning) {
		return;
	}
	console.log("Game is starting...");
	const playerChoice = getPlayerChoice();
	console.log(playerChoice);
	const computerChoice = getComputerChoice();
	const winner = getWinner(computerChoice, playerChoice);
	let message;
	if (playerChoice === undefined) {
		message = `You picked ${DEFAULT_USER_CHOICE}, computer picked ${computerChoice},`;
	} else {
		message = `You picked ${playerChoice}, computer picked ${computerChoice},`;
	}

	if (winner === RESULT_DRAW) {
		message += " therefore there is a draw.";
	} else if (winner === RESULT_PLAYER_WINS) {
		message += " therefore you won.";
	} else {
		message += " therefore you lost.";
	}
	alert(message);
	gameIsRunning = false;
});

// not part of the game

const combine = (resultHandler, operation, ...numbers) => {
	const validateNumber = (number) => {
		return isNaN(number) ? 0 : number;
	};

	let sum = 0;
	for (let num of numbers) {
		if (operation === "ADD"){
			sum += validateNumber(num);
		} else{
			sum -= validateNumber(num);
		}
	}
	resultHandler(sum);
};

const subtractUp = (resultHandler, ...numbers) => {
	let sum = 0;
	for (let num of numbers){
		sum -= isNaN(num) ? 0 : num;
	};
	resultHandler(sum);
};

const showResult = (messageText = "The result is:", result) => {
	alert( messageText+ " " + result)
};


combine(showResult.bind(this, "The result after adding all numbers is:"), "ADD", 1, 5, "sfasdf", -3, 6, 10);
combine(showResult.bind(this, "The result after adding all numbers is:"), "ADD", 100, 5, 10, -3, 15, 20);

combine(showResult.bind(this, "The result after subtracting all numbers is:"), "SUB", 1, 10, "sfasdf", 15, 20);