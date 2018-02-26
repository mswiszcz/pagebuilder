// @flow
import React, { Component } from 'react';

import { Link } from 'react-router';
import styles from './Button.css';

export default class Button extends Component {
  render() {
    const { tooltip, icon, to, activeRoute } = this.props;
    const active = activeRoute == to ? 'active' : '';

    return (
      <Link to={to}>
        <div className={[styles.button, styles[active]].join(' ')}>
          <i className={`fa fa-${icon}`} />
          <div className={styles.tooltip}>{ tooltip }</div>
        </div>
      </Link>
    );
  }
}
