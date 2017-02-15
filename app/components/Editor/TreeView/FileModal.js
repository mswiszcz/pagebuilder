// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import Modal from '../../common/Modal';

export default class FileModal extends Component {
  updateFileName = (e) => {
    this.props.file.name = e.target.value;
  }

  componentDidMount = () => {
    if (this.input) { this.input.focus() }
  }

  handleKeyboardInput = (event) => {
    switch (event.keyCode) {
      case 27:
        this.props.onClose();
        return;
      case 13:
        this.props.onSubmit(this.props.file);
        this.props.onClose();
        return;
    }
  }

  render() {
    const { file, header } = this.props;

    return (
      <Modal onClose={this.props.onClose}>
        <label htmlFor='filename'>{ header }</label>
        <input  ref={(input) => { this.input = input; }}
                id='filename'
                type='text'
                defaultValue={file.name}
                placeholder='Enter file name'
                onKeyDown={this.handleKeyboardInput}
                onChange={this.updateFileName}
              />
      </Modal>
    );
  }
}
