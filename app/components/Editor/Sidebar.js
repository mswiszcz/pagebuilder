// @flow
import React, { Component } from 'react';
import Button from './Sidebar/Button';
import styles from './Sidebar.css';

export default class Sidebar extends Component {
  render() {
    const { activeRoute } = this.props;

    return (
      <div className={styles.component}>
        <Button to='/' icon='cube' tooltip='Projects' activeRoute={activeRoute} />

        <hr />

        <Button to='/editor' icon='code' tooltip='Code editor' activeRoute={activeRoute} />
        <Button to='/preview' icon='desktop' tooltip='Preview website' activeRoute={activeRoute} />

        <Button to='#' icon='book' tooltip='Snippets' activeRoute={activeRoute} />
        <Button to='#' icon='check-square-o' tooltip='Todo' activeRoute={activeRoute} />

        <hr />

        <Button to='#' icon='cloud-upload' tooltip='Deploy' activeRoute={activeRoute} />
      </div>
    );
  }
}
