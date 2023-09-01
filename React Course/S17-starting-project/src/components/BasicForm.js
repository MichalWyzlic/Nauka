import useBasic from '../hooks/use-basic';

const BasicForm = (props) => {
	const {
		value: enteredName,
		isValid: nameIsValid,
		hasError: nameHasError,
		valueChangedHandler: nameChangedHandler,
		valueTouchedHandler: nameTouchedHandler,
		reset: resetName
	} = useBasic((value) => value.trim() !== '');

	const {
		value: enteredSurname,
		isValid: surnameIsValid,
		hasError: surnameHasError,
		valueChangedHandler: surnameChangedHandler,
		valueTouchedHandler: surnameTouchedHandler,
		reset: resetSurname
	} = useBasic((value) => value.trim() !== '');

	const {
		value: enteredEmail,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangedHandler: emailChangedHandler,
		valueTouchedHandler: emailTouchedHandler,
		reset: resetEmail
	} = useBasic((value) =>
		value
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
	);

	function formSubmitHandler(event) {
		event.preventDefault();

		if(!(nameIsValid && surnameIsValid && emailIsValid)){
			return
		}

		console.log(enteredName);
		console.log(enteredSurname);
		console.log(enteredEmail);

		resetName();
		resetSurname();
		resetEmail();
	}

	return (
		<form onSubmit={formSubmitHandler}>
			<div className='control-group'>
				<div
					className={
						'form-control' + (nameHasError ? ' invalid' : '')
					}
				>
					<label htmlFor='name'>First Name</label>
					<input
						type='text'
						id='name'
						onChange={nameChangedHandler}
						onBlur={nameTouchedHandler}
						value={enteredName}
					/>
					{nameHasError && (
						<p className='error-text'>Name must not be empty!</p>
					)}
				</div>
				<div
					className={
						'form-control' + (surnameHasError ? ' invalid' : '')
					}
				>
					<label htmlFor='surname'>Last Name</label>
					<input
						type='text'
						id='surname'
						onChange={surnameChangedHandler}
						onBlur={surnameTouchedHandler}
						value={enteredSurname}
					/>
					{surnameHasError && (
						<p className='error-text'>Surname must not be empty!</p>
					)}
				</div>
			</div>
			<div className={'form-control' + (emailHasError ? ' invalid' : '')}>
				<label htmlFor='email'>E-Mail Address</label>
				<input
					type='email'
					id='email'
					onChange={emailChangedHandler}
					onBlur={emailTouchedHandler}
					value={enteredEmail}
				/>
				{emailHasError && (
					<p className='error-text'>
						Please enter a valid e-mail address!
					</p>
				)}
			</div>
			<div className='form-actions'>
				<button
					type='submit'
					disabled={!(nameIsValid && surnameIsValid && emailIsValid)}
				>
					Submit
				</button>
			</div>
		</form>
	);
};

export default BasicForm;
