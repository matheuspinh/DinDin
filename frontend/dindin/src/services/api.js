import axios from 'axios';

export default axios.create({
  baseURL: 'https://dindin-api-70u0.onrender.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});