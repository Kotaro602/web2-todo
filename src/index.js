import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './containers/c-app';

window.Perf = require('react-addons-perf');

const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
     <MuiThemeProvider>
        <App />
     </MuiThemeProvider>
  </Provider>,
  document.getElementById('content')
);