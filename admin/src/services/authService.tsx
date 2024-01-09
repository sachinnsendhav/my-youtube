import { endpoints } from './endpoints';
import axios from 'axios';

const login = (body: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${endpoints.auth.login}`, body, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });

const register = (body: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${endpoints.auth.register}`, body, {
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });

export {
    login,
    register
}