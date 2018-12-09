import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api, TOKEN, GROUP_ID } from 'config/api';
import { socket } from 'socket/init';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
// Components
import Catcher from '../../components/Catcher';
import Spinner from '../Spinner';
import StatusBar from '../StatusBar';
import Composer from '../Composer';
import Post from '../Post';
import Postman from '../Postman';
import { withProfile } from '../HOC/withProfile';


@withProfile class Feed extends Component {
        state = {
            posts:      [],
            isSpinning: false,
            postman:    true,
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

            this._timeOutOfPostman();
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

        _animateComposerEnter = (composer) => {
            fromTo(composer, 1,
                { opacity: 0, rotationX: 50 },
                { opacity: 1, rotationX: 0 });
        }

        _animatePostmanEnter = (postman) => {
            fromTo(postman, 1,
                { opacity: 0, x: 100 },
                { opacity: 1, x: 0 });
        }

        _animatePostmanExit = (postman) => {
            fromTo(postman, 1,
                { opacity: 1, x: 0 },
                { opacity: 0, x: 100 });
        }

        _timeOutOfPostman = () => {
            setTimeout(() => {
                this.setState({ postman: false });
            }, 4000);
        }

        render () {
            const { posts, isSpinning, postman } = this.state;
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
                    <Transition
                        appear
                        in
                        timeout = { 1000 }
                        onEnter = { this._animateComposerEnter }>
                        <Composer _createPost = { this._createPost } />
                    </Transition>
                    <Transition
                        appear
                        in = { postman }
                        timeout = { 1000 }
                        onEnter = { this._animatePostmanEnter }
                        onExit = { this._animatePostmanExit } >
                        <Postman />
                    </Transition>
                    { postJSX }
                </section>
            );
        }
}

export default Feed;
