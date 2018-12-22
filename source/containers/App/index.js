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
    render() {
        const options = {
            avatar,
            currentUserFirstName: 'Сергей',
            currentUserLastName:  'Зелик',
        };

        return (
            <Catcher>
                <Provider value = { options }>
                    <StatusBar />
                    <Switch>
                        <Route
                            component = { Login }
                            path = '/login'
                        />
                        <Route
                            component = { Feed }
                            path = '/feed'
                        />
                        <Route
                            component = { Profile }
                            path = '/profile'
                        />
                        <Redirect to = '/login' />
                    </Switch>
                </Provider>
            </Catcher>

        );
    }
}

export default App;
