import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import toons from '../_reducers/toons';

// The Global state
const rootReducer = combineReducers({
  toons,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
