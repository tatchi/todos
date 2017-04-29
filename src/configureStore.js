import { throttle } from 'lodash';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger'
import { composeWithDevTools  } from 'redux-devtools-extension';
import todoApp from './reducers';
import App from './components/App';
import { loadState, saveState } from './localStorage';

// const logger = store => {
//   return next => {
//     if (!console.group) {
//       return next;
//     }

//     return action => {
//       console.group(action.type);
//       console.log('%c prev state', 'color: gray', store.getState());
//       console.log('%c action', 'color: blue', action);
//       const returnValue = next(action);
//       console.log('%c next state', 'color: green', store.getState());
//       console.groupEnd(action.type);
//       return returnValue;
//     };
//   };
// };

// const promise = store => {
//   return next => {
//     return action => {
//       if (typeof action.then === 'function') {
//         return action.then(next);
//       }
//       return next(action);
//     };
//   };
// };

// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//   middlewares.slice().reverse().forEach(middleware => (store.dispatch = middleware(store)(store.dispatch)));
// };

const configureStore = () => {
  //const persistedState = loadState();
  //const store = createStore(todoApp, persistedState, devToolsEnhancer());
  const middlewares = [promise];
  // const store = createStore(todoApp, devToolsEnhancer());

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  // store.subscribe(
  //   throttle(() => {
  //     saveState({
  //       todos: store.getState().todos,
  //     });
  //   }, 1000), //throttle ensure that we write at the localStorage only each 1 second (to not write to often)
  // );

  // wrapDispatchWithMiddlewares(store, middlewares);

  return createStore(todoApp, composeWithDevTools(applyMiddleware(...middlewares)));

};

export default configureStore;
