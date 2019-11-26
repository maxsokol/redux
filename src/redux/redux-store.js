import {combineReducers, createStore} from "redux";
import categoriesReducer from './categories-reducer.js';
import feedsReducer from './feeds-reducer.js';

let reducers = combineReducers({    
    categoriesReducer,
    feedsReducer,
}); 

let store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); 


export default store;