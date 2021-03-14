import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  LogBox,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import "firebase/firestore";
import { loggingOut } from "../api/firebaseMethods";

//add admin buttons if isAdmin == 1

const HomeScreen = (props) => {
  LogBox.ignoreAllLogs();
  let currentUserUID = firebase.auth().currentUser.uid;
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [wallet, setWallet] = useState(0);
  const [email, setEmail] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [hasNumberPlate, setHasNumberPlate] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("users")
      .doc(currentUserUID)
      .onSnapshot((documentSnapshot) => {
        setName(documentSnapshot.data().name);
        setIsAdmin(documentSnapshot.data().isAdmin);
        setWallet(documentSnapshot.data().wallet);
        setEmail(documentSnapshot.data().email);
        if (documentSnapshot.data().numberPlate) {
          setHasNumberPlate(true);
          setNumberPlate(documentSnapshot.data().numberPlate);
        }
        setLoading(false);
      });

    return () => subscriber();
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  const logOutPress = () => {
    loggingOut();
    props.navigation.navigate("Auth");
  };

  const checkRequirements = () => {
    if (wallet < 10) {
      Alert.alert(
        "Insufficient Balance",
        "You have to have a minimum amount of RM10 in your wallet"
      );
    }
    if (!hasNumberPlate) {
      Alert.alert(
        "No Number Plate",
        "Register your Car Number Plate to continue"
      );
    }
    if (wallet >= 10 && hasNumberPlate) {
      props.navigation.navigate("ScanQR");
    }
  };

  console.log(name, isAdmin, wallet, numberPlate, email);

  return (
    <LinearGradient colors={["lightblue", "#ffe3ff"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome {name}</Text>
        <Text style={styles.text}>Wallet: RM{wallet}</Text>
        {isAdmin == "1" ? (
          <Button
            style={styles.buttons}
            onPress={() => props.navigation.navigate("AdminHome")}
            title="Admin Home"
          />
        ) : null}
        <Button
          style={styles.buttons}
          onPress={() => checkRequirements()}
          title="Scan QR code"
        />
        <Button
          style={styles.buttons}
          onPress={() => props.navigation.navigate("ParkingStatus")}
          title="Check Parking Status"
        />
        <Button
          style={styles.buttons}
          onPress={() =>
            props.navigation.navigate("AccountDetail", {
              email: email,
              name: name,
              numberPlate: numberPlate,
              wallet: wallet,
              id: currentUserUID,
            })
          }
          title="Account Detail"
        />
        <Button
          style={styles.buttons}
          onPress={() =>
            props.navigation.navigate("TopUp", {
              wallet: wallet,
              id: currentUserUID,
            })
          }
          title="Top Up Credit"
        />
        <Button
          style={styles.buttons}
          onPress={() => logOutPress()}
          title="Sign Out"
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    padding: 30,
    justifyContent: "space-evenly",
  },
  buttons: {},
  header: {
    fontSize: 30,
    alignSelf: "center",
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
});

export default HomeScreen;
