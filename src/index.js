import bodyParser from 'body-parser';
import chalk from 'chalk';
import express from 'express';
import { Server as HttpServer } from 'http';
import ip from 'ip';
import mongoose from 'mongoose';
import Api from './controllers/api';
import Auth from './controllers/auth';
import createAuthHandler, { authMiddleware } from './factories/createAuthHandler';
import getCoins from './factories/getCoins';
import Coin from './global/models/Coin';
import { error, info, warn } from './services/log';
import Socket from './socket';

require('dotenv').config();

class Server {
    app;
    port;

    constructor () {

        this.app = express();
        this.port = process.env.PORT || 3004;
        this.connectToDb()
            .catch(err => error(err));
    }

    onListen = (err) => {
        if (err) {
            error(`Unable to start server on port ${this.port}`, err);
            return;
        }

        if (process.env.__DEV__) {
            warn('We\'re in development mode.');
        }

        info(`We're live.\r\n`);
        info(chalk`{bold On your network:}     {underline http://${ip.address('public')}:{bold ${this.port.toString()}}/}`);
        info(chalk`Local:               {underline http://${ip.address('private')}:{bold ${this.port.toString()}}/}`);
    };

    connectToDb = async () => {
        try {
            mongoose.connect('mongodb://127.0.0.1/test', {
                useMongoClient: true,
            });
            mongoose.Promise = global.Promise;
            this.db = mongoose.connection;

            this.db.on('error', (err) => {
                console.log();
                error(err);
                throw new Error(err);
            });
            this.db.once('open', () => {
                info('Successfully connected to database!');
                console.log();
                this.start()
                    .catch(err => {
                        console.log();
                        error(err);
                        throw new Error(err);
                    });
            });
        } catch (err) {
            throw new Error(err);
        }
    };

    start = async () => {
        this.app.use(bodyParser.json());
        setInterval(() => {
            getCoins()
                .then(async (coins) => {
                    Coin.collection.drop();
                    for (let coin of coins) {
                        Coin.create(coin);
                    }
                })
                .catch(err => error(err));
        }, 1000 * 300);
        createAuthHandler();
        this.setRoutes();
        const http = new HttpServer(this.app);
        this.socket = new Socket(http);
        this.socket.bindSockets();
        http.listen(this.port, this.onListen);
    };

    setRoutes = () => {
        this.app.use('/', Auth);

        // routes from here on are authed(!)
        this.app.use(authMiddleware);
        this.app.use('/api', Api);
    };
}

export default new Server();