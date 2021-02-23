import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as firebase from "firebase";
import { loggingOut } from "../api/firebaseMethods";

const HomeScreen = (props) => {
  let currentUserUID = firebase.auth().currentUser.uid;
  const [name, setName] = useState("");

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
      }
    }
    getUserInfo();
  });

  const logOutPress = () => {
    loggingOut();
    props.navigation.navigate("Auth");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {name}</Text>
      <Button
        style={styles.buttons}
        onPress={() => {}}
        title="View Car Parks"
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
