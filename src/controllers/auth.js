import { compare, hash } from 'bcrypt';
import { Router } from 'express';
import { check, validationResult } from 'express-validator/check';
import is from 'is-js';
import { sign } from 'jsonwebtoken';
import uuid from 'uuid/v4';
import Portfolio from '../global/models/Portfolio';
import User from '../global/models/User';

const Auth = Router();

const validations = [
    check('username').exists().isAlphanumeric(), // todo check existence of username in db
    check('password').exists().isLength({ min: 8 }),
];

Auth.post('/register', validations, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    try {
        const { username, password } = req.body;
        const user = await User.find({ username: username })[0];
        if (is.set(user)) {
            throw new Error('User already exists');
        } else if (!is.set(user)) {
            const id = uuid();
            const idX = uuid();
            const user = {
                id,
                username,
                password: await hash(password, Number(process.env.salt)),
            };
            const portfolio = {
                id: idX,
                author: id,
                name: username + `-portfolio`,
                coins: [],
            };
            await User.create(user);
            await Portfolio.create(portfolio);
            return res.json({
                token: sign({ sub: id }, process.env.secretKey),
            });
        }
    } catch (err) {
        next(err);
    }
});

Auth.post('/login', validations, async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    try {
        const { username, password } = req.body;
        const user = (await User.find({ username: username }))[0];
        if (!user) {
            throw new Error('User does not exist');
        }
        if (!await compare(password, user.password)) {
            throw new Error('Incorrect password');
        }

        return res.json({
            token: sign({ sub: user.id }, process.env.secretKey),
        });

    } catch (err) {
        next(err);
    }
});

export default Auth;