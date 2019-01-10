import React from "react";
import { createRootNavigator } from "./router";
import { isSignedIn, onSignOut } from "./auth";
import {createAppContainer } from 'react-navigation';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    debugger
    onSignOut()
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;
    debugger
    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }
    
    const Layout = createAppContainer(createRootNavigator(signedIn));
    return <Layout />;
  }
}
