import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create();
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.defaults.headers['Accept'] = 'application/json';
axiosInstance.defaults.timeout = 60000;
axiosInstance.defaults.baseURL = config.shohoz_base_api;

export default axiosInstance;
