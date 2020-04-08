import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { connect } from 'react-redux';
import {
  firstNameChanged,
  lastNameChanged,
  emailChanged,
  passwordChanged,
  registerUser,
} from '../actions';

class RegisterForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onFirstNameChange(text) {
    this.props.firstNameChanged(text);
  }

  onLastNameChange(text) {
    this.props.lastNameChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onRegisterPress() {
    const { email, password } = this.props;
    this.props.registerUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return <Button onPress={this.onRegisterPress.bind(this)}>Signup</Button>;
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

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="First Name"
            placeholder="John"
            onChangeText={this.onFirstNameChange.bind(this)}
            value={this.props.firstName}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Last Name"
            placeholder="Smith"
            onChangeText={this.onLastNameChange.bind(this)}
            value={this.props.lastName}
          />
        </CardSection>
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
        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { firstName, lastName, email, password, error, loading } = auth;
  return { firstName, lastName, email, password, error, loading };
};

export default connect(mapStateToProps, {
  firstNameChanged,
  lastNameChanged,
  emailChanged,
  passwordChanged,
  registerUser,
})(RegisterForm);

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};
