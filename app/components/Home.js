// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';

import Card from './Home/Card';
import Header from './common/Header';
import moment from 'moment';

import { PROJECT_DATE_FORMAT } from '../model/project';

export default class Home extends Component {
  props: {
    projects: Object,
    servers: Object
  };

  constructor(props) {
    super(props);
    this.props.loadProjects();
    this.props.loadServers();
  }

  openProject = (id) => {
    this.props.openProject(id);
    this.props.router.push('/editor');
  }

  editProject = (id) => {
    // this.props.openProject(id);
    this.props.router.push(`/projects/${id}/edit`);
  }

  editServer = (id) => {
    this.props.router.push(`/servers/${id}/edit`);
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
                        onClick={() => { this.openProject(project.id) }}
                        editAction={(e) => { this.editProject(project.id) }}
                        deleteAction={(e) => { deleteProject(project.id) }}
                  />);
              }, this)}
            </div>

            <hr className={styles.separator} />

            <div className={styles.container}>
              { Object.keys(servers).map((key, i) => {
                let server = servers[key];

                return (
                  <Card key={`server-card-${server.id}`}
                        title={`${server.name}`}
                        subtitle={`${server.host}:${server.port}` }
                        icon={'Wolf'}
                        color={'#2a2a40'}
                        editAction={(e) => { this.editServer(server.id) }}
                        deleteAction={(e) => { deleteServer(server.id) }}
                  />);
              }, this)}
            </div>
          </div>
        </div>
      </main>
    );
  }
}
