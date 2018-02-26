  // @flow

import React, { Component } from 'react';
import styles from './Editor.css';

import TreeView from './Editor/TreeView';
import CodeEditor from './Editor/CodeEditor';
import EmptySpaceSlider from './Editor/EmptySpaceSlider';
import Tabs from './Editor/Tabs';

import DefaultKeyboardEvents from '../utils/DefaultKeyboardEvents';

export default class Editor extends Component {
  constructor(props) {
    super(props);

    if (!this.props.currentProject.id) {
      this.props.router.push('/')
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyboardListener, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyboardListener, false);
  }

  keyboardListener = (event) => {
    const { currentFile, files, openFile, closeFile, saveFile } = this.props;

    if (event.metaKey) {
      if (!event.ctrlKey && event.keyCode >= 48 && event.keyCode <= 57) {
        this.switchToTab(event.keyCode - 48);
        return;
      }

      if (event.key == 'w') {
        closeFile(currentFile);
        return;
      }

      if (event.key == 's') {
        saveFile(currentFile);
        return;
      }
    }

    DefaultKeyboardEvents.call(this.props.router, event);
  }

  switchToTab(tabNumber) {
    if (this.props.files.length == 0) { return; }

    if (this.props.files.length >= tabNumber) {
      if (tabNumber == 0)
        this.props.openFile(this.props.files[this.props.files.length - 1]);
      else
        this.props.openFile(this.props.files[tabNumber - 1]);
    }
  }

  render() {
    let activeRoute = this.props.router.getCurrentLocation().pathname;
    const { currentProject, treeFiles, files, currentFile,
            createFile, saveFile, deleteFile, openFile, renameFile, updateFile, closeFile,
            expandDirectory, closeDirectory } = this.props;

    return (
      <main className={styles.main}>
        <TreeView currentProject={currentProject}
                  currentFile={currentFile}
                  treeFiles={treeFiles}
                  createFile={createFile}
                  saveFile={saveFile}
                  deleteFile={deleteFile}
                  openFile={openFile}
                  renameFile={renameFile}
                  expandDirectory={expandDirectory}
                  closeDirectory={closeDirectory}
                />

        <div className={styles.mainContent}>
          { currentFile ? <Tabs files={files} currentFile={currentFile} openFile={openFile} closeFile={closeFile} /> : '' }
          { currentFile ? <CodeEditor currentFile={currentFile}
                                      saveFile={saveFile}
                                      updateFile={updateFile}
                                      />
                        : <EmptySpaceSlider />
          }
        </div>
      </main>
    );
  }
}
