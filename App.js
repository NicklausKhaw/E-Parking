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
import LoadingScreen from "./src/screens/LoadingScreen";

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
