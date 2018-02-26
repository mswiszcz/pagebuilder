// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Card.css';

export default class Card extends Component {
  render() {
    return (
      <div className={`${styles.container} ${this.props.disabled ? styles.disabled : ''}`}>
        <div className={styles.header} style={{ backgroundColor: this.props.color }}>
          <div className={styles.actions}>
            <button className={styles.actionButton} onClick={this.props.deleteAction}><i className="fa fa-remove" /></button>
          </div>
        </div>
        <div className={styles.content} onClick={this.props.onClick}>

          <span className={styles.title}>{this.props.title}</span>
          <hr/>
          <span className={styles.details}>{this.props.subtitle}</span>
        </div>
      </div>
    );
  }
}
