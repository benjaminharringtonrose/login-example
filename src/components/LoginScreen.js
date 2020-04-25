import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { connect } from 'react-redux';
import { loginUser } from '../sagas';
import { emailChanged, passwordChanged } from '../actions/AuthActions';
import { Actions } from 'react-native-router-flux';

class LoginScreen extends Component {
  //HANDLERS:
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  navigateToRegisterForm() {
    Actions.register();
  }

  renderLoginButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    } else {
      return <Button onPress={this.onLoginPress.bind(this)}>Login</Button>;
    }
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  }

  //----------------------------------

  render() {
    return (
      <View style={{ flex: 5, justifyContent: 'center' }}>
        <View style={{ flex: 3 }}></View>
        <Card>
          <CardSection>
            <Input
              label="Email"
              placeholder="email@gmail.com"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>
          {this.renderError()}
          <CardSection>{this.renderLoginButton()}</CardSection>
          <CardSection>
            {
              <Button onPress={this.navigateToRegisterForm}>
                Sign Up Here
              </Button>
            }
          </CardSection>
        </Card>
        <View style={{ flex: 1 }}></View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
})(LoginScreen);

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};
