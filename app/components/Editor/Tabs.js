// @flow
import React, { Component } from 'react';
import styles from './Tabs.css';

export default class Tabs extends Component {
  render() {
    const { files, currentFile, openFile } = this.props;

    return (
      <div className={styles.component}>
        { files.map((file) => {
          let className = styles.tab;
          if (file == currentFile) { className += ' ' + styles.activeTab; }

          return (
            <div className={className} onClick={() => { openFile(file) }}>
              <span>{ file.name }</span>
            </div>
          )
          })
        }
      </div>
    );
  }
}
