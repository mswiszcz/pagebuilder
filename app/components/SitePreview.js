// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './SitePreview.css';
import Sidebar from './Editor/Sidebar';

export default class SitePreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responsiveMode: false,
      landscapeMode: false,
      iframeWidth: '320',
      iframeHeight: '480'
    }

    this.responsiveModes = [
      ['320', '480'],
      ['360', '640'],
      ['768', '1024'],
      ['800', '1280'],
      ['980', '1280'],
      ['1280', '600'],
      ['1920', '900'],
    ]
  }

  head = () => {
    return '';
  }

  scripts = () => {
    return this.props.files.js.map((element) => {
      return element.content
    }).join('');
  }

  styles = () => {
    return this.props.files.css.map((element) => {
      return element.content
    }).join('');
  }

  body = () => {
    return this.props.files.html.map((element) => {
      return element.content
    }).join('');
  }

  resizeIframe = (e) => {
    const value = this.responsiveModes[parseInt(e.target.value)];

    this.setState({
      iframeWidth: value[0],
      iframeHeight: value[1]
    });
  }

  iframeCode = () => {
    return (
      `<html>
        <head>
          ${ this.head() }
          <style>${ this.styles() }</style>
        </head>
        <body>
          ${ this.body() }

          <script type='text/javascript'>${ this.scripts() }</script>
        </body>
      </html>`
    );
  }

  toggleLandscapeMode = () => {
    this.setState({ landscapeMode: !this.state.landscapeMode });
  }

  toggleResponsiveMode = () => {
    this.setState({ responsiveMode: !this.state.responsiveMode });
  }

  render() {
    const { landscapeMode, responsiveMode } = this.state;

    const landscapeToggleClass = landscapeMode ? [styles.responsiveRotate, styles.responsiveRotateActive].join(' ') : styles.responsiveRotate;
    const responsiveToggleClass = responsiveMode ? [styles.responsiveToggle, styles.responsiveToggleActive].join(' ') : styles.responsiveToggle;
    const responsiveIframeClass = responsiveMode ? [styles.previewIframe, styles.previewIframeResponsive].join(' ') : styles.previewIframe;
    const iframeWidth = responsiveMode ? landscapeMode ? this.state.iframeHeight : this.state.iframeWidth : '100%';
    const iframeHeight = responsiveMode ? landscapeMode ? this.state.iframeWidth : this.state.iframeHeight : '100%';
    let activeRoute = this.props.router.getCurrentLocation().pathname;

    return (
      <main className={styles.container}>
        <div className={styles.preview}>
          <div className={styles.previewToolbar}>
            <button className={responsiveToggleClass} title='Toggle Responsive Mode' onClick={this.toggleResponsiveMode}>
              <i className="fa fa-clone" />
            </button>
            <select disabled={!this.state.responsiveMode} onChange={this.resizeIframe} className={styles.responsiveSelect} title='Select responsive size'>
              { this.responsiveModes.map((mode, i) => {
                  let val = this.state.landscapeMode ?  `${mode[1]}x${mode[0]}` : `${mode[0]}x${mode[1]}`;
                  return (<option key={`responsive-mode-${i}`} value={i}>{val}</option>)
              })}
            </select>
            <button disabled={!this.state.responsiveMode} className={landscapeToggleClass} onClick={this.toggleLandscapeMode} title='Rotate'>
              <i className="fa fa-mobile-phone" />
            </button>
          </div>

          <div className={styles.iframeContainer}>
            <iframe width={iframeWidth} height={iframeHeight} src="http://localhost:8000" frameBorder="0">
            </iframe>
          </div>
        </div>

        <Sidebar activeRoute={activeRoute} />
      </main>
    );
  }
}
