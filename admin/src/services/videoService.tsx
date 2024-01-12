import { endpoints } from './endpoints';
import axios from 'axios';

const addVideoToPlaylist = (token: any, body: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${endpoints.video.addVideos}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });

const getAllVideos = (token: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.video.getAllVideos}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });


const getVideosByPlaylist = (token: any, id: string) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.video.getVideosByPlaylist}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });
const deleteVideo = (token: any, id: any) =>
    new Promise((resolve, reject) => {
        axios
            .delete(`${endpoints.video.deleteVideo}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });

export {
    addVideoToPlaylist,
    getAllVideos,
    getVideosByPlaylist,
    deleteVideo,
}