// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ServerForm from '../../components/Server/Form';
import * as ServerActions from '../../actions/server';

function mapStateToProps(state) {
  return {
    servers: state.servers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ServerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerForm);
