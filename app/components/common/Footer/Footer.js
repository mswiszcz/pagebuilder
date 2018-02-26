// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className={styles.footer}>
        { this.props.children }
      </div>
    );
  }
}
