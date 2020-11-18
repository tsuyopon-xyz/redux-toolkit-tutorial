import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { todoSlice } from './slices';

const rootReducer = combineReducers({
  todos: todoSlice.reducer,
});

export const actions = {
  todoActions: todoSlice.actions,
};

export const createStore = (initialState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
};
