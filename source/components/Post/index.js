import React, { Component } from 'react';

// Instruments
import avatar from 'theme/assets/lisa';
import Styles from './styles.m.css';
import moment from 'moment';

export default class Post extends Component{
    render(){
        return(
         
        <section className = { Styles.post }>
            <img src = { avatar }/>
            <a>Lisa Simpson</a>
            <time>{moment().format('MMMM D h:mm:ss a')}</time>
            <p>How are you Lisa?</p>
        </section>            
        )
    }
}