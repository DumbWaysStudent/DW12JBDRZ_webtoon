import {
  GET_EPS_PENDING,
  GET_EPS_FULFILLED,
  GET_EPS_REJECTED,
} from '../config/constants';

export const fetchData = bool => {
  return {
    type: GET_EPS_PENDING,
    payload: bool,
  };
};

export const fetchDataFulfilled = data => {
  return {
    type: GET_EPS_FULFILLED,
    payload: data,
    isLoading: false,
  };
};

export const fetchDataRejected = error => {
  return {
    type: GET_EPS_REJECTED,
    payload: error,
    isLoading: false,
  };
};
