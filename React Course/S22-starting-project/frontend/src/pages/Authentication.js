import {redirect, json} from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function AuthenticationPage() {
	return <AuthForm />;
}

export default AuthenticationPage;

export async function action({request}) {
	const searchParams = new URL(request.url).searchParams;
	const mode = searchParams.get('mode') || 'login';

	if(mode !== 'login' && mode !== 'signup'){
		throw json({message: 'Unsupported mode.'},{status: 422});
	}
	const data = await request.formData();
	//console.log(data);
	const authData = {
		email: data.get('email'),
		password: data.get('password')
	};

	const response = await fetch(`http://localhost:8080/${mode}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(authData)
	});

	//console.log(response);

	if(response.status === 422 || response.status === 401){
		return response;
	}

	if(!response.ok){
		throw json({message: 'Could not authenticate user.'}, {status: 500})
	}

	const resData = await response.json();
	//console.log(resData);
	const token = resData.token;
	const expiration = new Date();
	expiration.setTime(expiration.getTime() + 60000);
	//console.log(expiration.getTime());

	localStorage.setItem('token', token);
	localStorage.setItem('expiration', expiration.getTime());

	return redirect('/');
}
