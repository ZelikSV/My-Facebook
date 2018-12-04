// Core
import React, { Component } from 'react';
import { withProfile } from '../HOC/withProfile';
import Like from '../Like';
import { func, string, number, array } from 'prop-types';

// Instruments
import Styles from './styles.m.css';
import moment from 'moment';

@withProfile class Post extends Component {
    static propTypes = {
        comment:     string.isRequired,
        created:     number.isRequired,
        _likePost:   func.isRequired,
        _removePost: func.isRequired,
        likes:       array.isRequired,
        id:          string.isRequired,
    };

    _removePost = () => {
        const { id,  _removePost} = this.props;
        _removePost(id);
    };

    _getCross = () => {
        const { firstName, lastName, currentUserFirstName, currentUserLastName} = this.props;

        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`
            ? (<span
                className = { Styles.cross }
                onClick = { this._removePost }
            />) : null;
    };

    render () {
        const { comment, created, id, likes, _likePost, avatar, lastName, firstName } = this.props;
        const cross = this._getCross();

        return (
            <section className = { Styles.post } >
                { cross }
                <img src = { avatar }/>
                <a>{` ${ firstName } ${ lastName } `}</a>
                <time>{moment.unix(created).format('MMMM D h:mm:ssa')}</time>
                <p>{ comment }</p>
                <Like
                    _likePost = { _likePost }
                    id = { id }
                    likes = { likes }
                />
            </section>
        );
    }
}

export  default Post;
