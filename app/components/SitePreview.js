// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './SitePreview.css';
import Sidebar from './common/Sidebar';

import DefaultKeyboardEvents from '../utils/DefaultKeyboardEvents';

export default class SitePreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      responsiveMode: false,
      landscapeMode: false,
      size: 0
    }

    this.responsiveSizes = [
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
    window.addEventListener('keydown', this.keyboardListener, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyboardListener, false);
  }

  keyboardListener = (event) => {
    const { currentFile, files, openFile, closeFile } = this.props;

    if (event.metaKey) {
      if (!event.ctrlKey && event.keyCode >= 48 && event.keyCode <= 57) {
        this.switchToSize(event.keyCode - 48);
        return;
      }

      if (event.key == 'k') {
        this.toggleResponsiveMode();
        return;
      }

      if (event.key == 'l') {
        this.toggleLandscapeMode();
        return;
      }
    }

    DefaultKeyboardEvents.call(this.props.router, event);
  }

  resizeIframe = (sizeNumber) => {
    this.setState({ size: sizeNumber, responsiveMode: true });
  }

  switchToSize(sizeNumber) {
    if (sizeNumber >= this.responsiveSizes.length) { sizeNumber = this.responsiveSizes.length - 1 }
    this.resizeIframe(sizeNumber);
  }

  resizeIframeEvent = (e) => {
    this.resizeIframe(parseInt(e.target.value));
  }

  toggleLandscapeMode = () => {
    this.setState({ landscapeMode: !this.state.landscapeMode });
  }

  toggleResponsiveMode = () => {
    this.setState({ responsiveMode: !this.state.responsiveMode });
  }

  iframeWidth() {
    const { landscapeMode, responsiveMode, size } = this.state;

    if (responsiveMode) {
      return this.responsiveSizes[size][landscapeMode ? 1 : 0]
    } else {
      return '100%';
    }
  }

  iframeHeight() {
    const { landscapeMode, responsiveMode, size } = this.state;

    if (responsiveMode) {
      return this.responsiveSizes[size][landscapeMode ? 0 : 1]
    } else {
      return '95%';
    }
  }

  render() {
    const { landscapeMode, responsiveMode, size } = this.state;

    const landscapeToggleClass = landscapeMode ? [styles.responsiveRotate, styles.responsiveRotateActive].join(' ') : styles.responsiveRotate;
    const responsiveToggleClass = responsiveMode ? [styles.responsiveToggle, styles.responsiveToggleActive].join(' ') : styles.responsiveToggle;

    return (
      <main className={styles.main}>
        <div className={styles.preview}>
          <div className={styles.previewToolbar}>
            <button className={responsiveToggleClass} title='Toggle Responsive Mode' onClick={this.toggleResponsiveMode}>
              <i className="fa fa-clone" />
            </button>
            <select value={size} disabled={!this.state.responsiveMode} onChange={this.resizeIframeEvent} className={styles.responsiveSelect} title='Select responsive size'>
              { this.responsiveSizes.map((responsiveSize, i) => {
                  let val = this.state.landscapeMode ? `${responsiveSize[1]}x${responsiveSize[0]}` : `${responsiveSize[0]}x${responsiveSize[1]}`;
                  return (<option key={`responsive-size-${i}`} value={i}>{val}</option>)
              })}
            </select>
            <button disabled={!this.state.responsiveMode} className={landscapeToggleClass} onClick={this.toggleLandscapeMode} title='Rotate'>
              <i className="fa fa-mobile-phone" />
            </button>
          </div>

          <div className={styles.iframeContainer}>
            <iframe width={this.iframeWidth()}
                    height={this.iframeHeight()}
                    src="http://localhost:8000"
                    frameBorder="0"
                    scrolling="auto" />
          </div>
        </div>
      </main>
    );
  }
}
