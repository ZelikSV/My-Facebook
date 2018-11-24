import React, { Component } from 'react';
import { Consumer } from '../HOC/withProfile';
// Instruments
import Styles from './styles.m.css';


export default class Composer extends Component {
    render () {
        return (
            <Consumer>
                {
                    (context)=>(
                        <section className = { Styles.composer }>
                            <img src = {  context.avatar }/>
                            <form>
                                <textarea placeholder = { `Whats your problem ${ context.currentUserFirstName}?` } />
                                <input type = 'submit' value = "Post" />
                            </form>
                        </section>
                    )
                }
            </Consumer>
        );
    }
}
