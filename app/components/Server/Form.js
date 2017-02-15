// @flow
import React, { Component } from 'react';

import Header from '../common/Header';
import styles from './Form.css'

export default class Form extends Component {
  constructor(props) {
    super(props);

    let server = this.props.servers[this.props.params.id];

    if (server) {
      this.state = {
        header: 'Edit server',
        id: server.id,
        name: server.name,
        host: server.host,
        port: server.port,
        username: server.username,
        folder: server.folder,
        editMode: true
      }
    } else {
      this.state = {
        header: 'New server',
        name: 'MyServer',
        host: '',
        port: '21',
        username: 'admin',
        folder: '/www/siva',
        editMode: false
      }
    }
  }

  createAndOpenServer = () => {
    this.props.saveServer(
      this.state.name,
      this.state.host,
      this.state.port,
      this.state.username,
      this.state.folder,
      this.state.id
    );

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
                    subtitle={ `Server ${this.state.name}` }
                    actionsVisible={false}
            />

            <div>
              <label htmlFor='name'>Name</label>
              <input id='name' type='text' onChange={(e) => { this.setState({ name: e.target.value }) }} autoFocus={true} defaultValue={this.state.name} />

              <label htmlFor='host'>Host</label>
              <input id='host' type='text' onChange={(e) => { this.setState({ host: e.target.value }) }} value={this.state.host} />

              <label htmlFor='port'>Port</label>
              <input id='port' type='text' onChange={(e) => { this.setState({ port: e.target.value }) }} defaultValue={this.state.port} />

              <label htmlFor='username'>Username</label>
              <input id='username' type='text' onChange={(e) => { this.setState({ username: e.target.value }) }} defaultValue={this.state.username} />

              <label htmlFor='folder'>Folder</label>
              <input id='folder' type='text' onChange={(e) => { this.setState({ folder: e.target.value }) }} defaultValue={this.state.folder} />

              <button onClick={this.createAndOpenServer}>Save</button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
