import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    mode:'no-cors',
    headers: {
        accept: "application/json",
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
        

    }
});

export default axiosConfig;
