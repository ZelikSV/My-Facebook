import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import login from  '../../theme/assets/login.png';

export default class Login extends Component {
    _enteredLogin = () => {
        
        this.props._login();
        this.props.history.replace('/feed');
    }

    render () {
        return (
            <section className = { Styles.login }>
                <div>
                    <img src = {  login }/>
                    <input
                        placeholder = 'Enter your login...'
                        type = 'text'
                    />
                    <input
                        placeholder = 'Enter your password...'
                        type = 'text'
                    />
                    <button onClick = { this._enteredLogin }>Login</button>
                </div>
            </section>
        );
    }
}

