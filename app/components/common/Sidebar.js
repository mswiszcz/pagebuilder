// @flow
import React, { Component } from 'react';

import Button from './Sidebar/Button';
import styles from './Sidebar.css';

export default class Sidebar extends Component {
  render() {
    const { activeRoute } = this.props;

    return (
      <div className={styles.component}>
        <Button to='/' icon='th' tooltip='Projects' activeRoute={activeRoute} />

        <hr />

        <Button to='/editor' icon='code' tooltip='Code editor' activeRoute={activeRoute} />
        <Button to='/preview' icon='desktop' tooltip='Preview website' activeRoute={activeRoute} />
        <Button to='/packages' icon='cubes' tooltip='Package Installer' activeRoute={activeRoute} />
      </div>
    );
  }
};
