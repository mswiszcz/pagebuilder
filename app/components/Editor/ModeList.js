// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './ModeList.css';
import { AVAILABLE_MODES } from '../../model/file';

export default class ModeList extends Component {
  static defaultProps = {
    modes: AVAILABLE_MODES.html
  }

  render() {
    const { modes, onSelect } = this.props;

    return (
      <ul className={styles.component}>
        { Object.keys(modes).map((type) => {
          const mode = modes[type];

          return (
            <div key={`mode-list-${type}`} className={styles.item} onClick={() => { onSelect(type, mode) }}>
              { type } ({mode})
            </div>
          )
        })}
      </ul>
    );
  }
}
