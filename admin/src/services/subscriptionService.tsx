import { endpoints } from './endpoints';
import axios from 'axios';

const getSubscriptionPlans = (token: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.subscription.getPlans}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
        .then((response: any) => resolve(response.data))
        .catch((error: any) => reject(error));
});

export {
    getSubscriptionPlans
}