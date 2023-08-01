import React, { useState } from 'react';
import AddUser from './components/AddUser/AddUser';
import ErrorModal from './components/ErrorModal/ErrorModal';
import UserList from './components/UserList/UserList';

function App() {
	const [isValidNewUser, setIsValidNewUser] = useState(true);
	const [errorMessage, setErrorMessage] = useState('Data is not valid.');
	const [userList, setUserList] = useState({});
	function hideModalHandler() {
		setIsValidNewUser(true);
	}

	function addNewUserHandler(newUser) {
		if(newUser.name.trim().length <= 0){
			setIsValidNewUser(false);
			setErrorMessage('The name is not valid');
			return;
		};
		if(newUser.age <= 0){
			setIsValidNewUser(false);
			setErrorMessage(`The age of: ${newUser.age} is not correct.`);
			return;
		};
		//console.log(newUser);
		let users = [];
		if(userList.length > 0){
			users = [...userList];
		}

		users.push(newUser);

		setUserList(users);
		console.log(userList);

	}

	//hidden={isValidNewUser}/>
	return (
		<div>
			<ErrorModal
				hidden={isValidNewUser}
				hideModal={hideModalHandler.bind(this)}
				errorMsg={errorMessage}
			/>
			<AddUser addUserFunction={addNewUserHandler.bind(this)} />
			<UserList users={userList}/>
		</div>
	);
}

export default App;
