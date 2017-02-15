// @flow
import React, { Component } from 'react';
import { loadProjects } from '../actions/project';

export default class App extends Component {
  props: {
    children: HTMLElement
  };

  render() {
    return (
      <div>{ this.props.children }</div>
    );
  }
}
