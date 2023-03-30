import axios from 'axios';

export default axios.create({
  baseURL: 'https://dindin-api-ada5.onrender.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});