// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './List.css';

export default class List extends Component {
  render() {
    const { files, filetype, header, openFile, newFile, currentFile, onContextMenu } = this.props;

    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>{ header }</span>
          <i className="fa fa-plus-circle" onClick={() => { newFile(filetype) }} />
        </div>

        <ul className={styles.list}>
          { files.length <= 0 && <div className={styles.listEmpty}>Empty</div> }

          { files.map((file, i) => {
            const className = (currentFile && file.id == currentFile.id && file.type == currentFile.type) ? 'active' : '';

            return (
              <li className={styles[className]}
                  key={`tree-item-${i}`}
                  onClick={() => { openFile(file) }}
                  onContextMenu={(e) => { e.preventDefault(); onContextMenu(e, file) }}
              >
                <span>{ file.name }</span>
                { file.updated && <i className={styles.statusIndicator} />}
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}
