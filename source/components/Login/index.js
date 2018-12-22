import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { Link } from 'react-router-dom';
import login from  '../../theme/assets/login.png';

export default class Login extends Component {
    state = {
        keysOpen: false,
        userName: '',
        password: '',
    }

    _enteredLogin = (event) => {
        this.setState({ userName: event.target.value });
    }

    _enteredPassword = (event) => {
        this.setState({ password: event.target.value });
    }

    _checkEnteredData = () => {
        if (this.state.userName === 'zelik' && this.state.password === '1234') {
            this.setState({keysOpen: !this.state.keysOpen });
        }
    }

    render () {
        const { keysOpen } = this.state;

        return (
            <section className = { Styles.login }>
                <div>
                    <img src = {  login }/>
                    <input
                        onChange = { this._enteredLogin }
                        placeholder = 'Enter your login...'
                        type = 'text'
                    />
                    <input
                        onChange = { this._enteredPassword }
                        placeholder = 'Enter your password...'
                        type = 'text'
                    />
                    <Link onClick = { this._checkEnteredData } to = { keysOpen ? '/feed' : '/login' } >Login</Link>
                </div>
            </section>
        );
    }
}

