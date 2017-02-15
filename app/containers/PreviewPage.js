import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SitePreview from '../components/SitePreview';
import * as FileActions from '../actions/file';

function mapStateToProps(state) {
  return {
    files: state.files
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(FileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SitePreview);
