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
const getUserDetails = (token: any, userId: string) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.users.getUserDetails}/${userId}`, {
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': token,
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error)
            );
    });
const alotPlaylistToUser = (token: any, body: any, userId: string) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${endpoints.users.addPlaylistToUser}/${userId}`, body, {
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': token,
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error)
            );
    });
const removePlaylistFromUser = (token: any, userId: string, playlistId: string) =>
    new Promise((resolve, reject) => {
        axios
            .put(`${endpoints.users.removePlaylistFromUser}/${userId}/userTypePlayList/${playlistId}`, {},{
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
    getAllUSerByParents,
    getUserDetails,
    alotPlaylistToUser,
    removePlaylistFromUser
}