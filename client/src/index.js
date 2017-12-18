import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';
import styled from 'styled-components';
import Coin from './components/Coin';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Portfolio from './components/Portfolio';
import Register from './components/Register';
import Search from './components/Search';
import { NAVBAR_HEIGHT, ROUTES, ROUTES_PATHS } from './constants/constants';
import createStore from './createStore';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const Body = styled.div`
    padding: calc(${NAVBAR_HEIGHT} + 1rem) 1rem 1rem 1rem;
`;

const history = createBrowserHistory();

export const { persistor, store } = createStore();

ReactDOM.render(
    <PersistGate persistor={persistor}>
        <Provider store={store}>
            <Router history={history}>
                <div>
                    <Header/>
                    <main>
                        <Switch>
                            <Body>
                                <Route exact path={ROUTES.home} component={Home}/>
                                <Route exact path={ROUTES.login} component={Login}/>
                                <Route exact path={ROUTES.register} component={Register}/>
                                <Route exact path={ROUTES.search} component={Search}/>
                                <Route exact path={ROUTES_PATHS.coin} component={Coin}/>
                                <Route exact path={ROUTES.portfolio} component={Portfolio}/>
                            </Body>
                        </Switch>
                    </main>
                </div>
            </Router>
        </Provider>
    </PersistGate>
    , document.getElementById('root'));

registerServiceWorker();
