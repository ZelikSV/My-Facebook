import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';


export default class Composer extends Component{
    render(){
            const {
            currentUserFirstName,
            currentUserLastName,
            avatar
        } = this.props;
        return(
            <section className = { Styles.composer }>
                <img src = { avatar }/>
                <form>
                    <textarea placeholder = { `Whats your problem ${currentUserFirstName}?` } />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
            
        )
    }
}