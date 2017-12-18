import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { colors as COLORS, ROUTES } from '../constants/constants';
import { onTokenUpdate } from '../redux/token';

const mapDispatchToProps = dispatch => ({
    onTokenUpdate: (newToken) => dispatch(onTokenUpdate(newToken)),
});

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    
`;

export const StyledInput = styled.input`
    margin:0.5rem 0.5rem 0.5rem 0;
    outline:none;
    padding:0.15rem;
    font-size:12px;
    width: 148px;
`;

export const StyledButton = styled.button`
    background-color: ${COLORS.secondary};
    color: ${COLORS.white};
    padding: 0.5rem;
    width: 156px;
    text-transform: uppercase;
    margin:0.5rem 0.5rem 0.5rem 0;
    
    cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
    opacity: ${({ disabled }) => disabled ? '0.5' : '1'};
`;

class Login extends React.Component {
    state = {
        username: '',
        password: '',
    };

    onLogin = () => {
        const { username, password } = this.state;
        axios.post('/login', { username: username, password: password })
            .then(({ data: { token } }) => {
                if (token) {
                    this.props.onTokenUpdate(token);
                    this.props.history.push(ROUTES.home);
                }
            })
            .catch(err => console.error(err));
    };

    render () {
        const { username, password } = this.state;
        return (
            <Container>
                <h1>login</h1>
                <StyledInput placeholder="Username" type="text"
                    onChange={e => this.setState({ username: e.target.value })}/>
                <StyledInput placeholder="Password" type="password"
                    onChange={e => this.setState({ password: e.target.value })}/>
                <StyledButton onClick={this.onLogin}
                    disabled={username.length === 0 || password.length < 8}>login</StyledButton>
            </Container>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Login));