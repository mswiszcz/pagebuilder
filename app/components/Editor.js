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
              { currentFile && <div>
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
