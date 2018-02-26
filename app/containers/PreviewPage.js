import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as GatsbyActions from '../actions/gatsby';

import SitePreview from '../components/SitePreview';
import Sidebar from '../components/common/Sidebar';
import { Footer, FooterContainer, FooterElement } from '../components/common/Footer';
import GatsbyStatus from '../components/common/GatsbyStatus';

import styles from './index.css';

function mapStateToProps(state) {
  return {
    gatsbyStatus: state.gatsbyStatus,
    gatsbyDevelopProcess: state.gatsbyDevelopProcess
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GatsbyActions, dispatch);
}

class PreviewPage extends Component {
  render() {
    const activeRoute = this.props.router.getCurrentLocation().pathname;

    return (
      <div>
        <div className={styles.content}>
          <SitePreview />
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

export default connect(mapStateToProps, mapDispatchToProps)(PreviewPage);
