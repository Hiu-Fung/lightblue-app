/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';

// import React, {
//     AppRegistry,
//     Component,
//     StyleSheet,
//     Text,
//     View,
//     ActivityIndicatorIOS
// } from 'react';

var Login = require('./Login');
var AppContainer = require('./AppContainer');
var AuthService = require('./AuthService');

export default class GithubApp extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoggedIn : false,
      checkingAuth: true
    }
  }

  componentDidMount(){
    AuthService.getAuthInfo((err, authInfo)=> {
      console.log('authInfo');
      console.log(authInfo);
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      })
    });
  }

  render() {
    if(this.state.checkingAuth){
      return (
          <View style={styles.container}>
            <ActivityIndicator
                animating={true}
                size="large"
                style={styles.loader} />
          </View>
      )
    }

    if(this.state.isLoggedIn){
      return (
          <AppContainer />
      );
    } else {
      return (
          <Login onLogin={this.onLogin.bind(this)}/>
      );
    }
  }

  onLogin() {
    this.setState({isLoggedIn: true});
    console.log('this.state.isLoggedIn');
    console.log(this.state.isLoggedIn);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  },
  loader: {
    marginTop: 20
  }
});

AppRegistry.registerComponent('GithubApp', () => GithubApp);
