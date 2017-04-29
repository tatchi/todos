import { throttle } from 'lodash';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import todoApp from './reducers';
import App from './components/App';
import { loadState, saveState } from './localStorage';

const addLoggingToDispatch = store => {
  const rawDispatch = store.dispatch;
  if (!console.group) {
    return rawDispatch;
  }

  return action => {
    console.group(action.type);
    console.log('%c prev state', 'color: gray', store.getState());
    console.log('%c action', 'color: blue', action);
    const returnValue = rawDispatch(action);
    console.log('%c next state', 'color: green', store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(todoApp, persistedState, devToolsEnhancer());

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.subscribe(
    throttle(() => {
      saveState({
        todos: store.getState().todos,
      });
    }, 1000), //throttle ensure that we write at the localStorage only each 1 second (to not write to often)
  );

  return store;
};

export default configureStore;
