import React, { Component } from 'react';

// Instruments

import Styles from './styles.m.css';

// Components

import Spinner from '../Spinner';
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';

export default class Feed extends Component {
        state = {
            posts: [{ id: "123", comment: 'Hi there Bart!', created: 1523708450 }, { id: "456", comment: 'I m fine. And how are you?', created: 1523708756 } ],
            posting: false,
        }
    render () {

        const { posts, posting } = this.state;
        const postJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />;
        });

        return(
                <section className = { Styles.feed }>
                    <Spinner isSpinning = { posting }/>
                    <StatusBar />
                    <Composer />
                    { postJSX }
                </section>
        );
    }
}