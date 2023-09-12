import { createSlice, configureStore } from '@reduxjs/toolkit';

const initCounterState = { counter: 0, increment: 1, visible: true };

const counterSlice = createSlice({
	name: 'counter',
	initialState: initCounterState,
	reducers: {
		increment(state) {
			state.counter += state.increment;
		},
		decrement(state) {
			state.counter -= state.increment;
		},
		increase(state, action) {
			state.increment = action.payload.value;
		},
		toggleCounter(state) {
			state.visible = !state.visible;
		}
	}

});

export default counterSlice;
export const counterActions = counterSlice.actions;