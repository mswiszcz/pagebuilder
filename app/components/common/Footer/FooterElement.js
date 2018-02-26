// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './FooterElement.css';

export default class FooterElement extends Component {
  render() {
    return (
      <div className={styles.footerElement}>
        { this.props.children }
      </div>
    );
  }
}
