import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import UserPermissions from '../permissions';
import * as ImagePicker from 'expo-image-picker';
import { REGISTER_USER_REQUEST, AVATAR_REQUEST } from '../actions/types';
import {
  firstNameChanged,
  lastNameChanged,
  emailChanged,
  passwordChanged,
  avatarChanged,
} from '../actions';

class RegisterScreen extends Component {
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
    const { email, password, firstName, lastName, avatar } = this.props;
    this.props.dispatchRegisterRequest({
      email,
      password,
      firstName,
      lastName,
      avatar,
    });
  }

  onPickAvatar = async () => {
    UserPermissions.getCameraPermission();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      this.props.avatarChanged(result.uri);
    }
  };

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
      <View style={{ flex: 9 }}>
        <View style={{ flex: 9 }}></View>
        <Image
          source={require('../../assets/pobFooter.png')}
          style={styles.footer}
        />

        <Text
          style={styles.greeting}
        >{`Welcome!\nSign up to get started.`}</Text>
        <View style={{ flex: 1 }}></View>
        <TouchableOpacity
          style={styles.avatarPlaceholder}
          onPress={this.onPickAvatar}
        >
          <Image source={{ uri: this.props.avatar }} style={styles.avatar} />
          <Ionicons
            name="ios-add"
            size={40}
            color="#FFF"
            style={styles.addIcon}
          ></Ionicons>
        </TouchableOpacity>
        <View style={{ flex: 1 }}></View>
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
        <View style={{ flex: 1 }}></View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { firstName, lastName, avatar, email, password, error, loading } = auth;
  return { firstName, lastName, avatar, email, password, error, loading };
};

const mapDispatchToProps = (dispatch) => ({
  firstNameChanged: (text) => dispatch(firstNameChanged(text)),
  lastNameChanged: (text) => dispatch(lastNameChanged(text)),
  emailChanged: (text) => dispatch(emailChanged(text)),
  passwordChanged: (text) => dispatch(passwordChanged(text)),
  dispatchRegisterRequest: ({
    email,
    password,
    firstName,
    lastName,
    avatar,
  }) => {
    dispatch({
      type: REGISTER_USER_REQUEST,
      payload: { email, password, firstName, lastName, avatar },
    });
  },
  dispatchAvatarRequest: ({ avatar }) => {
    dispatch({
      type: AVATAR_REQUEST,
      payload: { avatar },
    });
  },
  avatarChanged: (result) => dispatch(avatarChanged(result)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
  footer: {
    position: 'absolute',
    width: '100%',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#D9AD26',
  },
  avatarPlaceholder: {
    alignSelf: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#D9AD26',
    borderRadius: 60,
  },
  avatar: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  addIcon: {
    alignSelf: 'center',
    marginTop: 38,
    marginLeft: 2,
  },
});
