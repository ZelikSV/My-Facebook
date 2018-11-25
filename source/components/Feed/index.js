import React, { Component } from 'react';

// Instruments

import Styles from './styles.m.css';
import { getUniqueID, delay } from '../../instruments/index';
// Components

import Spinner from '../Spinner';
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';
import moment from 'moment';

export default class Feed extends Component {
    constructor() {
        super();

        this._createPost = this._createPost.bind(this);
        this._setPostFetchingState = this._setPostFetchingState.bind(this);
        this._likePost = this._likePost.bind(this);
        this._removePost = this._removePost.bind(this);
    }

        state = {
            posts: [
                { id: '123', comment: 'Hi there Bart!', created: { month: 3, day: 5, hour: 4, minute: 10, second: 3 }, likes: [] },
                { id: '456', comment: 'I m fine. And how are you?', created: { month: 2, day: 15, hour: 1, minute: 10, second: 3 }, likes: [] },
            ],
            posting: false,
        };

        _setPostFetchingState (state) {
            this.setState({ posting: state });
        }

        async  _createPost (comment) {
            this._setPostFetchingState(true);
            const post = {
                id:      getUniqueID(),
                created: moment.utc(),
                comment,
                likes:   [],
            };

            await delay(1500);

            this.setState(({ posts }) => ({
                posts:   [ post, ...posts ],
                posting: false,
            }));
        }

        async _likePost (id) {
            const { currentUserFirstName, currentUserLastName } = this.props;

            this._setPostFetchingState(true);
            await delay(500);
            const { posts } = this.state;
            const newPosts = posts.map((post) => {
                if (post.id === id) {
                    return {
                        ...post,
                        likes: [
                            {
                                id:        getUniqueID(),
                                firstName: currentUserFirstName,
                                lastName:  currentUserLastName,
                            },
                        ],
                    };
                }

                return post;
            });

            this.setState({
                posts:   newPosts,
                posting: false,
            });
        }

        async _removePost (id) {
            this._setPostFetchingState(true);
            await delay(500);

            const { posts } = this.state;

            const postsAfterRemoves = posts.filter((item) => {
                return item.id !== id;
            });

            this.setState({
                posts:   postsAfterRemoves,
                posting: false,
            });
        }

        render () {
            const { posts, posting } = this.state;
            const postJSX = posts.map((post) => {
                return (
                    <Post
                        key = { post.id }
                        { ...post }
                        _likePost = { this._likePost }
                        _removePost = { this._removePost }
                    />
                );
            });

            return (
                <section className = { Styles.feed }>
                    <Spinner isSpinning = { posting }/>
                    <StatusBar />
                    <Composer _createPost = { this._createPost } />
                    { postJSX }
                </section>
            );
        }
}
