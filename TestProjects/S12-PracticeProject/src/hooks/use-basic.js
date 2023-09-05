import {useReducer} from "react";

const initialInputState = {
	value: '',
	isTouched: false
};

function inputStateReducer(state, action) {
	if(action.type === 'CHANGE'){
		return {
			value: action.value,
			isTouched: state.isTouched
		}
	}
	if(action.type === 'TOUCH'){
		return {
			value: state.value,
			isTouched: true
		}
	}
	if(action.type === 'RESET'){
		return {
			value: '',
			isTouched: false
		}
	}
	return initialInputState;
};

function useBasic(validatorFunction){
	const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);
		
	let isValid = false;
	if(inputState.value){
		isValid = validatorFunction(inputState.value);
	};
	const hasError = inputState.isTouched && !isValid;

	function valueChangedHandler(event){
		dispatch({type: 'CHANGE', value: event.target.value});	
	}

	function valueTouchedHandler(){
		dispatch({type: 'TOUCH'});
	}

	function reset(){
		dispatch({type: 'RESET'});		
	}

	return {
		value: inputState.value,
		isValid,
		hasError,
		valueChangedHandler,
		valueTouchedHandler,
		reset
	};
};

export default useBasic;