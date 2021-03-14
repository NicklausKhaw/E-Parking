import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";

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

  return (
    <LinearGradient colors={["lightblue", "#ffe3ff"]} style={styles.gradient}>
      <Text style={styles.text}>Admin Home Screen</Text>
      <View style={styles.container}>
        <Button
          style={styles.buttons}
          onPress={() => props.navigation.navigate("ViewCarPark")}
          title="View Car Parks"
        />
        <Button
          style={styles.buttons}
          onPress={() => props.navigation.navigate("AddCarPark")}
          title="Add Car Park"
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
  text: {
    fontSize: 30,
    alignSelf: "center",
    paddingTop: 30,
    fontWeight: "bold",
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
});

export default HomeScreen;
