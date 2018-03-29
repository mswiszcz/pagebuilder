// @flow
import React, { Component } from 'react';

import Header from '../common/Header';
import TemplateTile from './TemplateTile';
import styles from './Form.css'
import os from 'os';

import { gatsbyTemplates } from '../../consts';

export default class Form extends Component {
  constructor(props) {
    super(props);

    let project = this.props.projects[this.props.params.id];

    if (project) {
      this.state = {
        header: 'Edit project',
        id: project.id,
        name: project.name,
        editMode: true,
        choosenTemplate: gatsbyTemplates[0]
      }
    } else {
      this.state = {
        header: 'New project',
        name: 'MyProject',
        editMode: false,
        choosenTemplate: gatsbyTemplates[0],
      }
    }
  }

  setProjectName = (e) => {
    this.setState({ name: e.target.value });
  }

  createAndOpenProject = () => {
    this.props.createProject(
      this.state.name.replace(' ', '-'),
      this.state.choosenTemplate.url
    );
    this.props.router.push('/');
  }

  chooseTemplate = (template) => {
    this.setState({ choosenTemplate: template });
  }

  render() {
    const { choosenTemplate } = this.state;

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

              <label>Template</label>
              <div className={styles.templates}>
                { gatsbyTemplates.map((template) => {
                    return <TemplateTile key={`template-${template.name}`} active={choosenTemplate && choosenTemplate.name == template.name} template={template} onClick={() => { this.chooseTemplate(template) }}/>
                }) }
              </div>

              <button onClick={() => { this.createAndOpenProject() }}>Save</button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
