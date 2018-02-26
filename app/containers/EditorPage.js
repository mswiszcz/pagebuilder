import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as FileActions from '../actions/file';
import * as GatsbyActions from '../actions/gatsby';
import * as TreeActions from '../actions/tree';

import Editor from '../components/Editor';
import Sidebar from '../components/common/Sidebar';
import { Footer, FooterContainer, FooterElement } from '../components/common/Footer';
import GatsbyStatus from '../components/common/GatsbyStatus';

import styles from './index.css'

import { STATUS } from '../reducers/gatsby';

function mapStateToProps(state) {
  return {
    treeFiles: state.treeFiles,
    currentProject: state.currentProject,
    files: state.files,
    currentFile: state.currentFile,
    gatsbyStatus: state.gatsbyStatus,
    gatsbyDevelopProcess: state.gatsbyDevelopProcess
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...FileActions, ...TreeActions, ...GatsbyActions }, dispatch);
}

class EditorPage extends Component {
  componentDidMount() {
    if (this.props.gatsbyStatus.develop == STATUS.IDLE)
      this.props.gatsbyDevelopStart();
  }

  render() {
    const activeRoute = this.props.router.getCurrentLocation().pathname;
    const { currentProject, treeFiles, files, currentFile,
            createFile, saveFile, deleteFile, openFile, renameFile, updateFile, closeFile,
            expandDirectory, closeDirectory } = this.props;

    return (
      <div>
        <div className={styles.content}>
          <Editor currentProject={currentProject}
                  treeFiles={treeFiles}
                  files={files}
                  currentFile={currentFile}
                  createFile={createFile}
                  saveFile={saveFile}
                  deleteFile={deleteFile}
                  openFile={openFile}
                  renameFile={renameFile}
                  updateFile={updateFile}
                  closeFile={closeFile}
                  expandDirectory={expandDirectory}
                  closeDirectory={closeDirectory}
                  router={this.props.router} />

          <Sidebar activeRoute={activeRoute} />
        </div>

        <Footer>
          { currentFile && <FooterContainer>
            <FooterElement>{ currentFile.shortenedPath() }</FooterElement>
            <FooterElement>{ currentFile.updated ? 'Updated' : 'Saved' }</FooterElement>
          </FooterContainer> }

          <FooterContainer>
            <FooterElement>
              <GatsbyStatus gatsbyStatus={this.props.gatsbyStatus.develop}
                            gatsbyMessage={this.props.gatsbyStatus.developMessage}
                            gatsbyDevelopStart={this.props.gatsbyDevelopStart}
                            gatsbyDevelopStop={this.props.gatsbyDevelopStop}
                          />
            </FooterElement>
          </FooterContainer>
        </Footer>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
