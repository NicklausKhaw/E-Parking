import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import "firebase/firestore";

const AccountDetailScreen = ({ navigation }) => {
  const email = navigation.getParam("email");
  const name = navigation.getParam("name");
  const wallet = navigation.getParam("wallet");
  const id = navigation.getParam("id");
  const [numberPlate, setNumberPlate] = useState(
    navigation.getParam("numberPlate")
  );
  const [edit, setEdit] = useState(false);

  async function updateNumberPlate() {
    let doc = await firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        numberPlate: numberPlate,
      })
      .then(() => {
        console.log("Number Plate Updated");
      });

    alert("Number Plate updated successfully!");
  }

  console.log(email, name, numberPlate, wallet, id);
  return (
    <LinearGradient colors={["lightblue", "#ffe3ff"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.header}>Account Details</Text>
        <Text style={styles.text}>Name: {name}</Text>
        <Text style={styles.text}>Email: {email}</Text>
        <Text style={styles.text}>Wallet: RM{wallet}</Text>
        {!edit ? (
          <View>
            <Text style={styles.text}>Car Number Plate: {numberPlate}</Text>
            <Button
              title="Change Number Plate"
              color="#6200EE"
              onPress={() => setEdit(true)}
            />
          </View>
        ) : (
          <View>
            <View style={styles.inputView}>
              <Text style={styles.text}>Car Number Plate: </Text>
              <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={(text) => {
                  setNumberPlate(text);
                }}
              />
            </View>
            <Button
              title="Confirm"
              color="#6200EE"
              onPress={() => {
                setEdit(false);
                updateNumberPlate();
              }}
            />
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  text: {
    padding: 10,
    fontSize: 20,
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
  inputView: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  input: {
    //paddingHorizontal: 2,
    paddingVertical: 2,
    borderBottomColor: "black",
    borderBottomWidth: 2,
  },
  header: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 30,
  },
});

export default AccountDetailScreen;
