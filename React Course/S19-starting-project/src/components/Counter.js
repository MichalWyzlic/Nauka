import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counter';

import classes from './Counter.module.css';

const Counter = () => {

	const counter = useSelector((state) => {return state.counter.counter});
	const visible = useSelector((state) => state.counter.visible)
	const dispatch = useDispatch();

	function incrementHandler(){
		dispatch(counterActions.increment());
	}
	
	function changeIncrementHandler(increment){
		dispatch(counterActions.increase({value: increment}));
	}

	function decrementHandler(){
		dispatch(counterActions.decrement());
	} 


	function toggleCounterHandler(){
		dispatch(counterActions.toggleCounter());
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
