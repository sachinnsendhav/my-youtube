import { endpoints } from './endpoints';
import axios from 'axios';

const createUSer = (token: any, body: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${endpoints.users.createUSer}`, body, {
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': token,
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error)
            );
    });
    const getAllUSerByParents = (token: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.users.getAllUsers}`, {
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': token,
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error)
            );
    });
export {
    createUSer,
    getAllUSerByParents
}