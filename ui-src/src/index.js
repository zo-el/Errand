import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import {Provider} from 'react-redux';
import CreateStore from './store'

const store = CreateStore()

window.addEventListener('load', () => {

  const root = <Provider store={store}>
    <App />
  </Provider>

  ReactDOM.render(
    root,
    document.getElementById('root')
  );

})
