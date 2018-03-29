// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as ProjectActions from '../actions/project';
import * as GatsbyActions from '../actions/gatsby';

function mapStateToProps(state) {
  return {
    projects: state.projects,
    gatsbyStatus: state.gatsbyStatus
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ProjectActions, ...GatsbyActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
