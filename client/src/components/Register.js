import axios from 'axios/index';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ROUTES } from '../constants/constants';
import { onTokenUpdate } from '../redux/token';
import { Container, StyledButton, StyledInput } from './Login';

const mapDispatchToProps = dispatch => ({
    onTokenUpdate: (newToken) => dispatch(onTokenUpdate(newToken)),
});

class Register extends React.Component {
    state = {
        username: '',
        password: '',
    };

    onRegister = () => {
        const { username, password } = this.state;
        axios.post('/register', { username: username, password: password })
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
                <h1>register</h1>
                <StyledInput placeholder="Username" type="text"
                    onChange={e => this.setState({ username: e.target.value })}/>
                <StyledInput placeholder="Password" type="password"
                    onChange={e => this.setState({ password: e.target.value })}/>
                <StyledButton onClick={this.onRegister}
                    disabled={username.length === 0 || password.length === 0}>login</StyledButton>
            </Container>
        );
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Register));