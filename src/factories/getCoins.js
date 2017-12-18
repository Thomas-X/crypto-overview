import axios from 'axios';

const BASE_URL = 'https://api.coinmarketcap.com/v1/ticker/';

export default () => new Promise(resolve => {

    let offset = 0;

    const query = '?start=';
    const coins = [];

    const doRequest = (uri) => {
        axios.get(uri)
            .then(({ data }) => {
                if (Array.isArray(data)) {
                    for (let coin of data) {
                        coins.push(coin);
                    }
                    if (data.length >= 100) {
                        offset += 100;
                        doRequest(BASE_URL + query + offset);
                    } else {
                        resolve(coins);
                    }
                }
            })
            .catch(err => error(err));
    };

    const doInitialRequest = () => {
        doRequest(BASE_URL + query + offset);
    };

    doInitialRequest();
});