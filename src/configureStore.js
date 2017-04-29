import { throttle } from 'lodash';
import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import todoApp from './reducers';
import App from './components/App';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(todoApp, persistedState, devToolsEnhancer());

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
