import { endpoints } from './endpoints';
import axios from 'axios';

const options = {
    params: {
        maxResults: 50,
    },
    headers: {
        'X-RapidAPI-Key': '9f64104e16msh5b7288224bca0b2p11551cjsnb71033460e12',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    },
};
const getVideosBySearch = (search) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.youtubeApi.search}${search}`, options)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error)
            );
    });

const getVideoDetails = (id) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.youtubeApi.getVideoDetails}${id}`, options)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error)
            );
    });

const getRelatedVideos = (id) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.youtubeApi.getRelatedVideos}${id}&type=video`, options)
            .then((response) => resolve(response.data))
            .catch((error) => reject(error)
            );
    });
export {
    getVideosBySearch,
    getVideoDetails,
    getRelatedVideos
}