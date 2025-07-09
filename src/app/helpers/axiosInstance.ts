import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = config.shohoz_base_api;

export default axiosInstance;
