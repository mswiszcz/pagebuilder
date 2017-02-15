// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Notification.css';

export default class Notification extends Component {

  render() {
    const { acceptMessage, dismissMessage, message, accept, dismiss } = this.props;

    return (
      <div className={styles.content} onClick={(e) => { e.stopPropagation() }}>
        <div>{message}</div>
        <div className={styles.actions}>
          <button className={styles.ghostButton} onClick={accept}>{acceptMessage}</button>
          <button className={styles.linkButton} onClick={dismiss}>{dismissMessage}</button>
        </div>
      </div>
    );
  }
}
