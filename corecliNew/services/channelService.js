import { endpoints } from './endpoints';
import axios from 'axios';

const getVideosByChannelId = (id) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.channel.getVideosByChannelId}${id}`, options)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error)
            );
    });

    export {
        getVideosByChannelId
    }