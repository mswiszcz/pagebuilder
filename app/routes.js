// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import HomePage from './containers/HomePage';
import EditorPage from './containers/EditorPage';
import PreviewPage from './containers/PreviewPage';
import PackagesPage from './containers/PackagesPage';
import ProjectFormPage from './containers/project/FormPage';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />
    <Route path='/editor' component={EditorPage} />
    <Route path='/preview' component={PreviewPage} />
    <Route path='/packages' component={PackagesPage} />

    <Route path='/projects/new' component={ProjectFormPage} />
    <Route path='/projects/:id/edit' component={ProjectFormPage} />
  </Route>
);
