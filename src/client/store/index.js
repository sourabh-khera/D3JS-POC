import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools as compose } from 'redux-devtools-extension/developmentOnly';
import reducers from '../reducer';
import middleware from '../middleware';

const store = createStore(
  reducers,
  compose(applyMiddleware(...middleware)),
);

export default store;
