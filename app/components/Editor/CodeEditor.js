// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './CodeEditor.css';
import CodeMirror from 'react-codemirror';

import Notification from '../common/Notification';

require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/css/css');

export default class CodeEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: props.currentFile.updated ? 'Updated' : 'Saved',
      filetype: props.currentFile.filetype
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { currentFile } = nextProps;

    this.setState({
      status: currentFile.updated ? 'Updated' : 'Saved',
      filetype: currentFile.filetype
    });
  }

  updateCode = (code) => {
    this.props.updateFile(this.props.currentFile, code)
  }

  saveCode = () => {
    this.props.saveFile(this.props.currentFile);
  }

  render() {
    let options = {};
    options['lineNumbers'] = options['lineNumbers'] || true;
    options['theme'] = 'pastel-on-dark';

    return (
      <div className={styles.component}>
        <div className={styles.editor}>
          <CodeMirror value={this.props.currentFile.content} options={options} onChange={this.updateCode} />
        </div>
        <div className={styles.footer}>
          <div className={styles.footerElement} onClick={this.saveCode}>
            <span className={styles.status}>
              { this.state.status }
            </span>
          </div>
        </div>
      </div>
    );
  }
}
