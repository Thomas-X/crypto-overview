import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { requestTypes, ROUTES } from '../constants/constants';
import doRequest from '../factories/doRequest';
import { removeCurrentCoin, updateCurrentCoin } from '../redux/currentCoin';
import { StyledButton, StyledInput } from './Login';

const Container = styled.div`
    position: relative;
`;

const mapStateToProps = state => ({
    currentCoin: state.currentCoin,
});

const mapDispatchToProps = dispatch => ({
    updateCurrentCoin: (coin) => dispatch(updateCurrentCoin(coin)),
    removeCurrentCoin: () => dispatch(removeCurrentCoin()),
});

class Coin extends React.Component {
    state = {
        amount: 0,
        amountUsd: 0,
    };

    componentDidMount () {
        doRequest(requestTypes.post, '/api/getCoin', { id: this.props.match.params.coinId })
            .then(({ data }) => {
                if (typeof  data === 'object' && (data.id !== undefined || data.id !== null)) {
                    this.props.updateCurrentCoin(data);
                }
            })
            .catch(err => console.error(err));
    }

    componentWillUnmount () {
        this.props.removeCurrentCoin();
    }

    onChangeAmountUSD = (e) => {
        this.setState({
            amountUsd: e.target.value,
        });
    };

    onChangeAmount = (e) => {
        this.setState({
            amount: e.target.value,
        });
    };

    onAdd = () => {
        const coinId = this.props.currentCoin.id;
        const { amount, amountUsd } = this.state;
        doRequest(requestTypes.post, '/api/addCoinToPortfolio', {
            id: coinId,
            coinAmount: amount,
            investmentAmount: amountUsd,
        })
            .then(response => {
                if (response.status === 200) {
                    this.props.history.push(ROUTES.portfolio);
                }
            });
    };

    render () {
        const { symbol, price_usd, name, id } = this.props.currentCoin || {
            symbol: '',
            price_usd: '',
            name: '',
            id: '',
        };
        return (
            <Container>
                {id && <img src={`https://files.coinmarketcap.com/static/img/coins/32x32/${id}.png`} width="32px"
                    height="32px" alt={name + '-img'}/>}
                <h1>
                    {name} | {symbol}
                </h1>
                <h2>
                    ${price_usd}
                </h2>
                <StyledInput placeholder="Amount invested (USD)" type="number" onChange={this.onChangeAmountUSD}/>
                <br/>
                <StyledInput placeholder="Current coin amount" type="number" onChange={this.onChangeAmount}/>

                <StyledButton disabled={this.state.amount === 0 || this.state.amountUsd === 0} onClick={this.onAdd}>add
                    to my
                    portfolio</StyledButton>
            </Container>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Coin));