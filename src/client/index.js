import { render } from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './app';

const app = document.getElementById('root');
render(<Provider store={store}><App /></Provider>, app);
