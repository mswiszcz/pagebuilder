// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './ContextMenu.css';

export default class ContextMenu extends Component {
  componentDidMount = () => {
    if (this.list) { this.list.focus() }
  }

  executeAction = (action) => {
    action();
    this.props.onBlur();
  }

  render() {
    const { x, y, onBlur, actions } = this.props;
    const style = { top: y, left: x };

    return (
      <ul ref={(ul) => { this.list = ul; }} className={styles.component} style={style} tabIndex='100' onBlur={onBlur}>
        { Object.keys(actions).map((actionName, i) => {
          let item = actions[actionName];

          return (
            <li key={`context-menu-action-${i}`}
                onClick={() => { this.executeAction(item.action) }}>{item.title}</li>
          )
        })}
      </ul>
    );
  }
}
