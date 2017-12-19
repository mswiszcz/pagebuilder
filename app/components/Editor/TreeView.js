// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './TreeView.css';
import ContextMenu from '../common/ContextMenu';
import * as beautify from 'js-beautify';

import { File } from './../../model/file';
import Header from './TreeView/Header';
import List from './TreeView/List';
import FileModal from './TreeView/FileModal';

export default class TreeView extends Component {
  state = {
    showModal: false,
    showContextMenu: false
  }

  newFile = () => {
    let file = new File(null, '', '', 'html');

    this.setState({
      showModal: true,
      modalHeader: `Enter name for new file:`,
      focusFile: file,
    })
  }

  renameFile = (file) => {
    this.setState({
      showModal: true,
      modalHeader: `Enter new name for ${file.name}:`,
    })
  }

  toggleContextMenu = (event, file) => {
    this.setState({
      contextMenuX: event.clientX,
      contextMenuY: event.clientY,
      showContextMenu: true,
      focusFile: file
    });
  }

  hideContextMenu = () => {
    this.setState({ showContextMenu: false });
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  render() {
    const { currentProject, treeFiles, currentFile } = this.props;

    return (
      <div className={styles.component}>
        <Header currentProject={currentProject} />

        <div className={styles.content}>
          <List currentFile={currentFile}
                files={treeFiles}
                filetype='html'
                header='Source'
                openFile={this.props.openFile}
                newFile={this.newFile}
                onContextMenu={this.toggleContextMenu}
          />

          { this.state.showModal &&
              <FileModal  file={this.state.focusFile}
                          header={this.state.modalHeader}
                          onSubmit={this.props.saveFile}
                          onClose={this.hideModal}
                        /> }

          { this.state.showContextMenu &&
              <ContextMenu  onBlur={this.hideContextMenu} x={this.state.contextMenuX} y={this.state.contextMenuY}
                            actions={{
                              openFile: {
                                title: 'Open File',
                                action: () => { this.props.openFile(this.state.focusFile) }
                              },
                              renameFile: {
                                title: 'Rename file',
                                action: () => { this.renameFile(this.state.focusFile) }
                              },
                              deleteFile: {
                                title: 'Delete file',
                                action: () => { this.props.deleteFile(this.state.focusFile) }
                              }
                            }}
                        /> }
        </div>
      </div>
    );
  }
}
