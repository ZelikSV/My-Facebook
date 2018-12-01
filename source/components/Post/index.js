// Core
import React, { Component } from 'react';
import { withProfile } from '../HOC/withProfile';
import Like from '../Like';
import { func, string, object, array } from 'prop-types';

// Instruments
import Styles from './styles.m.css';
import moment from 'moment';

@withProfile
export  default class Post extends Component {
    static propTypes = {
        comment:     string.isRequired,
        created:     object.isRequired,
        _likePost:   func.isRequired,
        _removePost: func.isRequired,
        likes:       array.isRequired,
        id:          string.isRequired,
    };

    _removePost = () => {
        const { id } = this.props;
        this.props._removePost(id);
    }

    render () {
        const { comment, created, id, likes, _likePost, avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { Styles.post } >
                <span
                    className = { Styles.cross }
                    onClick = { this._removePost }
                />
                <img src = { avatar }/>
                <a>{` ${ currentUserFirstName } ${ currentUserLastName } `}</a>
                <time>{moment(created).format('MMMM D h:mm:ssa')}</time>
                <p>{ comment }</p>
                <Like
                    _likePost = { _likePost }
                    id = { id }
                    likes = { likes }
                />
            </section>
        )
    }
}
