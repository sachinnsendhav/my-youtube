import { endpoints } from './endpoints';
import axios from 'axios';

const getCustomersList = (token: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.admin.customersList}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });

const getCustomersDetails = (token: any, id: string) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.admin.customerDetails}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });
export {
    getCustomersList,
    getCustomersDetails
}