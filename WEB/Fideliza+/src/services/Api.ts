import axios from 'axios';
import { store } from '../store/store';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 404) {
            console.error('Recurso não encontrado (404)');
        }
        return Promise.reject(error);
    }
);

api.interceptors.request.use(
    (config) => {

        const state = store.getState();
        const token = state.auth.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;

