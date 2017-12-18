import { Router } from 'express';
import { check } from 'express-validator/check/index';
import Coin from '../global/models/Coin';
import Portfolio, { CoinSub } from '../global/models/Portfolio';

const Api = Router();

const getCoinsValidation = [
    check('id').exists(), // todo check existence of username in db
];

const addCoinToPortfolioValidation = [
    check('id').exists(),
    check('coinAmount').exists(),
    check('investmentAmount').exists(),
];
const removeCoinFromPortfolioValidation = [
    check('id').exists(),
];

const editCoinFromPortfolioValidation = [
    check('id').exists(),
    check('changes').exists(),
];

Api.get('/getAllCoins', async (req, res, next) => {
    try {
        const coins = await Coin.find({});
        res.json(coins);
    } catch (err) {
        next(err);
    }
});

Api.post('/getCoin', getCoinsValidation, async (req, res, next) => {
    try {
        const { id } = req.body;
        const coin = await Coin.find({ id: id });
        res.json(coin[0]);
    } catch (err) {
        next(err);
    }
});

Api.post('/addCoinToPortfolio', addCoinToPortfolioValidation, async (req, res, next) => {
    try {
        const { id, coinAmount, investmentAmount } = req.body;
        const portfolio = (await Portfolio.find({ author: req.user.id }))[0];
        const arr = portfolio.coins.slice();
        arr.push({
            coinId: id,
            coinAmount,
            investmentAmount,
        });
        portfolio.coins = arr;
        await portfolio.save(portfolio);
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
});

Api.post('/removeCoinFromPortfolio', removeCoinFromPortfolioValidation, async (req, res, next) => {
    try {
        const { id } = req.body;
        const portfolio = (await Portfolio.find({ author: req.user.id }))[0];
        const coins = portfolio.coins;
        coins.splice(coins.findIndex((coin) => coin.id !== id), 1);
        await portfolio.save(portfolio);
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
});

Api.post('/editCoinFromPortfolio', editCoinFromPortfolioValidation, async (req, res, next) => {
    try {
        const { changes, id } = req.body;
        let coin = (await CoinSub.find({ id: id }))[0];
        if (!coin) {
            throw new Error('Could not find coin.');
        }
        const obj = {
            ...coin,
            ...changes,
        };
        coin = obj;
        await coin.save(obj);
    } catch (err) {
        next(err);
    }
});

Api.get('/getPortfolio', async (req, res, next) => {
    try {
        const { id } = req.user;
        const portfolio = (await Portfolio.find({ author: id }))[0];
        const arr = [];
        portfolio.coins.forEach(async (coin, index) => {
            const coinResult = (await Coin.find({ id: coin.coinId }))[0];
            if (coinResult) {
                arr[index] = {
                    ...portfolio.coins[index]._doc,
                    ...coinResult._doc,
                };
            }
            if (index + 1 === portfolio.coins.length) {
                res.json({
                    ...portfolio._doc,
                    coins: arr,
                });
            }
        });
        if (portfolio.coins.length === 0) {
            res.json(portfolio._doc);
        }
    } catch (err) {
        next(err);
    }
});

export default Api;