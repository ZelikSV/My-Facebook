import React, { Component } from 'react';
import { withProfile } from '../HOC/withProfile';
import {func, string } from 'prop-types';

// Instruments
import Styles from './styles.m.css';

export class Composer extends Component {
    static propTypes = {
        _createPost:          func.isRequired,
        avatar:               string.isRequired,
        currentUserFirstName: string.isRequired,
    };

    state = {
        comment: '',
    }

    _updateComment = (event) => {
        this.setState({
            comment: event.target.value,
        });
    }

    _handleFormSubmit = (event) => {
        event.preventDefault();
        this._submitComment();
    }

    _submitComment = () => {
        const { comment } = this.state;
        if (comment === '' || comment === ' ') {
            return null;
        }
        this.props._createPost(comment);

        this.setState({
            comment: '',
        });
    }

    _submitOnEnter = (event) => {
        const enterKey = event.key === 'Enter';
        if (enterKey) {
            this._submitComment();
            event.preventDefault();
        }
    }

    render () {
        const { comment } = this.state;
        const { avatar, currentUserFirstName} = this.props;

        return (
            <section className = { Styles.composer }>
                <img src = {  avatar }/>
                <form
                    onKeyPress = { this._submitOnEnter }
                    onSubmit   = { this._handleFormSubmit }>
                    <textarea
                        placeholder = { `Whats your problem ${ currentUserFirstName}?` }
                        value = { comment }
                        onChange = { this._updateComment }
                    />
                    <input
                        type = 'submit'
                        value = 'POST'
                    />
                </form>
            </section>
        );
    }
}

export default withProfile(Composer);
