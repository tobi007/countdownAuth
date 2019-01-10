import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Image,
  } from 'react-native';


const FormTextInput = props => (
    <View style={styles.inputContainer}>
        <Image style={styles.inputIcon} source={{uri: props.iconUrl}}/>
        <TextInput style={styles.inputs}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            underlineColorAndroid='transparent'
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            onBlur={props.onBlur}
        />
        {props.error ? <Text>{props.error}</Text> : null}
    </View>
)

const styles = StyleSheet.create({
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    }
  });

  export default FormTextInput