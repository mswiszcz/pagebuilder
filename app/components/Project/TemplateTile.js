// @flow
import React, { Component } from 'react';
import styles from './Form.css';

export default class TemplateTile extends Component {
  openLink = (link) => {
    const { shell } = require('electron');
    shell.openExternal(link);
  }

  render() {
    const { active, onClick, template: { name, author, description, demo } } = this.props;

    return (
      (
        <div className={`${styles.template} ${ active && styles.active}`} onClick={onClick}>
          <div>
            <div className={styles.templateName}>{name}</div>
            <div className={styles.templateAuthor}>by {author}</div>
            <div className={styles.templateDescription}>{description}</div>
          </div>
          <div className={styles.templateDemo} onClick={() => { this.openLink(demo) }}>
            Demo
          </div>
        </div>
      )
    );
  }
}
