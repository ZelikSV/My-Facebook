import React, { Component } from 'react';

// Instruments

import Styles from './styles.m.css';

// Components
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';


export default class Feed extends Component {
    render () {
        return (
            <section className = { Styles.feed } >
                <StatusBar />
                <Composer />
                <Post />
            </section>
        );
    }
}
