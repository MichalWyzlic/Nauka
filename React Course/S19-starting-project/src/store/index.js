import { createStore } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

const initState = { counter: 0, increment: 1, visible: true };

createSlice({
	name: 'counter',
	initialState: initState,
	reducers: {
		increment(state) {
			state.counter ++;
		},
		decrement(state) {
			state.counter --;
		},
		increase(state, action) {
			state.increment = action.value;
		},
		toggleCounter(state) {
			state.visible = !state.visible;
		}
	}

})

function counterReducer(
	state = initState,
	action
) {
	if (action.type === 'increment') {
		return {
			...state,
			counter: state.counter + state.increment
		};
	}
	if (action.type === 'decrement') {
		return {
			...state,
			counter: state.counter - state.increment
		};
	}
	if (action.type === 'changeIncrement' && action.value) {
		return {
			...state,
			increment: action.value
		};
	}
	if (action.type === 'toggleVisibility') {
		return {
			...state,
			visible: !state.visible
		};
	}
	return state;
}

const store = createStore(counterReducer);

export default store;
