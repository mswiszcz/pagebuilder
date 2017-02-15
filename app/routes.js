// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import HomePage from './containers/HomePage';
import EditorPage from './containers/EditorPage';
import PreviewPage from './containers/PreviewPage';
import ProjectFormPage from './containers/project/FormPage';
import ServerFormPage from './containers/server/FormPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/editor" component={EditorPage} />
    <Route path="/preview" component={PreviewPage} />
    {/* <Route path="/pagesettings" component={PageSettingsPage} />
    <Route path="/board" component={BoardPage} />
    <Route path="/checks" component={ChecksPage} /> */}

    <Route path="/projects/new" component={ProjectFormPage} />
    <Route path="/projects/:id/edit" component={ProjectFormPage} />

    <Route path="/servers/new" component={ServerFormPage} />
    <Route path="/servers/:id/edit" component={ServerFormPage} />
  </Route>
);
