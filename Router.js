import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoadingScreen from './src/components/common/LoadingScreen';
import LoginForm from './src/components/LoginForm';
import EmployeeList from './src/components/EmployeeList';
import EmployeeCreate from './src/components/EmployeeCreate';
import RegisterForm from './src/components/RegisterForm';
import EmployeeEdit from './src/components/EmployeeEdit';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth" back={false}>
          <Scene
            key="login"
            component={LoginForm}
            title="Please Login"
            initial={true}
          />
          <Scene
            key="register"
            component={RegisterForm}
            title="Welcome. Sign up here."
          />
        </Scene>

        <Scene key="main">
          <Scene
            key="employeeList"
            component={EmployeeList}
            title="Employees"
            rightTitle="Add"
            onRight={() => Actions.employeeCreate()} //Actions comes from flux library
          />
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
