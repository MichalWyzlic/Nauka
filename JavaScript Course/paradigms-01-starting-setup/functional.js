const REQUIRED = 'REQUIRED';
const MIN_LENGTH = 'MIN_LENGTH';

function validate(value, flag, validatorValue) {
	if (flag === REQUIRED) {
		return value.trim().length > 0;
	}
	if (flag === MIN_LENGTH) {
		return value.trim().length >= validatorValue;
	}
}

function getUserInput(inputElementId) {
	return document.getElementById(inputElementId).value;
}

function createUser(uName, uPassword) {
	if (!validate(uName, REQUIRED) || !validate(uPassword, MIN_LENGTH, 6)) {
		throw new Error(
			'Invalid input - username or password is wrong (password should be at least 6 characters)'
		);
	}
	return { userName: uName, password: uPassword };
}

function greetUser(user){
	console.log('Hi, I am ', user.userName);
}

function signupHandler(event) {
	event.preventDefault();
	const userNameInput = getUserInput('username');
	const passwordInput = getUserInput('password');
	try{
		const newUser = createUser(userNameInput, passwordInput);
		greetUser(newUser);
	} catch (err){
		alert(err.message);
	}

}

function connectForm(formId, formSubmitHandler) {
	const form = document.getElementById(formId);
	form.addEventListener('submit', formSubmitHandler);
}

connectForm('user-input', signupHandler);
