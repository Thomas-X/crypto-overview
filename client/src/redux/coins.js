import { apiStatus, requestTypes } from '../constants/constants';
import doRequest from '../factories/doRequest';
import { store } from '../index';

const initialState = {
    status: apiStatus.pending,
    coins: [],
    error: '',
};

const GET_ALL_COINS_LOAD = 'GET_ALL_COINS_LOAD';
const GET_ALL_COINS_SUCCESS = 'GET_ALL_COINS_SUCCESS';
const GET_ALL_COINS_FAIL = 'GET_ALL_COINS_FAIL';

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COINS_LOAD:
            return {
                status: apiStatus.loading,
            };
        case GET_ALL_COINS_SUCCESS:
            return {
                status: apiStatus.success,
                coins: action.payload,
            };
        case GET_ALL_COINS_FAIL:
            return {
                status: apiStatus.fail,
                error: action.payload,
            };
        default:
            return state;
    }
}

export const loadCoins = () => {
    store.dispatch({
        type: GET_ALL_COINS_LOAD,
    });
    doRequest(requestTypes.get, '/api/getAllCoins')
        .then(({ data }) => {
            store.dispatch({
                type: GET_ALL_COINS_SUCCESS,
                payload: data,
            });
        })
        .catch(err => {
            store.dispatch({
                type: GET_ALL_COINS_FAIL,
                payload: err,
            });
            console.error(err);
        });
};