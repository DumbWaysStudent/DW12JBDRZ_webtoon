import {
  fetchData,
  fetchDataFulfilled,
  fetchDataRejected,
} from '../_actions/pages';
import {API} from '../config/api';

const pages = (webtoon_id, episode_id) => {
  return dispatch => {
    dispatch(fetchData(true));
    API.get(`/webtoon/${webtoon_id}/episode/${episode_id}`)
      .then(res => {
        dispatch(fetchDataFulfilled(res.data));
      })
      .catch(error => {
        dispatch(fetchDataRejected(error));
      });
  };
};

export default pages;
