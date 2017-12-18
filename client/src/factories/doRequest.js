import axios from 'axios';
import { requestTypes } from '../constants/constants';
import { store } from '../index';

export default (type, url, payload) => new Promise((resolve, reject) => {
    const { get, post, patch, remove } = requestTypes;
    const token = store.getState().token || '';
    url = url + '?auth=' + token;
    switch (type) {
        case get:
            axios.get(url).then(resolve).catch(reject);
            break;
        case post:
            axios.post(url, payload).then(resolve).catch(reject);
            break;
        case patch:
            axios.patch(url, payload).then(resolve).catch(reject);
            break;
        case remove:
            axios.delete(url, payload).then(resolve).catch(reject);
            break;
        default:
            return null;
    }
});