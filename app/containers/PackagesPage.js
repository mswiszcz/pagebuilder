import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Packages from '../components/Packages';
import Sidebar from '../components/common/Sidebar';
import { Footer, FooterContainer, FooterElement } from '../components/common/Footer';
import GatsbyStatus from '../components/common/GatsbyStatus';

import * as PackageActions from '../actions/package';
import * as GatsbyActions from '../actions/gatsby';
import styles from './index.css';

function mapStateToProps(state) {
  return {
    installedPackages: state.installedPackages,
    gatsbyStatus: state.gatsbyStatus,
    gatsbyDevelopProcess: state.gatsbyDevelopProcess
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...PackageActions, ...GatsbyActions }, dispatch);
}

class PackagesPage extends Component {
  render() {
    const activeRoute = this.props.router.getCurrentLocation().pathname;
    const { installedPackages, installPackage, uninstallPackage, updatePackage, fetchInstalledPackages } = this.props;

    return (
      <div>
        <div className={styles.content}>
          <Packages installedPackages={installedPackages}
                    installPackage={installPackage}
                    uninstallPackage={uninstallPackage}
                    updatePackage={updatePackage}
                    fetchInstalledPackages={fetchInstalledPackages}
                    router={this.props.router} />

          <Sidebar activeRoute={activeRoute} />
        </div>

        <Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(PackagesPage);
