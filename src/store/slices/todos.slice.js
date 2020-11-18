import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [];

const counterSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getAllTodos: (state) => state,
    getTodo: (state, { payload: { id } }) => {
      const targetTodo = state.find((todo) => todo.id === id);
      if (!targetTodo) {
        throw new Error(`The todo is not found by : ${id}`);
      }

      return targetTodo;
    },
    createTodo: (state, { payload: { text } }) => {
      const newTodo = {
        id: uuidv4(),
        text,
      };

      return [...state, newTodo];
    },
    updateTodo: (state, { payload: { id, text } }) => {
      const targetTodo = state.find((todo) => todo.id === id);
      if (!targetTodo) {
        throw new Error(`The todo is not found by : ${id}`);
      }

      targetTodo.text = text;

      return targetTodo;
    },
    deleteTodo: (state, { payload: { id } }) => {
      const targetIndex = state.findIndex((todo) => todo.id === id);
      if (targetIndex === -1) {
        throw new Error(`The todo is not found by : ${id}`);
      }

      state.splice(targetIndex, 1);

      return state;
    },
  },
});

export const { actions, reducer } = counterSlice;
