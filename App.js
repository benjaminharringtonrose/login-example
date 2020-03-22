import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import LoginForm from './src/components/LoginForm';

class App extends Component {
  componentDidMount() {
    // config keys
    const firebaseConfig = {
      apiKey: 'AIzaSyAYsn4HY38e3yG9UJ1opvbsXjjfAVzz7rg',
      authDomain: 'manager-65b62.firebaseapp.com',
      databaseURL: 'https://manager-65b62.firebaseio.com',
      projectId: 'manager-65b62',
      storageBucket: 'manager-65b62.appspot.com',
      messagingSenderId: '265178795526',
      appId: '1:265178795526:web:bff024acfce0730d2a7d87',
      measurementId: 'G-VQZ8GP6KG0'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <SafeAreaView>
          <LoginForm />
        </SafeAreaView>
      </Provider>
    );
  }
}

export default App;
