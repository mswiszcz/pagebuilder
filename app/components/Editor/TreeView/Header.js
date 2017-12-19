// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Header.css';

export default class Header extends Component {
  render() {
    const { currentProject } = this.props;

    return (
      <header className={styles.header}>
        <div className={styles.project}>
          <img className={styles.icon} src={require('../../../../resources/animals/'+ currentProject.icon + '.png')} />
          <div className={styles.title}>{ currentProject.name }</div>
        </div>
      </header>
    );
  }
}
