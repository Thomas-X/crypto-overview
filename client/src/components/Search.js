import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { colors as COLORS, ROUTES } from '../constants/constants';
import { StyledLink } from './Header';
import { StyledInput } from './Login';

const FlexContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Container = styled.div`
    border: 1px solid ${COLORS.black};
    
    &:hover {
        background-color: ${COLORS.primary};
        cursor:pointer;
    }
`;

const StyledLinkWrapper = styled(StyledLink)`
    padding:0;
`;

const mapStateToProps = state => ({
    coins: state.coins.coins,
});

class Search extends React.Component {
    state = {
        query: '',
        currentCoins: this.props.coins,
    };

    onSearch = (e) => {
        const searchQuery = e.target.value;

        this.setState({
            query: e.target.value,
            currentCoins: this.props.coins.filter(r => (r.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 || r.symbol.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)),
        });
    };

    render () {
        const { currentCoins } = this.state;
        return (
            <div>
                <StyledInput placeholder="Search a coin.." onChange={this.onSearch}
                    value={this.state.query}/>
                <FlexContainer>
                    {currentCoins.map((coin, index) => {
                        return (
                            <StyledLinkWrapper to={ROUTES.coin + coin.id} key={index}>
                                <Container>
                                    {coin.symbol} | {coin.name}
                                </Container>
                            </StyledLinkWrapper>
                        );
                    })}
                </FlexContainer>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Search);