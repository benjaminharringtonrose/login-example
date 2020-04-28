import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, CardSection, Card } from './common';
import { LOGOUT_USER_REQUEST, FETCH_USER_REQUEST } from '../actions/types';
import { getCurrentUser } from '../actions/UserActions';
import firebase from 'firebase';
require('firebase/firestore');

class ProfileScreen extends React.Component {
  state = {
    user: {},
  };
  unsubscribe = null;
  componentDidMount() {
    // this.props.dispatchFetchUserRequest();
    const user = firebase.auth().currentUser.uid;
    // this.props.getCurrentUser(user);
    // this.props.dispatchFetchUserRequest(user);
    this.unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(user)
      .onSnapshot((doc) => {
        this.setState({ user: doc.data() });
        console.log('user:  ', this.props.user);
      });
  }

  // componentWillUnmount() {
  //   this.unsubscribe();
  // }

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
        <Text
          style={styles.name}
        >{`${this.props.firstName} ${this.props.lastName}`}</Text>
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

const mapStateToProps = ({ auth }) => {
  const { avatar, uid, firstName, lastName, user } = auth;
  return { avatar, uid, firstName, lastName, user };
};

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: (user) => dispatch(getCurrentUser(user)),
  dispatchLogoutRequest: () => dispatch({ type: LOGOUT_USER_REQUEST }),
  dispatchFetchUserRequest: (data) =>
    dispatch({ type: FETCH_USER_REQUEST, payload: data }),
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
