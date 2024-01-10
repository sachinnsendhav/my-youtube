import { endpoints } from './endpoints';
import axios from 'axios';

const createPlaylist = (token: any, body: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${endpoints.playlist.createPlaylist}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });

const getAllPlaylist = (token: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.playlist.getPlaylistByParents}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });

const updatePlaylist = (token: any, body: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${endpoints.playlist.updatePlaylist}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });
const deletePlaylist = (token: any, body: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${endpoints.playlist.deletePlaylist}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });

export {
    createPlaylist,
    getAllPlaylist,
    updatePlaylist,
    deletePlaylist,
}