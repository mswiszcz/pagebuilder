// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as ProjectActions from '../actions/project';
import * as ServerActions from '../actions/server';

function mapStateToProps(state) {
  return {
    projects: state.projects,
    servers: state.servers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ProjectActions, ...ServerActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
