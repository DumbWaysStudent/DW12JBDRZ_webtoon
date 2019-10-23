import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/episodes';
import {API} from '../config/api';

const episodes = webtoon_id => {
  return dispatch => {
    dispatch(fetchData(true));
    API.get(`/webtoon/${webtoon_id}/episodes`)
      .then(res => {
        dispatch(fetchDataFulfilled(res.data));
      })
      .catch(error => {
        dispatch(fetchDataRejected(error));
      });
  };
};

export default episodes;
