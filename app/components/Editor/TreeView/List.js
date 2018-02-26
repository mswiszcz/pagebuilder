// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './List.css';
import { File } from '../../../model/file';
import { Directory } from '../../../model/directory';

export default class List extends Component {
  render() {
    const { files, header, openFile, newFile, currentProject } = this.props;

    return (
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span>{ header }</span>
          <i className="fa fa-plus-circle" onClick={() => { newFile(currentProject.getDirectory()) }} />
        </div>

        <ul className={styles.list}>
          { this.renderFiles(files) }
        </ul>
      </div>
    );
  }

  renderFiles(files) {
    if (files.length <= 0) {
      return (<div className={styles.listEmpty}>Empty</div>);
    } else {
      return files.map((file, i) => {
        const className = !this.isDirectory(file) && this.isCurrentFile(file) ? 'active' : '';

        return this.isDirectory(file) ? this.directoryItem(file, i, className) : this.fileItem(file, i, className);
      });
    }
  }

  isDirectory(file) {
    return file instanceof Directory;
  }

  isCurrentFile(file) {
    const { currentFile } = this.props;

    return (currentFile && file.fullPath() == currentFile.fullPath() && file.type == currentFile.type);
  }

  toggleDirectory(directory) {
    const { expandDirectory, closeDirectory } = this.props;

    if (directory.expanded) {
      closeDirectory(directory);
    } else {
      expandDirectory(directory);
    }
  }

  fileItem(file, i, className) {
    const { openFile, onContextMenu } = this.props;
    const icon = file.icon();

    return (
      <li className={styles[className]}
          key={`tree-item-${i}`}
          onContextMenu={(e) => { e.preventDefault(); onContextMenu(e, file) }}
      >
        <div className={styles.item} onClick={() => { openFile(file) }}>
          <i className={`${styles.icon} ${styles.fileIcon} fa fa-file`} />
          <span className={styles.itemName}>{ file.name }</span>
          { file.updated && <i className={styles.statusIndicator} />}
        </div>
      </li>
    )
  }

  directoryItem(directory, i, className) {
    const { openFile, onContextMenu } = this.props;

    return (
      <li className={styles[className]}
          key={`tree-item-${i}`}
          onContextMenu={(e) => { e.preventDefault(); }}
      >
        <div className={styles.item} onClick={() => { this.toggleDirectory(directory) }}>
          <i className={`fa fa-folder ${styles.icon} ${styles.directoryIcon}`} />
          <span className={styles.itemName}>{ directory.name }</span>
          { directory.expanded && <i className={`fa fa-plus-circle ${styles.addIcon}`} onClick={(e) => { e.stopPropagation(); this.dirAddFileIconClick(directory)  }} /> }
        </div>
        { directory.expanded &&
          <ul className={styles.list}>
            { this.renderFiles(directory.files) }
          </ul>
        }
      </li>
    )
  }

  dirAddFileIconClick(directory) {
    const { newFile } = this.props;

    newFile(directory);
  }
}
