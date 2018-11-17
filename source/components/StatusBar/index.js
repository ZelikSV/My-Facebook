import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';

import { Consumer } from '../HOC/withProfile';


export default class StatusBar extends Component{
    render(){
    		const {
            currentUserFirstName,
            currentUserLastName,
            avatar
        } = this.props;
        return(
            <Consumer>
                {
                    (context)=>
                        (
                            <section className = { Styles.statusBar }>
                                <button>
                                    <img src = { context.avatar }/>
                                    <span>{ context.currentUserFirstName }</span>
                                    &nbsp;
                                    <span>{ context.currentUserLastName }</span>
                                </button>
                            </section>
                        )
                }
            </Consumer>
        )
    }
}