// @flow
import React, { Component } from 'react';
import styles from './PackageTile.css';

export default class PackageTile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newVersionAvailable: false,
      newVersion: 0,
      status: null
    }
  }

  componentDidMount() {
    let storedData = localStorage.getItem(`npmPackage-${this.props.name}`);

    if (storedData) {
      storedData = JSON.parse(storedData);
      let daysTillLastCheck = (Date.now() - storedData.checkedAt) / 1000 / 60 / 60 / 24;

      if (daysTillLastCheck > 1) {
        this.fetchVersionInfo();
      } else {
        this.setState({
          newVersion: storedData.version,
          newVersionAvailable: this.isNewerThanCurrent(storedData.version),
        });
      }
    } else {
      this.fetchVersionInfo();
    }
  }

  fetchVersionInfo() {
    fetch(`https://api.npms.io/v2/package/${this.props.name}`).then((response) => {
      return response.json();
    }).then((data) => {
      const newVersion = data['collected']['metadata']['version'];

      this.setState({
        newVersionAvailable: this.isNewerThanCurrent(newVersion),
        newVersion: newVersion
      });

      localStorage.setItem(`npmPackage-${this.props.name}`, JSON.stringify({
        version: newVersion,
        checkedAt: Date.now()
      }));
    }).catch(function(e) {
      console.log(e);
    });
  }

  isNewerThanCurrent(newVersion) {
    let { version } = this.props;
    let result = false;

    newVersion = newVersion.split('.');
    version = version.split('.');

    for (let i = 0; i < newVersion.length; i++) {
      result = parseInt(newVersion[i]) > parseInt(version[i]);
      if (result) { break; }
    }

    return result;
  }

  installPackage = (e) => {
    e.preventDefault();
    this.setState({ status: 'Installing' });
    this.props.installPackage(this.props.name, this.props.version, this.props.link, this.setStatusToInstalled);
  }

  setStatusToInstalled = () => {
    this.setState({ status: 'Installed' });
  }

  uninstallPackage = (e) => {
    e.preventDefault();
    this.setState({ status: 'Uninstalling' });
    this.props.uninstallPackage(this.props.name);
  }

  updatePackage = (e) => {
    e.preventDefault();
    this.setState({ status: 'Updating' });
    this.props.updatePackage(this.props.name, this.state.newVersion, this.afterUpdateCallback);
  }

  afterUpdateCallback = (e) => {
    this.setState({ status: null, newVersionAvailable: false });
  }

  openLink = (e) => {
    const { shell } = require('electron');
    shell.openExternal(`https://www.npmjs.com/package/${this.props.name}`);
  }

  render() {
    const { name, version } = this.props;

    return (
      <div className={styles.tile}>
        <div className={styles.name} onClick={this.openLink}>{ name }</div>
        <div className={styles.version}>
          Version: { version }
          { this.state.newVersionAvailable && <span className={styles.newVersion}>New: { this.state.newVersion }</span> }
        </div>
        { !!this.state.status && <div className={styles.status}>
            { this.state.status }
            { this.state.status != 'Installed' && <div className={styles.indicator} /> }
          </div>
        }

        { !this.state.status && <div className={styles.actions}>
          { this.props.installPackage && <a href='#' onClick={this.installPackage} className={styles.installPackage}>Install</a> }
          { this.props.uninstallPackage && <a href='#' onClick={this.uninstallPackage} className={styles.uninstallPackage}>Uninstall</a> }
          { this.state.newVersionAvailable && <a href='#' onClick={this.updatePackage} className={styles.updatePackage}>Update</a> }
        </div> }
      </div>
    );
  }
}
