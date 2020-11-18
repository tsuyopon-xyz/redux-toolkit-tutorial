import { createSlice } from '@reduxjs/toolkit';

let nextId = 1;
const initialState = [];

function createTodo({ text }) {
  return {
    id: nextId++,
    text,
  };
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    getAllTodos: (state) => state,
    getTodo: (state, { id }) => {
      const targetTodo = state.find((todo) => todo.id === id);
      if (!targetTodo) {
        throw new Error(`The todo is not found by : ${id}`);
      }

      return targetTodo;
    },
    createTodo: (state, { text }) => [...state, createTodo({ text })],
    updateTodo: (state, { id, text }) => {
      const targetTodo = state.find((todo) => todo.id === id);
      if (!targetTodo) {
        throw new Error(`The todo is not found by : ${id}`);
      }

      targetTodo.text = text;

      return targetTodo;
    },
    deleteTodo: (state, { id }) => {
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
