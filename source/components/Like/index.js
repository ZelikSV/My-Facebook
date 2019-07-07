// Core
import React, { Component } from 'react';
import { string, func, arrayOf, shape } from 'prop-types';
import { withProfile } from '../HOC/withProfile';
// Instruments
import Styles from './styles.m.css';
import cx from 'classnames';

@withProfile class Like extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        id:        string.isRequired,
        likes:     arrayOf(
            shape({
                id:        string.isRequired,
                firstName: string.isRequired,
                lastName:  string.isRequired,
            }),
        ).isRequired,
    };

    state = {
        showLikers: false,
    }

    _showLikers = () => {
        this.setState({
            showLikers: true,
        });
    }

    _hideLikers = () => {
        this.setState({
            showLikers: false,
        });
    }

    _likePost = () => {
        const { _likePost, id } = this.props;
        _likePost(id);
    }

    _getLikeByMe = () => {
        const { currentUserFirstName, currentUserLastName, likes} = this.props;

        return likes.some(({firstName, lastName }) => {
            return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`;
        });
    }

    _getLikeStyles = () => {
        const likeByMe = this._getLikeByMe();

        return cx(Styles.icon,
            {[ Styles.liked ]: likeByMe,
            });
    }

    _getLikeList = () => {
        const { showLikers } = this.state;
        const { likes } = this.props;

        const likesJSX = likes.map(({ firstName, lastName, id }) => {
            return <li key = { id }>{`${firstName} ${lastName}`}</li>;
        });

        return likes.length && showLikers ? <ul>{ likesJSX }</ul> : null;
    }

    _getLikesDescription = () => {
        const { likes, currentUserFirstName, currentUserLastName } = this.props;
        const likedByMe = this._getLikeByMe();

        if (likes.length === 1 && likedByMe) {
            return `${currentUserFirstName} ${currentUserLastName}`;
        } else if (likes.length === 2 && likedByMe) {
            return `You and ${likes.length - 1} other`;
        } else if (likedByMe) {
            return `You and ${likes.length - 1} other`;
        }

        return likes.length;
    }

    render () {
        const likesStyles = this._getLikeStyles();
        const likersList = this._getLikeList();
        const likesDescription = this._getLikesDescription();

        return (
            <section className = { Styles.like }>
                <span
                    className = { likesStyles }
                    onClick = { this._likePost }>Like
                </span>
                <div>
                    { likersList }
                    <span
                        onMouseEnter = { this._showLikers }
                        onMouseLeave = { this._hideLikers } >
                        { likesDescription }
                    </span>
                </div>
            </section>
        );
    }
}

export default Like;
