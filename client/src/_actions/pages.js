import {
  GET_PAGES_PENDING,
  GET_PAGES_FULFILLED,
  GET_PAGES_REJECTED,
} from '../config/constants';

export const fetchData = bool => {
  return {
    type: GET_PAGES_PENDING,
    payload: bool,
  };
};

export const fetchDataFulfilled = data => {
  return {
    type: GET_PAGES_FULFILLED,
    payload: data,
    isLoading: false,
  };
};

export const fetchDataRejected = error => {
  return {
    type: GET_PAGES_REJECTED,
    payload: error,
    isLoading: false,
  };
};
