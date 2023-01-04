const startGameBtn = document.getElementById("start-game-btn");

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = 'Draw';
const RESULT_PLAYER_WINS = 'Player wins';
const RESULT_COMPUTER_WINS = 'Computer wins';


let gameIsRunning = false;

const getPlayerChoice = () => {
	const selection = prompt(`${ROCK}, ${PAPER} or ${SCISSORS}`, '').toUpperCase();
	if(
		selection != ROCK
		&& selection != PAPER
		&& selection != SCISSORS
	) {
		alert(`The choice is invalid! We chose ${DEFAULT_USER_CHOICE} for you.`);
		return DEFAULT_USER_CHOICE;
	}
	return selection;
}

const getComputerChoice = () => {
	const randomVlaue = Math.random();
	if (randomVlaue <= 0.33){
		return ROCK;
	} else if (randomVlaue <= 0.67) {
		return PAPER;
	} else {
		return SCISSORS;
	}
}

const getWinner = (cChoice, pChoice) => {
	if (pChoice === cChoice){
		return RESULT_DRAW;
	} else if (
		(pChoice === ROCK && cChoice === SCISSORS)
		|| (pChoice === SCISSORS && cChoice === PAPER)
		|| (pChoice === PAPER && cChoice === ROCK)		
	) {
		return RESULT_PLAYER_WINS
	} 
	return RESULT_COMPUTER_WINS;
}

startGameBtn.addEventListener('click', () => {
	if(gameIsRunning){
		return;
	}
	gameIsRunning = true;
	console.log('Game is starting');
	const playerChoice = getPlayerChoice();
	const computerChoice = getComputerChoice();
	const winner = getWinner(computerChoice, playerChoice);
	let message = `You chose ${playerChoice}, the computer chose ${computerChoice}, therefore `;
	if (winner === RESULT_PLAYER_WINS){
		message += `you win.`;
	} else if (winner === RESULT_COMPUTER_WINS){
		message += `the computer wins.`;
	} else {
		message += `there is a draw.`;
	}

	alert(message);
	gameIsRunning = false;
});


//not a game code

const supUp = (a, b, c, d) => {
	
}