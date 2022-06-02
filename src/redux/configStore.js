import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import termsList from './modules/termsList';

const middlewares = [thunk];
const rootReducer = combineReducers({termsList})
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;