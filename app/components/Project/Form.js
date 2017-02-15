// @flow
import React, { Component } from 'react';

import Header from '../common/Header';
import styles from './Form.css'
import os from 'os';

export default class Form extends Component {
  props: {
    createProject: () => void,
    deleteProject: () => void
  };

  constructor(props) {
    super(props);

    let project = this.props.projects[this.props.params.id];

    if (project) {
      this.state = {
        header: 'Edit project',
        id: project.id,
        name: project.name,
        directory: project.directory,
        editMode: true
      }
    } else {
      this.state = {
        header: 'New project',
        name: 'MyProject',
        directory: `${os.homedir()}/siva/MyProject`,
        editMode: false
      }
    }
  }

  setProjectName = (e) => {
    const name = e.target.value;

    if (this.state.editMode) {
      this.setState({ name });
    } else {
      const directory = this.state.directory.replace(/\/$|\/[^\/]+$/, `/${name}`)
      this.setState({ name, directory });
    }
  }

  setProjectDirectory = (e) => {
    this.setState({ directory: e.target.value });
  }

  createAndOpenProject = () => {
    // TODO: Check if project directory does not exists

    this.props.saveProject(this.state.name, this.state.directory, this.state.id);
    this.props.router.push('/');
  }

  render() {
    return (
      <main className='dashboard'>
        <div className='main-container'>
          <div className={styles.container}>
            <Header backButtonVisible={true}
                    backButtonPath='/'
                    title={this.state.header}
                    subtitle={ `Project ${this.state.name}` }
                    actionsVisible={false}
            />

            <div>
              <label htmlFor='project-name'>Project name</label>
              <input id='project-name' type='text' onChange={this.setProjectName} autoFocus={true} defaultValue={this.state.name} />
              <label htmlFor='project-directory'>Project location</label>
              <input disabled={this.state.editMode} id='project-directory' type='text' onChange={this.setProjectDirectory} value={this.state.directory} />
              <button onClick={() => { this.createAndOpenProject() }}>Save</button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
