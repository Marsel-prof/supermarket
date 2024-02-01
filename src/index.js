import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import App from './App';
//--------------------redux--------------------
import {Provider} from "react-redux";
import store from "./redux/store.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // eslint-disable-next-line no-undef
    <Provider store={store}>
    <App />
    </Provider>
);

