const TOKEN_UPDATE = 'TOKEN_UPDATE';
const TOKEN_REMOVE = 'TOKEN_REMOVE';

export default (state = '', action) => {
    switch (action.type) {
        case TOKEN_REMOVE:
            return '';
        case TOKEN_UPDATE:
            return action.payload;
        default:
            return state;
    }
}

export const onTokenRemove = () => ({
    type: TOKEN_REMOVE,
});

export const onTokenUpdate = (newToken) => ({
    type: TOKEN_UPDATE,
    payload: newToken,
});