import {combineReducers, createStore} from "redux";
import categoriesReducer from './categories-reducer.js';
import feedsReducer from './feeds-reducer.js';
import usersReducer from './user-reducer';

let reducers = combineReducers({    
    categoriesReducer,
    feedsReducer,
    usersReducer,
}); 

let store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
); 

export default store;