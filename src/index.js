import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import todoApp from './reducers';
import App from './components/App';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(todoApp, persistedState, devToolsEnhancer());

store.subscribe(
  throttle(() => {
    saveState({
      todos: store.getState().todos,
    });
  }, 1000),
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
