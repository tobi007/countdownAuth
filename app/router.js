import React from "react";
import { Platform, StatusBar } from "react-native";
import { 
    createStackNavigator, 
    createBottomTabNavigator,
    createSwitchNavigator
    
} from "react-navigation";
import { FontAwesome } from "react-native-vector-icons";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import Events from "./screens/Events";

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In",
      headerStyle
    }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: "Sign Up",
      headerStyle
    }
  }
});  

export const SignedIn = createBottomTabNavigator(
  {
    Events: {
      screen: Events,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="calendar" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    }
  }
)

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedOut: {
        screen: SignedOut
      },
      SignedIn: {
        screen: SignedIn
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};

  