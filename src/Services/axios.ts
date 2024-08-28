// src/config.ts
export const BASE_URL = 'http://localhost:5000/api';

// src/api/axios.ts
import axios, { AxiosInstance } from 'axios';

const Api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export default Api;