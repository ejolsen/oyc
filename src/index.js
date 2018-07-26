import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import App from './App';
import store from './redux/store';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(

<Provider store={store}>
    <MuiThemeProvider>
        <App />
    </MuiThemeProvider>
</Provider>

, document.getElementById('root'));