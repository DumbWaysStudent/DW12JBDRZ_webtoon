import {
  GET_EPS_PENDING,
  GET_EPS_FULFILLED,
  GET_EPS_REJECTED,
} from '../config/constants';

const initialState = {
  data: [],
  error: null,
  isLoading: true,
};

const episodes = (state = initialState, action) => {
  switch (action.type) {
    case GET_EPS_PENDING:
      return {
        ...state,
        error: null,
        isLoading: action.payload,
      };
    case GET_EPS_FULFILLED:
      return {
        ...state,
        data: action.payload,
        isLoading: action.isLoading,
      };
    case GET_EPS_REJECTED:
      return {
        ...state,
        error: action.payload,
        isLoading: action.isLoading,
      };
    default:
      return state;
  }
};

export default episodes;
