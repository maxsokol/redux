import store from './redux/redux-store.js';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import Container from '@material-ui/core/Container';

let rerenderEntireTree = (state) => {    
    ReactDOM.render(
        <HashRouter hashType="slash">
          <Provider store={store}>
            <Container style={{ backgroundColor: '#fff', paddingBottom: '40px' }}>
                <App />
            </Container>
          </Provider>  
        </HashRouter>, document.getElementById('root'));
}

rerenderEntireTree();
