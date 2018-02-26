// @flow
import React, { Component } from 'react';

import Header from '../common/Header';
import styles from './Form.css'
import os from 'os';

export default class Form extends Component {
  constructor(props) {
    super(props);

    let project = this.props.projects[this.props.params.id];

    if (project) {
      this.state = {
        header: 'Edit project',
        id: project.id,
        name: project.name,
        editMode: true
      }
    } else {
      this.state = {
        header: 'New project',
        name: 'MyProject',
        editMode: false
      }
    }
  }

  setProjectName = (e) => {
    this.setState({ name: e.target.value });
  }

  createAndOpenProject = () => {
    this.props.createProject(this.state.name);
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
              <button onClick={() => { this.createAndOpenProject() }}>Save</button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
