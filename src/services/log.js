import chalk from 'chalk';
import { get } from 'stack-trace';

const log = (type = 'log', message, ...misc) => {
    if (type === 'debug' && process.env.DEBUG !== 'true') {
        return;
    }
    let content = [];
    switch (type) {
        case 'log':
            content = [chalk`{bold.cyan INFO}`];
            break;
        case 'error':
            content = [chalk`{bold.red ERR!}`];
            break;
        case 'warn':
            content = [chalk`{bold.yellow WARN}`];
            break;
        case 'debug': {
            const trace = get();
            const funcName = trace[2].getFunctionName();
            content = [chalk`{bold.magenta VERB} ${funcName ? chalk`{bgBlack.white  ${funcName.substr(0, 15)} }` : ''}`];
            break;
        }
        default:
            throw new Error(`Invalid log type: ${type}`);
    }

    content = [...content, message, ...misc];

    console[type === 'debug' ? 'log' : type](...content);
};

export const info = (message, ...rest) => log('log', message, ...rest);
export const error = (message, ...rest) => log('error', message, ...rest);
export const warn = (message, ...rest) => log('warn', message, ...rest);
export const debug = (message, ...rest) => log('debug', message, ...rest);