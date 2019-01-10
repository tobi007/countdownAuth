import React, { Component } from 'react';
import validate from "../validation/validate_wrapper";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import { onClickListener, onSignIn } from '../auth'
import FormTextInput  from "../component/FormTextInput";

class SignIn extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email   : '',
      emailError: '',
      password: '',
      passwordError: '',
    }
  }

  handleSignIn = () => {
    if(this.state.emailError === null && this.state.passwordError === null){
      console.log(onSignIn(this.state))
      this.props.navigation.navigate('SignedIn')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        
        <FormTextInput 
          iconUrl='https://png.icons8.com/message/ultraviolet/50/3498db'
          placeholder="Email"
          keyboardType="email-address"
          secureTextEntry={false}
          error={this.state.emailError}
          onChangeText={value => {
            this.setState({email: value.trim(), emailError: validate('email', value.trim())})
          }}
        />

        <FormTextInput 
          iconUrl='https://png.icons8.com/key-2/ultraviolet/50/3498db'
          placeholder="Password"
          secureTextEntry={true}
          error={this.state.passwordError}
          onChangeText={value => {
            this.setState({password: value.trim(), passwordError: validate('password', value.trim())})
          }}
        />

        <TouchableHighlight 
          style={[styles.buttonContainer, styles.loginButton]} 
          onPress={() => {
            this.handleSignIn();
          }}>
          <Text style={styles.loginText}>Sign In</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style={styles.buttonContainer} 
          onPress={() => 
            onClickListener('restore_password')
          }>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight 
          style={styles.buttonContainer} 
          onPress={() => this.props.navigation.navigate('SignUp')
        }>
            <Text>Sign Up</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  }
});

export default SignIn