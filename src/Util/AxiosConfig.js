import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://localhost:8080',
    Headers: {
        'Content-Type': 'application/json',
    }
});

axiosConfig.defaults.headers.common['Authorization'] =  'Bearer ' + sessionStorage.getItem('token')

export default axiosConfig;
