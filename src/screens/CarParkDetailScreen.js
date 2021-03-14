import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";

const CarParkDetailScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const parkingRate = navigation.getParam("parkingRate");
  const [rate, setRate] = useState(parkingRate);
  const [edit, setEdit] = useState(false);

  async function updateParkingRate() {
    let doc = await firebase
      .firestore()
      .collection("carparks")
      .doc(id)
      .update({
        parkingRate: rate,
      })
      .then(() => {
        console.log("Parking Rate Updated");
      });

    alert("Parking Rate updated successfully!");
  }

  async function deleteCarPark() {
    let doc = await firebase
      .firestore()
      .collection("carparks")
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert("Car Park Deleted");
        navigation.navigate("ViewCarPark");
      });
  }

  return (
    <LinearGradient colors={["lightblue", "#ffe3ff"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.header}>Car Park Details</Text>
        <Text style={styles.text}>Car Park : {id}</Text>
        {!edit ? (
          <View>
            <Text style={styles.text}>Parking Rate (Per Hour): {rate}</Text>
            <Button
              title="Change Parking Rate"
              color="#6200EE"
              onPress={() => setEdit(true)}
            />
          </View>
        ) : (
          <View>
            <View style={styles.inputView}>
              <Text style={styles.text}>Parking Rate (Per Hour): RM</Text>
              <TextInput
                style={styles.input}
                keyboardType="number-pad"
                onChangeText={(text) => {
                  setRate(parseFloat(text));
                }}
              />
            </View>
            <Button
              title="Confirm"
              color="#6200EE"
              onPress={() => {
                setEdit(false);
                updateParkingRate();
              }}
            />
          </View>
        )}
        <View style={styles.deleteButton}>
          <Button
            title="Delete Car Park"
            color="red"
            onPress={() => {
              Alert.alert(
                "Are you sure you want to delete this carpark?",
                "Press OK to confirm delete",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      deleteCarPark();
                    },
                  },
                  {
                    text: "Cancel",
                    onPress: () => {
                      return;
                    },
                  },
                ]
              );
            }}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  text: {
    fontSize: 20,
    padding: 20,
  },
  input: {
    height: 40,
    marginVertical: 15,
    borderWidth: 1,
    fontSize: 16,
    width: 50,
    paddingLeft: 10,
  },
  inputView: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
  deleteButton: {
    position: "absolute",
    paddingHorizontal: 20,
    bottom: -100,
  },
});

export default CarParkDetailScreen;
