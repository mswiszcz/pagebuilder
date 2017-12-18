// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './List.css';
import { File } from '../../../model/file';
import { Directory } from '../../../model/directory';

export default class List extends Component {
  render() {
    const { files, header, openFile, newFile } = this.props;

    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>{ header }</span>
          <i className="fa fa-plus-circle" onClick={() => { newFile() }} />
        </div>

        <ul className={styles.list}>
          { files.length <= 0 && <div className={styles.listEmpty}>Empty</div> }

          { files.map((file, i) => {
            const className = this.isCurrentFile(file) ? 'active' : '';

            return this.isDirectory(file) ? this.directoryItem(file, i, className) : this.fileItem(file, i, className);
          })}
        </ul>
      </div>
    );
  }

  isDirectory(file) {
    return file instanceof Directory;
  }

  isCurrentFile(file) {
    const { currentFile } = this.props;

    return (currentFile && file.id == currentFile.id && file.type == currentFile.type);
  }

  fileItem(file, i, className) {
    const { openFile, onContextMenu } = this.props;

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
  }

  directoryItem(directory, i, className) {
    const { openFile, onContextMenu } = this.props;

    return (
      <li className={styles[className]}
          key={`tree-item-${i}`}
          onClick={() => { }}
          onContextMenu={(e) => { e.preventDefault(); onContextMenu(e, directory) }}
      >
        <span>{ directory.name }</span>
      </li>
    )
  }
}
