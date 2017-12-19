// @flow
import React, { Component } from 'react';
import styles from './EmptySpaceSlider.css';

export default class EmptySpaceSlider extends Component {
  render() {
    return (
      <div className={styles.component}>
        <div className={styles.slide}>
          No file selected <br/>
          Open file from tree on the left
        </div>
      </div>
    );
  }
}
