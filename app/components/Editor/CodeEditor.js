// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './CodeEditor.css';
import CodeMirror from 'react-codemirror';
import ModeList from './ModeList';
import { AVAILABLE_MODES } from '../../model/file';
import Haml from 'haml';

import Notification from '../common/Notification';


// TODO: More modes!
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/slim/slim');
require('codemirror/mode/haml/haml');
require('codemirror/mode/css/css');

export default class CodeEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayModeList: false,
      status: props.currentFile.updated ? 'Updated' : 'Saved',
      modes: AVAILABLE_MODES[props.currentFile.type],
      mode: props.currentFile.mode,
      filetype: props.currentFile.filetype
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { currentFile } = nextProps;

    this.setState({
      status: currentFile.updated ? 'Updated' : 'Saved',
      modes: AVAILABLE_MODES[currentFile.type],
      mode: currentFile.mode,
      filetype: currentFile.filetype
    });
  }

  changeMode = (filetype, mode) => {
    if (mode == this.props.currentFile.mode) { return; }

    this.setState({
      notificationMessage: `Convert ${this.props.currentFile.filetype} file to ${mode}?`,
      displayModeList: false,
      displayConvertNotification: true
    });

    this.props.updateFile(
      this.props.currentFile,
      this.props.currentFile.content,
      filetype,
      mode
    )
  }

  toggleModeList = () => {
    this.setState({ displayModeList: !this.state.displayModeList });
  }

  updateCode = (code) => {
    this.props.updateFile(this.props.currentFile, code)
  }

  saveCode = () => {
    this.props.saveFile(this.props.currentFile);
  }

  convertFile = () => {
    // TODO: Convert file
  }

  render() {
    let options = {};
    options['lineNumbers'] = options['lineNumbers'] || true;
    options['theme'] = 'pastel-on-dark';
    options['mode'] = this.state.mode;

    return (
      <div className={styles.component}>
        { this.state.displayConvertNotification &&
            <Notification message={this.state.notificationMessage}
                          acceptMessage='Convert'
                          dismissMessage='Cancel'
                          accept={this.convertFile}
                          dismiss={() => { this.setState({displayConvertNotification: false})} }
            />
        }

        <div className={styles.editor}>
          <CodeMirror value={this.props.currentFile.content} options={options} onChange={this.updateCode} />
        </div>
        <div className={styles.footer}>
          <div className={styles.footerElement} onClick={this.saveCode}>
            <span className={styles.status}>
              { this.state.status }
            </span>
          </div>

          <div className={styles.footerElement} onClick={this.toggleModeList}>
            <span>{ this.state.filetype } ({ this.state.mode })</span>
            { this.state.displayModeList && <ModeList onSelect={this.changeMode} modes={this.state.modes} /> }
          </div>
        </div>
      </div>
    );
  }
}
