import axios from 'axios';

export const radio = axios.create({
  baseURL: 'https://de1.api.radio-browser.info/json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default radio;
