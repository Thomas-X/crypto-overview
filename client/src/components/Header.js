import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { apiStatus, colors as COLORS, NAVBAR_HEIGHT, ROUTES } from '../constants/constants';
import { loadCoins } from '../redux/coins';

const Container = styled.nav`
    height: ${NAVBAR_HEIGHT};
    width:100%;
    position:fixed;
    top:0;
    z-index:100;
    background-color: ${COLORS.white};
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    border-bottom: 1px solid ${COLORS.secondary};
    color: ${COLORS.textColor};
`;

const Left = styled.div`
    flex-grow: 1;
    display: flex;
    align-items:center;  
    padding-left: 1.5rem;
`;

const Right = styled.div`
    flex-grow: 0;
    display:flex;
    align-items: center;
    padding-right: 1.5rem;
`;

const Text = styled.span`
    font-size:16px;
    font-weight: 600;
`;

export const StyledLink = styled(Link)`
    text-decoration: none;
    padding:1rem;
    color: inherit;
    &:hover {
        text-decoration: underline;
    }
`;

const mapStateToProps = state => ({
    token: state.token,
    coins: state.coins,
});

const mapDispatchToProps = dispatch => ({});

class Header extends React.Component {

    componentDidUpdate (prevProps) {
        if (prevProps.token !== this.props.token) {
            if (this.props.coins.status === apiStatus.pending) {
                loadCoins();
            }
        }
    }

    componentDidMount () {
        if (this.props.token.length > 0) {
            loadCoins();
        }
    }

    render () {
        const { token } = this.props;
        return (
            <Container>
                <Left>
                    <Text>Crypto-Overview</Text>
                </Left>
                <Right>
                    {!token && <StyledLink to={ROUTES.register}>register</StyledLink>}
                    {!token && <StyledLink to={ROUTES.login}>login</StyledLink>}
                    {token && <StyledLink to={ROUTES.portfolio}>portfolio</StyledLink>}
                    {token && <StyledLink to={ROUTES.search}>search</StyledLink>}
                </Right>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);