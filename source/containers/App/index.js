// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from '../../components/HOC/withProfile';


import avatar from 'theme/assets/lisa';
// Components
import Feed from '../../components/Feed';
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
                    <Feed />
                </Provider>
            </Catcher>

        );
    }
}

export default App;
