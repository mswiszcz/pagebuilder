// @flow
import React, { Component } from 'react';
import styles from './EmptySpaceSlider.css';

export default class EmptySpaceSlider extends Component {
  render() {
    return (
      <div className={styles.component}>
        <div className={styles.slide}>
          Open file from tree on the left, <br/>
          or use <em>CMD+T</em> to draw quick open menu.
        </div>
      </div>
    );
  }
}
