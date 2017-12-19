import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Editor from '../components/Editor';
import * as FileActions from '../actions/file';

function mapStateToProps(state) {
  return {
    treeFiles: state.treeFiles,
    currentProject: state.currentProject,
    files: state.files,
    currentFile: state.currentFile
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
