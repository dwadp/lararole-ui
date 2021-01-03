import axios from 'axios';

import * as storage from '../storage/index';

const token = storage.get('token');

if(token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const api = axios.create({
  baseURL: 'http://localhost:8081/api',
  timeout: 10000,
  withCredentials: true,
  headers: {
    Accept: 'application/json'
  }
});

export const web = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 10000,
  withCredentials: true,
});