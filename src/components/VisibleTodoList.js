import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';
import { getVisibleTodos } from '../reducers/';

const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state, params.filter),
});

// const mapDispatchToProps = dispatch => ({
//   onTodoClick: (id) => {
//     dispatch(toggleTodo(id));
//   },
// });

const VisibleTodoList = withRouter(
  (mapStateToProps, {
    onTodoClick: toggleTodo,
  })(TodoList),
);

export default VisibleTodoList;
