// Core
import React, { Component } from 'react';
import { Consumer } from '../HOC/withProfile';
import Like from '../Like';
import { func, string, number, array } from 'prop-types';

// Instruments
import Styles from './styles.m.css';
import moment from 'moment';

export default class Post extends Component {
    static propTypes = {
        comment:   string.isRequired,
        created:   number.isRequired,
        _likePost: func.isRequired,
        likes:     array.isRequired,
        id:        string.isRequired,
    };

    render () {
        const { comment, created, id, likes, _likePost } = this.props;

        return (
            <Consumer>
                {
                    (context) => (
                        <section className = { Styles.post } >
                            <span className = { Styles.cross } />
                            <img src = { context.avatar }/>
                            <a>{` ${ context.currentUserFirstName } ${context.currentUserLastName } `}</a>
                            <time>{moment.unix(created).format('MMMM D h:mm:ssa')}</time>
                            <p>{ comment }</p>
                            <Like
                                _likePost = { _likePost }
                                id = { id }
                                likes = { likes }
                                { ...context }
                            />
                        </section>
                    )
                }
            </Consumer>

        );
    }
}
