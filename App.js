import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./src/screens/HomeScreen";
import ScanQRScreen from "./src/screens/ScanQRScreen";
import ParkingStatusScreen from "./src/screens/ParkingStatusScreen";
import AccountDetailScreen from "./src/screens/AccountDetailScreen";
import TopUpScreen from "./src/screens/TopUpScreen";
import AuthScreen from "./src/screens/AuthScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import AdminHomeScreen from "./src/screens/AdminHomeScreen";

// import * as firebase from 'firebase';

// var firebaseConfig = {
//   apiKey: "AIzaSyBjP1zYw65BTLlflCeWTOG_PAJLjxfpcqg",
//   authDomain: "e-parking-2f41c.firebaseapp.com",
//   databaseURL: "https://e-parking-2f41c-default-rtdb.firebaseio.com",
//   projectId: "e-parking-2f41c",
//   storageBucket: "e-parking-2f41c.appspot.com",
//   messagingSenderId: "627495496167",
//   appId: "1:627495496167:web:6b227f1c5ee666b4af3542",
//   measurementId: "G-ZV4BF91DHE",
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    ScanQR: ScanQRScreen,
    ParkingStatus: ParkingStatusScreen,
    AccountDetail: AccountDetailScreen,
    TopUp: TopUpScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "E-Parking App",
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    SignUp: SignUpScreen,
  },
  {
    defaultNavigationOptions: AuthScreen.navigationOptions.headerTitle,
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Stack: navigator,
  AdminHome: AdminHomeScreen,
});

export default createAppContainer(MainNavigator);
