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

  componentDidMount() {
    console.log('site');
    window.addEventListener('keydown', this.keyboardListener, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyboardListener, false);
  }

  keyboardListener = (event) => {
    if (event.metaKey) {
      if (event.keyCode >= 48 && event.keyCode <= 57) { this.switchToMode(event.keyCode - 48); }

      if (event.key == 'e') {
        this.props.router.push(`/editor`);
      }

      if (event.key == 'l') {
        console.log('switch to deploy');
      }
    }
  }

  switchToMode(modeNumber) {
    // TODO
    console.log('mode ' + modeNumber);
  }

  resizeIframe = (e) => {
    const value = this.responsiveModes[parseInt(e.target.value)];

    this.setState({
      iframeWidth: value[0],
      iframeHeight: value[1]
    });
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
    const iframeWidth = responsiveMode ? landscapeMode ? this.state.iframeHeight : this.state.iframeWidth : '100%';
    const iframeHeight = responsiveMode ? landscapeMode ? this.state.iframeWidth : this.state.iframeHeight : '95%';
    let activeRoute = this.props.router.getCurrentLocation().pathname;

    return (
      <main className={styles.main}>
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
            <iframe width={iframeWidth} scrolling="auto" height={iframeHeight} src="http://localhost:8000" frameBorder="0">
            </iframe>
          </div>
        </div>

        <Sidebar activeRoute={activeRoute} />
      </main>
    );
  }
}
