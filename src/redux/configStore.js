import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import termsList from './modules/termsList';
import modal from './modules/modal';

const middlewares = [thunk];
const rootReducer = combineReducers({termsList, modal})
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;