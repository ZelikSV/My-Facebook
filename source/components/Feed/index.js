import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from 'socket/init';
// Components
import Catcher from '../../components/Catcher';
import Spinner from '../Spinner';
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';
import { withProfile } from '../HOC/withProfile';


@withProfile class Feed extends Component {
        state = {
            posts:      [],
            isSpinning: false,
        };

        componentDidMount = () => {
            const { currentUserFirstName, currentUserLastName } = this.props;
            this._fetchPost();
            socket.emit('join', GROUP_ID);
            socket.on('create', (postJSON) => {
                const { data: createdPost, meta } = JSON.parse(postJSON);
                if (`${ currentUserFirstName } ${ currentUserLastName }` !== `${ meta.authorFirstName } ${ meta.authorLastName }`) {
                    this.setState(({ posts }) => ({
                        posts: [ createdPost, ...posts ],

                    }));
                }
            });
            socket.on('remove', (postJSON) => {
                const { data: removedPost, meta } = JSON.parse(postJSON);
                if (`${ currentUserFirstName } ${ currentUserLastName }` !== `${ meta.authorFirstName } ${ meta.authorLastName }`) {
                    this.setState(({ posts }) => ({
                        posts: posts.filter((post) => post.id !== removedPost.id),
                    }));
                }
            });
            socket.on('like', (postData) => {
                const { data: createdPost, meta} = JSON.parse(postData);
                if (`${meta.authorfirstName} ${meta.authorlastName}`
                !== `${currentUserFirstName} ${currentUserLastName}`) {
                    this.setState(({ posts }) => ({
                        posts: posts.map((post) => createdPost.id === post.id ? createdPost : post),
                    }));
                }
            });
        }

        componentWillUnmount = () => {
            socket.removeListener('create');
            socket.removeListener('remove');
            socket.removeListener('like');
        }

        _setPostFetchingState = (state) => {
            this.setState({ isSpinning: state });
        }

        _fetchPost = async () => {
            this._setPostFetchingState(true);
            const response = await fetch(api, {
                method: 'GET',
            });
            const { data: posts } = await response.json();
            this.setState({

                posts,
                isSpinning: false,
            });
        }

        _createPost = async (comment) => {
            this._setPostFetchingState(true);
            const response = await fetch(api, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  TOKEN,
                },
                body: JSON.stringify({ comment }),
            });

            const { data: post } = await response.json();

            this.setState(({ posts }) => ({
                posts:      [ post, ...posts ],
                isSpinning: false,
            }));
        }

        _likePost = async (id) => {
            this._setPostFetchingState(true);

            const response = await fetch(`${api}/${id}`, {
                method:  'PUT',
                headers: {
                    Authorization: TOKEN,
                },
            });

            const { data: likePost } = await response.json();

            this.setState(({ posts }) => ({
                posts:      posts.map((post) => post.id === likePost.id ? likePost : post),
                isSpinning: false,
            }));
        }

        _removePost = async (id) => {
            this._setPostFetchingState(true);

            await fetch(`${ api }/${ id }`, {
                method:  'DELETE',
                headers: {
                    Authorization: TOKEN,
                },
            });

            this.setState(({ posts}) => ({

                posts:      posts.filter((item) => { return item.id !== id; }),
                isSpinning: false,
            }));
        }

        render () {
            const { posts, isSpinning } = this.state;
            const postJSX = posts.map((post) => {
                return (
                    <Catcher  key = { post.id }>
                        <Post
                            { ...post }
                            _likePost = { this._likePost }
                            _removePost = { this._removePost }
                        />
                    </Catcher>
                );
            });

            return (
                <section className = { Styles.feed }>
                    <Spinner isSpinning = { isSpinning }/>
                    <StatusBar />
                    <Composer _createPost = { this._createPost } />
                    { postJSX }
                </section>
            );
        }
}

export default Feed;
