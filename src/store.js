import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

const middleware = [thunkMiddleware];
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export default () => createStore(
  rootReducer,
  applyMiddleware(...middleware)
);
