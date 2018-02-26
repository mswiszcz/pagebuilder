// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

import Card from './Home/Card';
import Header from './common/Header';
import moment from 'moment';

import { PROJECT_DATE_FORMAT } from '../model/project';
import { STATUS } from '../reducers/gatsby';

export default class Home extends Component {
  props: {
    projects: Object
  };

  constructor(props) {
    super(props);

    if (Object.keys(this.props.projects).length == 0) {
      this.props.loadProjects();
    }
  }

  componentDidMount() {
    if (this.props.gatsbyStatus.develop != STATUS.IDLE)
      this.props.gatsbyDevelopStop();

    this.props.closeProject();
  }

  openProject = (project) => {
    this.props.openProject(project);
    this.props.router.push('/editor');
  }

  render() {
    const { openProject, deleteProject, deleteServer, projects, servers } = this.props;
    let sortedProjects = Object.keys(projects).sort((a, b) => {
      return projects[a].updatedAt > projects[b].updatedAt ? -1 : 1;
    });

    return (
      <main className='dashboard'>
        <div className='main-container'>
          <div className={styles.wrapper}>
            <Header backButtonVisible={false}
                    title='Dashboard'
                    subtitle={ moment().format('dddd[,] D MMMM') }
                    actionsVisible={true}
            />

            <div className={styles.container}>
              { sortedProjects.map((key, i) => {
                let project = projects[key];

                return (
                  <Card key={`project-card-${project.id}`}
                        title={project.name}
                        subtitle={ `Updated ${moment(project.updatedAt, PROJECT_DATE_FORMAT).fromNow()}` }
                        icon={project.icon}
                        color={project.color}
                        onClick={() => { this.openProject(project) }}
                        deleteAction={(e) => { deleteProject(project) }}
                        disabled={project.setupInProgress}
                  />);
              }, this)}
            </div>
          </div>
        </div>
      </main>
    );
  }
}
