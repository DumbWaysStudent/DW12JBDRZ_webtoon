import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://toonkingdom.herokuapp.com/api/v1',
  timeout: 10000,
});

export const setHeaderAuth = token => {
  API.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
