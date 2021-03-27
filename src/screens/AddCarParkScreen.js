import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import "firebase/firestore";

const AddCarParkScreen = (props) => {
  const [id, setId] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [rate, setRate] = useState(0);

  async function addCarPark() {
    let doc = await firebase
      .firestore()
      .collection("carparks")
      .doc(id)
      .set({
        coordinates: coordinates,
        parkingRate: rate,
      })
      .then(() => {
        Alert.alert("Car Park Added Succesfully!");
        props.navigation.navigate("AdminHome");
      });
  }

  const onSubmitCheck = () => {
    const coordinatesRegex = /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/;
    if (id.length == 0) {
      Alert.alert("Invalid car park ID entered");
      return;
    }
    if (coordinatesRegex.test(coordinates) === false) {
      Alert.alert("Invalid coordinates entered");
      return;
    }
    if (isNaN(rate)) {
      Alert.alert("Invalid parking rate entered");
      return;
    }
    addCarPark();
  };

  return (
    <LinearGradient colors={["lightblue", "#ffe3ff"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.header}>Add a new Car Park</Text>
        <Text style={styles.text}>Carpark Id: </Text>
        <TextInput
          style={styles.input}
          placeholder="carpark"
          keyboardType="default"
          onChangeText={(text) => setId(text)}
        />
        <Text style={styles.text}>Coordinates: </Text>
        <TextInput
          style={styles.input}
          placeholder="1.223456, 3.4545455"
          keyboardType="numbers-and-punctuation"
          onChangeText={(text) => setCoordinates(text)}
        />
        <View style={styles.inputView}>
          <Text style={styles.rateText}>Parking Rate (Per Hour): RM</Text>
          <TextInput
            style={styles.smallInput}
            keyboardType="number-pad"
            placeholder="2"
            onChangeText={(text) => {
              setRate(parseFloat(text));
            }}
          />
        </View>
        <Button
          title="Add Car Park"
          color="#6200EE"
          onPress={() => onSubmitCheck()}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: "100%",
    height: "100%",
  },
  container: {
    margin: 10,
    padding: 20,
    justifyContent: "space-around",
  },
  header: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 25,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    fontSize: 16,
    paddingLeft: 5,
  },
  smallInput: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    fontSize: 16,
    width: 50,
    paddingLeft: 10,
  },
  text: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  inputView: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  rateText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    paddingTop: 15,
  },
});

export default AddCarParkScreen;
