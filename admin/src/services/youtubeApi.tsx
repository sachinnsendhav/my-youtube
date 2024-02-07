import { endpoints } from './endpoints';
import axios from 'axios';

const options = {
    params: {
        maxResults: 50,
    },
    headers: {
        "Accept": "application/json"
    },
};
const getVideosBySearch = (search: string) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.youtubeApi.search}${search}`, options)
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error)
            );
    });

const getVideoDetails = (id: string) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.youtubeApi.getVideoDetails}${id}`, options)
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error)
            );
    });

const getRelatedVideos = (id: string) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.youtubeApi.getRelatedVideos}${id}`, options)
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error)
            );
    });
export {
    getVideosBySearch,
    getVideoDetails,
    getRelatedVideos
}