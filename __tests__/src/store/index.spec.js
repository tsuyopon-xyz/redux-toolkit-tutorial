import { actions, createStore } from '../../../src/store';

describe('Test for redux store', () => {
  function isEmptyTodos(todos) {
    expect(todos).toStrictEqual([]);
  }

  it('is empty state initially.', () => {
    const store = createStore();
    isEmptyTodos(store.getState().todos);
  });
});
