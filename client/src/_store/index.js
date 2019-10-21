import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import toons from '../_reducers/toons';
import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/toons';
import {API} from '../config/api';

export const getAllToons = user_id => {
  return dispatch => {
    dispatch(fetchData(true));
    API.get(`/user/${user_id}/all_webtoons`)
      .then(res => {
        dispatch(fetchDataFulfilled(res.data));
      })
      .catch(error => {
        dispatch(fetchDataRejected(error));
      });
  };
};

// The Global state
const rootReducer = combineReducers({
  toons,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
