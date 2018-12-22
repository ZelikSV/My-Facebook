import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';


// Components
import { withProfile } from '../HOC/withProfile';


@withProfile class Profile extends Component {

    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { Styles.profile }>
                <h1> Welocme, { currentUserFirstName } { currentUserLastName }</h1>
                <img src = { avatar }/>
            </section>
        );
    }
}

export default Profile;
