// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from '../../components/HOC/withProfile';


import avatar from 'theme/assets/lisa';
// Components
import Feed from '../../components/Feed';

@hot(module)
export default class App extends Component {
    render() {
    	const options = {
    avatar,
    currentUserFirstName: 'Lisa',
    currentUserLastName: 'Simpson'
}
        return (
           <Provider value = { options }>
            <Feed { ...options }/>
           </Provider>
        );
    }
}
