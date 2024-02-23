import { endpoints } from './endpoints';
import axios from 'axios';

const addChannel = (token: any, body: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${endpoints.channel.addChannel}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });

const getChannelList = (token: any) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.channel.getChannelList}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });

const getChannelByUserId = (token: any, id: string) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.channel.getChannelByUserId}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });

const alotChannelToUser = (token: any, id: string, body: any) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${endpoints.channel.alotChannelToUser}/${id}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });

const removeChannelToUser = (token: any, userId: string, channelId: string) =>
    new Promise((resolve, reject) => {
        axios
            .patch(`${endpoints.channel.removeChannelToUser}/${userId}/${channelId}`, {},{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });


const deleteChannel = (token: any, id: any) =>
    new Promise((resolve, reject) => {
        axios
            .delete(`${endpoints.channel.deleteChannel}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response: any) => resolve(response.data))
            .catch((error: any) => reject(error));
    });

export {
    addChannel,
    getChannelList,
    getChannelByUserId,
    alotChannelToUser,
    deleteChannel,
    removeChannelToUser
}