import React from 'react';
import styled from 'styled-components';
import { requestTypes } from '../constants/constants';
import doRequest from '../factories/doRequest';

const FlexContainer = styled.div`
    display:flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap:wrap;
    padding: 1rem;
`;

const ChildContainer = styled.div`
    width: 100%;
    border: 0.5px solid rgba(0,0,0,.1);
    margin: 0.5rem;
    padding:0.5rem;
    position:relative;
`;

const Remove = styled.span`
    color: red;
    font-size:20px;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    cursor: pointer;
`;

const Image = styled.img`
    padding: 1rem;
`;

class Portfolio extends React.Component {
    state = {
        data: null,
    };

    handleRemove = (id) => {
        doRequest(requestTypes.post, '/api/removeCoinFromPortfolio', { id: id })
            .then(response => {
                if (response.status === 200) {
                    this.getPortfolio();
                }
            });
    };

    getPortfolio () {
        doRequest(requestTypes.get, '/api/getPortfolio')
            .then(({ data }) => this.setState({ data }));
    }

    componentDidMount () {
        this.getPortfolio();
    }

    render () {
        const { data } = this.state;

        let portfolioValue = 0;

        if (data) {
            data.coins.map(({ coinAmount, price_usd }) => {
                portfolioValue += price_usd * coinAmount;
            });
        }

        return (
            <FlexContainer>
                <h1>Your portfolio value is: ${portfolioValue}</h1>
                {data && data.coins.map(({ name, id, symbol, price_usd, investmentAmount, coinAmount, ...rest }, index) => {
                    const investmentValue = price_usd * coinAmount;
                    const profit = investmentValue - investmentAmount;
                    return (
                        <ChildContainer key={index}>
                            <Remove onClick={() => this.handleRemove(id)}>X</Remove>
                            {id &&
                            <Image src={`https://files.coinmarketcap.com/static/img/coins/32x32/${id}.png`} width="32px"
                                height="32px" alt={name + '-img'}/>}
                            <h1>{symbol} | ({name})</h1>
                            <h2>${price_usd}</h2>

                            <span>Invested: ${investmentAmount} and you have {coinAmount} {name}</span>
                            <br/>
                            <br/>
                            <span>Current investment value: ${price_usd * coinAmount}</span>
                            <br/>
                            <br/>
                            <span>Your profit is: ${profit}</span>
                        </ChildContainer>
                    );
                })}
                {!data && <h1>Loading..</h1>}
            </FlexContainer>
        );
    }
}

export default Portfolio;