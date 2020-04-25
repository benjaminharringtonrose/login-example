import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginScreen from './src/components/LoginScreen';
import EmployeeList from './src/components/EmployeeList';
import EmployeeCreate from './src/components/EmployeeCreate';
import RegisterScreen from './src/components/RegisterScreen';
import EmployeeEdit from './src/components/EmployeeEdit';

import HomeScreen from './src/components/HomeScreen';
import PostScreen from './src/components/PostScreen';
import MessageScreen from './src/components/MessageScreen';
import NotificationScreen from './src/components/NotificationScreen';
import ProfileScreen from './src/components/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth" back={false}>
          <Scene
            key="login"
            component={LoginScreen}
            title="Please Login"
            initial={true}
          />
          <Scene
            key="register"
            component={RegisterScreen}
            title="Welcome. Sign up here."
          />
        </Scene>

        <Scene key="main">
          <Scene key="tabs" tabs={true} hideNavBar={true}>
            <Scene
              key="home"
              component={HomeScreen}
              title="Feed"
              icon={() => <Ionicons name="ios-home" size={24} />}
            />
            <Scene
              key="notifications"
              component={NotificationScreen}
              title="Notifications"
              icon={() => <Ionicons name="ios-notifications" size={24} />}
            />
            <Scene
              key="post"
              component={PostScreen}
              title="Post"
              icon={() => <Ionicons name="ios-add-circle" size={24} />}
            />
            <Scene
              key="messages"
              component={MessageScreen}
              title="Messages"
              icon={() => <Ionicons name="ios-chatboxes" size={24} />}
            />
            <Scene
              key="profile"
              component={ProfileScreen}
              title="Profile"
              icon={() => <Ionicons name="ios-person" size={24} />}
            />
          </Scene>

          <Scene
            key="employeeCreate"
            component={EmployeeCreate}
            title="Create an Employee"
          />
          <Scene
            key="employeeEdit"
            component={EmployeeEdit}
            title="Edit Employee"
          />
        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
