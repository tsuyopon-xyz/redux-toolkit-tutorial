import { actions, createStore } from '../../../src/store';

describe('Test for redux store', () => {
  function isEmptyTodos(todos) {
    expect(todos).toStrictEqual([]);
  }

  it('is empty state initially.', () => {
    const store = createStore();
    isEmptyTodos(store.getState().todos);
  });

  it('add todo when call create action.', () => {
    const store = createStore();
    isEmptyTodos(store.getState().todos);

    const payload = { text: 'hello123' };
    const action = actions.todoActions.createTodo(payload);
    store.dispatch(action);

    const newTodos = store.getState().todos;

    expect(newTodos).toEqual([
      {
        id: newTodos[0].id,
        text: payload.text,
      },
    ]);
  });
});
