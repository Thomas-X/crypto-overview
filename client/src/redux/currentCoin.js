const CURRENTCOIN_UPDATE = 'CURRENTCOIN_UPDATE';
const CURRENTCOIN_REMOVE = 'CURRENTCOIN_REMOVE';

export default (state = {}, action) => {
    switch (action.type) {
        case CURRENTCOIN_UPDATE:
            return action.payload;
        case CURRENTCOIN_REMOVE:
            return null;
        default:
            return state;
    }
}

export const updateCurrentCoin = (coin) => ({
    type: CURRENTCOIN_UPDATE,
    payload: coin,
});

export const removeCurrentCoin = () => ({
    type: CURRENTCOIN_REMOVE,
});