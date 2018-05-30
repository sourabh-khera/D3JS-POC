import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools as compose } from 'redux-devtools-extension/developmentOnly';
import { reducers } from '../reducers';
import { middleware } from '../middlewares';

const store = createStore(
  reducers,
  compose(applyMiddleware(...middlewares)),
);

export default store;
