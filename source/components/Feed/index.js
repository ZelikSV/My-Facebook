import React, { Component } from 'react';

// Instruments

import Styles from './styles.m.css';

// Components
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';




export default class Feed extends Component{
    render(){
    	const {
            currentUserFirstName,
            currentUserLastName,
            avatar
        } = this.props;
        return(
            <section className = { Styles.feed }>
                <StatusBar { ...this.props }/>
                <Composer { ...this.props }/>
                <Post {...this.props}/>
            </section>
            
        )
    }
}