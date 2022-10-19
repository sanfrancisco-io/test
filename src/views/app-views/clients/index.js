import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import ClientsGroup from './clients-group/ClientsGroup';
import ClientsList from './clients-list/ClientsList';
import ClintsSettings from './clients-settings/ClintsSettings';

const Catalog = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/list`} />
      <Route path={`${match.url}/list`} component={ClientsList} />
      <Route path={`${match.url}/group`} component={ClientsGroup} />
      <Route path={`${match.url}/settings/:id`} component={ClintsSettings} />
    </Switch>
  );
};

export default Catalog;
