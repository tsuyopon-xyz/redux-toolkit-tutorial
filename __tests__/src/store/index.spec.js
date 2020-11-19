import { actions, createStore } from '../../../src/store';

describe('Test for redux store', () => {
  function isEmptyTodos(todos) {
    expect(todos).toStrictEqual([]);
  }

  it('is empty state initially.', () => {
    const store = createStore();
    isEmptyTodos(store.getState().todos);
  });

  it('adds todo when dispatching create action.', () => {
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

  it('gets all todos when dispatching getAll action.', () => {
    const store = createStore();
    isEmptyTodos(store.getState().todos);

    const sizeOfCreatingTodos = 5;
    Array.from({ length: sizeOfCreatingTodos }, (_, index) => {
      const suffixForText = index + 1;
      const payload = { text: `hello${suffixForText}` };
      const action = actions.todoActions.createTodo(payload);
      store.dispatch(action);
    });

    const actionForGetAll = actions.todoActions.getAllTodos();
    store.dispatch(actionForGetAll);

    const newTodos = store.getState().todos;

    expect(newTodos.length).toEqual(sizeOfCreatingTodos);
    newTodos.forEach((todo, index) => {
      const suffixForText = index + 1;
      expect(todo.text).toEqual(`hello${suffixForText}`);
    });
  });

  xit('他のreducerの同期処理のテストは省略する', () => {
    // 省略
  });
});
