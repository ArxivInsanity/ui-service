import axios from 'axios';
import { getBaseUrl } from '../api/ApiConstants';

const axiosConfig = axios.create({
    baseURL: getBaseUrl(),
    Headers: {
        'Content-Type': 'application/json',
    }
});

axiosConfig.defaults.headers.common['Authorization'] =  'Bearer ' + sessionStorage.getItem('token')

export default axiosConfig;
