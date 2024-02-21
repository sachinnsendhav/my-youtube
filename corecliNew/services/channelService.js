
import { endpoints } from './endpoints';
import axios from 'axios';

const addChannel = (token, body) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${endpoints.channel.addChannel}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));
    });

const getChannelList = (token) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.channel.getChannelList}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));
    });

const getChannelByUserId = (token, id) =>
    new Promise((resolve, reject) => {
        axios
            .get(`${endpoints.channel.getChannelByUserId}/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));
    });

const alotChannelToUser = (token, id, body) =>
    new Promise((resolve, reject) => {
        axios
            .post(`${endpoints.channel.alotChannelToUser}/${id}`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            })
            .then((response) => resolve(response.data))
            .catch((error) => reject(error));
    });




export {
    addChannel,
    getChannelList,
    getChannelByUserId,
    alotChannelToUser
}