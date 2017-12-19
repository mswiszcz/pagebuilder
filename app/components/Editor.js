  // @flow

import React, { Component } from 'react';
import styles from './Editor.css';

import TreeView from './Editor/TreeView';
import CodeEditor from './Editor/CodeEditor';
import Sidebar from './Editor/Sidebar';
import EmptySpaceSlider from './Editor/EmptySpaceSlider';
import Tabs from './Editor/Tabs';

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
    if (event.metaKey) {
      if (event.keyCode >= 48 && event.keyCode <= 57) { this.switchToTab(event.keyCode - 48); }

      if (event.key == 'w') {
        // TODO
        console.log('close');
      }

      if (event.key == 's') {
        // TODO
        console.log('save');
      }

      if (event.key == 'b') {
        this.props.router.push(`/preview`);
      }

      if (event.key == 'l') {
        // TODO
        console.log('switch to deploy');
      }
    }
  }

  switchToTab(tabNumber) {
    // TODO
    console.log('switch to ' + tabNumber);
  }

  render() {
    let activeRoute = this.props.router.getCurrentLocation().pathname;
    const { currentProject, treeFiles, files, currentFile } = this.props;

    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <TreeView currentProject={currentProject}
                    currentFile={currentFile}
                    treeFiles={treeFiles}
                    createFile={this.props.createFile}
                    saveFile={this.props.saveFile}
                    deleteFile={this.props.deleteFile}
                    openFile={this.props.openFile}
                    renameFile={this.props.renameFile}
                  />

          <div className={styles.mainContent}>
            <Tabs files={files} currentFile={currentFile} openFile={this.props.openFile}/>
            { currentFile ? <CodeEditor currentFile={currentFile}
                                        saveFile={this.props.saveFile}
                                        updateFile={this.props.updateFile}
                                        />
                          : <EmptySpaceSlider />
            }
          </div>

          <Sidebar activeRoute={activeRoute} />
        </main>

        <div className={styles.footer}>
          <div className={styles.footerContent}>
              { currentFile && <div className={styles.footerContent}>
                <div className={styles.footerElement}>{ currentFile.shortenedPath() }</div>
                <div className={styles.footerElement}>{ currentFile.updated ? 'Updated' : 'Saved' }</div>
              </div>
            }
          </div>
          <div className={styles.footerContent}>
            <div className={styles.footerElement}>
              <span>Gatsby server status + last operation</span>
              <i />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
