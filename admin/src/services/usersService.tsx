import { endpoints } from './endpoints';
import axios from 'axios';

const getCustomers = (token: any, perPage: number, currentPage: number) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.users}?limit=${perPage}&page=${currentPage}`, {
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error)
            );
    });
export {
    getCustomers
}