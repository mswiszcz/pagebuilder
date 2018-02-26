// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Header.css';

export default class Header extends Component {
  render() {
    const { title, subtitle, backButtonVisible, backButtonPath, actionsVisible } = this.props;

    return (
      <div className={styles.header}>
        <div>
          <div className={styles.header}>
            { backButtonVisible && <div className={styles.goBack}>
              <Link to={backButtonPath}>
                <i className="fa fa-arrow-left" />
              </Link>
            </div> }

            <div>
              <div className={styles.headerTitle}>{title}</div>
              <div className={styles.headerSubtitle}>{ subtitle }</div>
            </div>
          </div>
        </div>

        { actionsVisible && <div className={styles.actions}>
          <Link to='/projects/new'>
            <div className={styles.newProjectButton}> New Project </div>
          </Link>
          {/* <Link to='/servers/new'>
            <div className={styles.newProjectButton}> New Server </div>
          </Link> */}
        </div> }
      </div>
    );
  }
}
