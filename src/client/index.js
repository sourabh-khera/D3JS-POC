import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import DashBoard from './containers/dashBoard';

const app = document.getElementById('root');
render(
  <Provider store={store}>
    <DashBoard />
  </Provider>,
  app,
);
