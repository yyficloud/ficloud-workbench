import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import promiseMiddleware from '../promiseMiddleware';
import callAPIMiddleware from '../callAPIMiddleware';

const finalCreateStore = compose(
  applyMiddleware(thunk, promiseMiddleware,
    callAPIMiddleware
  )
)(createStore);

module.exports = function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
};
