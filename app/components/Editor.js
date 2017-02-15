  // @flow

import React, { Component } from 'react';
import styles from './Editor.css';

import TreeView from './Editor/TreeView';
import CodeEditor from './Editor/CodeEditor';
import Sidebar from './Editor/Sidebar';
import EmptySpaceSlider from './Editor/EmptySpaceSlider';

export default class Editor extends Component {
  constructor(props) {
    super(props);

    if (!this.props.currentProject.id) {
      this.props.router.push('/')
    }
  }

  render() {
    let activeRoute = this.props.router.getCurrentLocation().pathname;
    const { currentProject, files, currentFile } = this.props;

    return (
      <main className={styles.container}>
        <TreeView currentProject={currentProject}
                  currentFile={currentFile}
                  files={files}
                  createFile={this.props.createFile}
                  saveFile={this.props.saveFile}
                  deleteFile={this.props.deleteFile}
                  openFile={this.props.openFile}
                  renameFile={this.props.renameFile}
                />

        { currentFile ? <CodeEditor currentFile={currentFile}
                                    saveFile={this.props.saveFile}
                                    updateFile={this.props.updateFile}
                                    />
                      : <EmptySpaceSlider />
        }

        <Sidebar activeRoute={activeRoute} />
      </main>
    );
  }
}
