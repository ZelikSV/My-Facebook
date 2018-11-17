// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

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
           <>
            <Feed {...options} />  
           </>
        );
    }
}
