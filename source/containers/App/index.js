// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from '../../components/HOC/withProfile';
import { Route, Switch, Redirect } from 'react-router-dom';

import avatar from 'theme/assets/spidy';
// Components
import Feed from '../../components/Feed';
import Login from '../../components/Login';
import StatusBar from '../../components/StatusBar';
import Profile from '../../components/Profile';
import Catcher from '../../components/Catcher';

@hot(module) class App extends Component {
    state = {
        isAutontification: false,
        avatar,
        currentUserFirstName: 'Сергей',
        currentUserLastName:  'Зелик',
    }

    _login = () => {
        this.setState({
            isAutontification: true,
        });
    }

    _loginOut = () => {
        this.setState({
            isAutontification: false,
        });
    }

    render() {
        const { isAutontification } = this.state;

        return (
            <Catcher>
                <Provider value = { this.state }>
                    <StatusBar _loginOut = { this._loginOut } />
                    <Switch>
                        <Route
                            path = '/login'
                            render = { (props) => {
                                return(
                                    <Login
                                    _login = { this._login }
                                    { ...props }
                                />
                                    );
                            } 
                            }
                        />
                        { !isAutontification && <Redirect to = '/login' />}
                        <Route
                            component = { Feed }
                            path = '/feed'
                        />
                        <Route
                            component = { Profile }
                            path = '/profile'
                        />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>

        );
    }
}

export default App;
