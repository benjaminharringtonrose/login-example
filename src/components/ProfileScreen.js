import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, CardSection, Card } from './common';
import { LOGOUT_USER_REQUEST } from '../actions/types';

class ProfileScreen extends React.Component {
  onLogoutPress() {
    this.props.dispatchLogoutRequest();
  }

  render() {
    return (
      <View style={styles.container}>
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

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLogoutRequest: () => {
    dispatch({ type: LOGOUT_USER_REQUEST });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
