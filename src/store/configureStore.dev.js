import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from '../promiseMiddleware';
import callAPIMiddleware from '../callAPIMiddleware';

/**
 * Entirely optional, this tiny library adds some functionality to
 * your DevTools, by logging actions/state to your console. Used in
 * conjunction with your standard DevTools monitor gives you great
 * flexibility!
 */
const logger = createLogger({
  predicate: (/* getState, action */) => true, // log all actions
  level: 'info',
  duration: true,
  actionTransformer: (action) => {
    return {
      ...action,
      type: String(action.type || action.types)
    };
  }
});

const finalCreateStore = compose(
  // Middleware you want to use in development:
  applyMiddleware(logger, thunk, promiseMiddleware,
    callAPIMiddleware
  ),

  // Setup dev tools - start
  // vanilla Redux DevTools
  // DevTools.instrument();

  // zalmoxisus Redux DevTools Extension
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  // Setup dev tools - end
)(createStore);

module.exports = function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }

  return store;
};
