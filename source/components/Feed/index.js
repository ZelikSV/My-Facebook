import React, { Component } from 'react';

// Instruments

import Styles from './styles.m.css';

// Components
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';


export default class Feed extends Component{
        state = {
            posts: [
                {
                    id: "123",
                    comment: 'Hi there Bart!'
                },
                {
                    id: "456"
                }
            ],
    }
    render(){
        const { posts } = this.state;
        const postJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />;
        })
        return(
                <section className = { Styles.feed }>
                    <StatusBar />
                    <Composer />
                    { postJSX }
                </section>
        )
    }
}