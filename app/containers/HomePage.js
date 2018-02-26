// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as ProjectActions from '../actions/project';
import * as ServerActions from '../actions/server';
import * as GatsbyActions from '../actions/gatsby';

function mapStateToProps(state) {
  return {
    projects: state.projects,
    servers: state.servers,
    gatsbyStatus: state.gatsbyStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ProjectActions, ...ServerActions, ...GatsbyActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
