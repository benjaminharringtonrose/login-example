import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { emailChanged, passwordChanged } from '../store/actions/AuthActions';
import { Actions } from 'react-native-router-flux';
import { LOGIN_USER_REQUEST } from '../store/actions/types';

class LoginScreen extends Component {
  // componentWillMount() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     user ? Actions.main() : Actions.login();
  //   });
  // }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginPress() {
    const { email, password } = this.props;
    this.props.dispatchLoginRequest({ email, password });
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
      <View style={{ flex: 9, justifyContent: 'center' }}>
        <Image
          resizeMode={'cover'}
          source={require('../../assets/pobHeader.jpg')}
          style={styles.header}
        />
        <Image
          source={require('../../assets/pobFooter.png')}
          style={styles.footer}
        />
        <View style={{ flex: 9 }}></View>
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

const mapDispatchToProps = (dispatch) => ({
  emailChanged: (text) => dispatch(emailChanged(text)),
  passwordChanged: (text) => dispatch(passwordChanged(text)),
  dispatchLoginRequest: ({ email, password }) => {
    dispatch({
      type: LOGIN_USER_REQUEST,
      payload: { email, password },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // position: "absolute",
  },
  footer: {
    position: 'absolute',
    width: '100%',
  },
});
