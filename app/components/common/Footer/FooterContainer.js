// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './FooterContainer.css';

export default class FooterContainer extends Component {
  render() {
    return (
      <div className={styles.footerContainer}>
        { this.props.children }
      </div>
    );
  }
}
