// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Modal.css';

export default class Modal extends Component {
  render() {
    return (
      <div className={styles.overlay} onClick={this.props.onClose}>
        <div className={styles.content} onClick={(e) => { e.stopPropagation() }}>
          { this.props.children }
        </div>
      </div>
    );
  }
}
