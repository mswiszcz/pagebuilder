// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './DeployPage.css';

import DefaultKeyboardEvents from '../utils/DefaultKeyboardEvents';

export default class DeployPage extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyboardListener, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyboardListener, false);
  }

  keyboardListener = (event) => {
    DefaultKeyboardEvents.call(this.props.router, event);
  }

  render() {
    return (
      <main className={styles.main}>
        <div className={styles.content}>Deploy</div>
      </main>
    );
  }
}
