import { applyMiddleware, compose, createStore } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import rootReducer from './redux/index';

const config = {
    key: '__CRYPTO_OVERVIEW__',
    storage,
};

const reducers = persistCombineReducers(config, rootReducer);

export default () => {

    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(...{
            // add middleware here, sometime, in the future perhaps
        }),
    );

    let store = createStore(
        reducers,
        enhancer,
    );

    let persistor = persistStore(store);

    return { store, persistor };
}