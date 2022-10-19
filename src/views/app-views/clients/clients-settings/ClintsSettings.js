import { Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import InnerAppLayout from 'layouts/inner-app-layout';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import EditProfile from './EditProfile';

const SettingOption = ({ match, location }) => {
  return (
    <Menu
      defaultSelectedKeys={`${match.url}/edit-profile`}
      mode='inline'
      selectedKeys={[location.pathname]}
    >
      <Menu.Item key={`${match.url}/edit-profile`}>
        <UserOutlined />
        <span>Edit Profile</span>
        <Link to={'edit-profile'} />
      </Menu.Item>
    </Menu>
  );
};

const SettingContent = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}`} to={`${match.url}/edit-profile`} />
      <Route path={`${match.url}/edit-profile`} component={EditProfile} />
    </Switch>
  );
};

const ClintsSettings = (props) => {
  return (
    <div>
      <InnerAppLayout
        sideContentWidth={320}
        sideContent={<SettingOption {...props} />}
        mainContent={<SettingContent {...props} />}
      />
    </div>
  );
};

export default ClintsSettings;
