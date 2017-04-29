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
    console.log(`%c prev state: ${store.getState()}`, 'color: gey');
    console.log(`action: ${action}`, 'color: blue');
    const returnValue = rawDispatch(action);
    console.log(`next state: ${store.getState()}`, 'color: green');
    console.groupEnd(action.type);
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
