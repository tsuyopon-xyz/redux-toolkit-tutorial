import { actions, createStore } from '../../../src/store';

describe('Test for redux store', () => {
  function isEmptyTodos(todos) {
    expect(todos).toStrictEqual([]);
  }

  /********************************
   * 同期dispatchのテスト
   ********************************/
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

  /********************************
   * 非同期dispatchのテスト
   ********************************/
  it('creates a todo asynchronously when using asyncCreateTodo', async () => {
    const store = createStore();
    isEmptyTodos(store.getState().todos);

    const data = { text: 'async hello' };
    await store.dispatch(actions.todoActions.asyncCreateTodo(data));
    const newTodos = store.getState().todos;

    expect(newTodos.length).toEqual(1);
    expect(newTodos[0]).toEqual({
      id: newTodos[0].id,
      text: data.text,
    });
  });

  it('rejects asyncCreateTodo when text is not passed', async () => {
    const store = createStore();
    isEmptyTodos(store.getState().todos);

    const data = {};
    const action = await store.dispatch(
      actions.todoActions.asyncCreateTodo(data)
    );

    expect(action.type).toEqual('todos/asyncCreateTodo/rejected');
    expect(action.error.message).toEqual('Need "text" as a string.');
  });
});
