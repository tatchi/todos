import { combineReducers } from 'redux';
import todos, * as fromTodos from './todos';


const todoApp = combineReducers({
  todos,
});

export default todoApp;

export const getVisibleTodos = (state, filter) => {
  return fromTodos.getVisibleTodos(state.todos, filter)
};

export const getIsFetching = (state, filter) => {
  return fromTodos.getIsFetching(state.todos, filter);
};

export const getErrorMessage = (state, filter) => {
  return fromTodos.getErrorMessage(state.todos, filter);
};

