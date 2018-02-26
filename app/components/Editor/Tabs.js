// @flow
import React, { Component } from 'react';
import styles from './Tabs.css';

export default class Tabs extends Component {
  render() {
    const { files, currentFile, openFile, closeFile } = this.props;

    return (
      <div className={styles.component}>
        { files.map((file, i) => {
          let className = styles.tab;
          if (file.fullPath() == currentFile.fullPath()) { className += ' ' + styles.activeTab; }

          return (
            <div key={`tab-${i}`} className={className} onClick={() => { openFile(file) }}>
              <span>{ file.name }</span>
              { file.updated && <i className={styles.statusInfo} /> }
              <i className="fa fa-close" onClick={(e) => { e.stopPropagation(); closeFile(file) }} />
            </div>
          )
          })
        }
      </div>
    );
  }
}
