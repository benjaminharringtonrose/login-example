import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, CardSection, Card } from './common';
import {
  LOGOUT_USER_REQUEST,
  FETCH_USER_REQUEST,
} from '../store/actions/types';
import firebase from 'firebase';
require('firebase/firestore');

class ProfileScreen extends React.Component {
  unsubscribe = null;
  componentDidMount() {
    let user = firebase.auth().updateCurrentUser;
    user = firebase.auth().currentUser.uid;
    this.unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(user)
      .get()
      .then((doc) => {
        this.props.dispatchFetchUser(doc.data());
      });
    console.log('PROPS!!', this.props);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onLogoutPress() {
    this.props.dispatchLogoutRequest();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              this.props.avatar
                ? { uri: this.props.avatar }
                : require('../../assets/defaultAvatar.png')
            }
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>{this.props.firstName}</Text>
        <Card>
          <CardSection>
            <Text>Profile Screen</Text>
          </CardSection>
          <CardSection>
            <Button onPress={this.onLogoutPress.bind(this)}>Sign Out</Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const mapStateToProps = ({ users }) => {
  const { avatar, firstName, lastName } = users;
  return { avatar, firstName, lastName };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLogoutRequest: () => dispatch({ type: LOGOUT_USER_REQUEST }),
  dispatchFetchUser: (user) =>
    dispatch({ type: FETCH_USER_REQUEST, type: user }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    shadowColor: '#151734',
    shadowRadius: 30,
    shadowOpacity: 0.4,
  },
  avatar: {
    width: 136,
    height: 136,
    borderRadius: 68,
  },
});
