import React from 'react';
import { Route } from 'react-router-dom';

import Home from './containers/Home'
import ArticleList from './containers/ArticleListView'
import ArticleDetail from './containers/ArticleDetailView'
import Login from './containers/Login';
import Signup from './containers/Signup';

const BaseRouter = () => (
  <div>
    <Route exact path='/' component={Home} />{" "}
    <Route exact path='/articles/' component={ArticleList} />{" "}
    <Route exact path='/articles/:articleID/' component={ArticleDetail} />{" "}
    <Route exact path='/login/' component={Login} />{" "}
    <Route exact path='/signup/' component={Signup} />{" "}
  </div>
);

export default BaseRouter;
