import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CatalogCategories from './catalog-categories/CatalogCategories';
import CatalogCollections from './catalog-collections/CatalogCollections';
import CatalogCombo from './catalog-combo/CatalogCombo';
import CatalogOrders from './catalog-orders/CatalogOrders';
import CatalogProducts from './catalog-products/CatalogProducts';

const Catalog = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/products`} />
      <Route path={`${match.url}/products`} component={CatalogProducts} />
      <Route path={`${match.url}/categories`} component={CatalogCategories} />
      <Route path={`${match.url}/сollections`} component={CatalogCollections} />
      <Route path={`${match.url}/combo`} component={CatalogCombo} />
      <Route path={`${match.url}/orders`} component={CatalogOrders} />
    </Switch>
  );
};

export default Catalog;
