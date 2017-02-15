// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProjectForm from '../../components/Project/Form';
import * as ProjectActions from '../../actions/project';

function mapStateToProps(state) {
  return {
    projects: state.projects
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProjectActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectForm);
