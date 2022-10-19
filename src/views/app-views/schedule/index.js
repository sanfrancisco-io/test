import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Scheduler from './Scheduler/Scheduler';

const Catalog = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/scheduler`} />
      <Route path={`${match.url}/scheduler`} component={Scheduler} />
    </Switch>
  );
};

export default Catalog;
