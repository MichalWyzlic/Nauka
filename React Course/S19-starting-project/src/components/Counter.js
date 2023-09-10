import { useSelector, useDispatch } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {

	const counter = useSelector((state) => {return state.counter});
	const visible = useSelector((state) => state.visible)
	const dispatch = useDispatch();

	function incrementHandler(){
		dispatch({type: 'increment'});
	}
	
	function changeIncrementHandler(increment){
		dispatch({type: 'changeIncrement', value: increment});
	}

	function decrementHandler(){
		dispatch({type: 'decrement'});
	} 


	function toggleCounterHandler(){
		dispatch({type: 'toggleVisibility'});
	};

	return (
		<main className={classes.counter}>
			{visible && <h1>Redux Counter</h1> }
			{visible && <div className={classes.value}>{counter}</div>}
			<div>
			<button onClick={incrementHandler}>Increment</button>
			<button onClick={changeIncrementHandler.bind(null, 5)}>Increase by 5</button>
			<button onClick={decrementHandler}>Decrement</button>
			</div>
			<button onClick={toggleCounterHandler}>Toggle Counter</button>
		</main>
	);
};

export default Counter;
