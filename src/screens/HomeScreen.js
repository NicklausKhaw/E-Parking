import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, LogBox } from "react-native";
import * as firebase from "firebase";
import { loggingOut } from "../api/firebaseMethods";

//add admin buttons if isAdmin == 1

const HomeScreen = (props) => {
  LogBox.ignoreAllLogs();
  let currentUserUID = firebase.auth().currentUser.uid;
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState("");

  useEffect(() => {
    async function getUserInfo() {
      let doc = await firebase
        .firestore()
        .collection("users")
        .doc(currentUserUID)
        .get();

      if (!doc.exists) {
        Alert.alert("No user data found!");
      } else {
        let dataObj = doc.data();
        setName(dataObj.name);
        setIsAdmin(dataObj.isAdmin);
      }
    }
    getUserInfo();
  });

  const logOutPress = () => {
    loggingOut();
    props.navigation.navigate("Auth");
  };

  console.log(name, isAdmin);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {name}</Text>
      {isAdmin == "1" ? (
        <Button
          style={styles.buttons}
          onPress={() => props.navigation.navigate("AdminHome")}
          title="Admin Home"
        />
      ) : null}
      <Button
        style={styles.buttons}
        onPress={() => props.navigation.navigate("ScanQR")}
        title="Scan QR code"
      />
      <Button
        style={styles.buttons}
        onPress={() => props.navigation.navigate("ParkingStatus")}
        title="Check Parking Status"
      />
      <Button
        style={styles.buttons}
        onPress={() => props.navigation.navigate("AccountDetail")}
        title="Account Detail"
      />
      <Button
        style={styles.buttons}
        onPress={() => props.navigation.navigate("TopUp")}
        title="Top Up Credit"
      />
      <Button
        style={styles.buttons}
        onPress={() => logOutPress()}
        title="Sign Out"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    padding: 30,
    justifyContent: "space-around",
  },
  buttons: {},
  text: {
    fontSize: 30,
    alignSelf: "center",
  },
});

export default HomeScreen;
