import React, { Component } from 'react';
import cx from 'classnames';
// Instruments
import Styles from './styles.m.css';
import { withProfile } from '../HOC/withProfile';
import { socket } from 'socket/init';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
import { Link } from 'react-router-dom';

@withProfile class StatusBar extends Component {
    state = {
        online: false,
    };

    componentDidMount = () => {
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });
        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });
    }

    componentWillUnmount () {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }
    _loginOut = () => {
        this.props._loginOut();
    }
    _animateStatusBarEnter = (statusbar) => {
        fromTo(statusbar, 1,
            { opacity: 0 },
            { opacity: 1 });
    }

    render () {
        const { avatar, currentUserFirstName } = this.props;
        const { online } = this.state;
        const statusStyle = cx(Styles.status, {
            [ Styles.online ]:  online,
            [ Styles.offline ]: !online,
        });
        const statusMessage = online ? 'Online' : 'Offline';

        return (
            <Transition
                appear
                in
                timeout = { 1000 }
                onEnter = { this._animateStatusBarEnter }>
                <section className = { Styles.statusBar }>
                    <div className = { statusStyle }>
                        <div>
                            { statusMessage }
                        </div>
                        <span />
                    </div>
                    <Link to = '/profile'>
                        <img src = { avatar }/>
                        <span>{ currentUserFirstName }</span>
                    </Link>
                    <Link to = '/feed'>Feed</Link>
                    <button onClick = { this._loginOut } >Exit</button>
                </section>
            </Transition>
        );
    }
}

export default StatusBar;
