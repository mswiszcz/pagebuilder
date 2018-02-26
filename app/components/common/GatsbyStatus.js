// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './GatsbyStatus.css';

import { STATUS } from '../../reducers/gatsby';

export default class GatsbyStatus extends Component {
  toggleServer = () => {
    if (this.props.gatsbyStatus == STATUS.IDLE) {
      this.props.gatsbyDevelopStart();
    } else {
      this.props.gatsbyDevelopStop();
    }
  }

  render() {
    const { gatsbyMessage } = this.props;
    let status, statusIndicatorClass;

    switch (this.props.gatsbyStatus) {
      case STATUS.WORKING:
        status = 'Starting';
        statusIndicatorClass = styles.working;
        break;
      case STATUS.ERROR:
        status = 'Error';
        statusIndicatorClass = styles.error;
        break;
      case STATUS.RUNNING:
        status = 'Running';
        statusIndicatorClass = styles.running;
        break;
      default:
        status = 'Idle';
        statusIndicatorClass = styles.idle;
        break;
    }

    return (
      <div className={styles.gatsbyStatus} onClick={this.toggleServer}>
        <span>{ `Gatsby server status: ${status}. ${gatsbyMessage}` }</span>
        <i className={styles.statusIndicator + ' ' + statusIndicatorClass} />
      </div>
    );
  }
}
