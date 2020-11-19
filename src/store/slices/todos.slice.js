import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { wait } from '../../utils/time';

const initialState = [];

function createTodo(text = '') {
  return {
    id: uuidv4(),
    text,
  };
}

const asyncCreateTodo = createAsyncThunk(
  'todos/asyncCreateTodo',
  async ({ text }, { dispatch }) => {
    console.log(text);
    await wait(1000);

    if (!text) {
      throw new Error('Need "text" as a string.');
    }

    return { todo: createTodo(text) };
  }
);

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
      const newTodo = createTodo(text);

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
  extraReducers: {
    [asyncCreateTodo.pending]: (_state, _action) => {
      // console.log('Pending asyncCreateTodo!');
    },
    [asyncCreateTodo.fulfilled]: (state, { payload: { todo } }) => {
      state.push(todo);
    },
    [asyncCreateTodo.rejected]: (_state, _action) => {
      console.log('Rejected asyncCreateTodo!');
      // console.log(_action, '@@@@@1');
    },
  },
});

export const { actions, reducer } = counterSlice;
export { asyncCreateTodo };
