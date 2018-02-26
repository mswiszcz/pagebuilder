// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Packages.css';
import PackageTile from './Packages/PackageTile';

import DefaultKeyboardEvents from '../utils/DefaultKeyboardEvents';

export default class Packages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      foundPackages: []
    }
  }

  componentDidMount() {
    window.addEventListener('keydown', this.keyboardListener, false);
    this.props.fetchInstalledPackages(); // TODO: unless already fetched
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyboardListener, false);
  }

  keyboardListener = (event) => {
    DefaultKeyboardEvents.call(this.props.router, event);
  }

  updateQuery = (e) => {
    e.preventDefault();
    this.setState({ query: e.target.value });
  }

  searchPackages = (e) => {
    e.preventDefault();
    if (this.state.query == '') { return; }

    fetch(`https://api.npms.io/v2/search?q=${this.state.query}`).then((response) => {
      return response.json();
    }).then((data) => {
      const packages = data.results.map((result) => {
        return {
          name: result.package.name,
          version: result.package.version
        }
      });

      this.setState({ foundPackages: packages })
    }).catch(function(e) {
      console.log(e);
    });
  }

  render() {
    const { installedPackages, installPackage, uninstallPackage, updatePackage } = this.props;

    return (
      <main className={styles.main}>
        <div className={styles.content}>
          <h2>Installed dependencies</h2>
          <div className={styles.packageList}>
            { Object.keys(installedPackages).map((installedPackage, i) => {
              return (
                <PackageTile key={`installed-package-${installedPackage}-${i}`}
                             version={installedPackages[installedPackage]['version']}
                             name={installedPackage}
                             uninstallPackage={uninstallPackage}
                             updatePackage={updatePackage}
                           />
              )
            }, this)}
          </div>
          <h2>Search & Install packages</h2>
          <div className={styles.packageSearch}>
            <form onSubmit={this.searchPackages}>
              <input type='text' className={styles.searchInput} placeholder={'Search'} value={this.state.query} onChange={this.updateQuery} />
            </form>
            <div className={styles.packageList}>
              { this.state.foundPackages.map((foundPackage, i) => {
                return (
                  <PackageTile key={`found-package-${foundPackage.name}-${i}`}
                               version={foundPackage.version}
                               name={foundPackage.name}
                               installPackage={installPackage} />
                )
              }) }
            </div>
          </div>
        </div>
      </main>
    );
  }
}
