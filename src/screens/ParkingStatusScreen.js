import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import openMap from "react-native-open-maps";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import "firebase/firestore";

const ParkingStatusScreen = (props) => {
  const numberPlate = props.navigation.getParam("numberPlate");
  const [time, setTime] = useState("");
  const [carpark, setCarpark] = useState("");
  const [parkingRate, setParkingRate] = useState(0);
  const [fee, setFee] = useState(0);
  const [coordinates, setCoordinates] = useState("");

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("parking")
      .doc(numberPlate)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists == false) {
          props.navigation.pop();
          alert("No Parking Details found");
        } else {
          let doc = documentSnapshot.data();

          let timeObject = new Date(doc.enter.toDate());
          setTime(timeObject.toString());
          setCarpark(doc.carpark);

          getCarParkDetails();
          const date = doc.enter;
          const millis = date.toMillis();
          const now = Date.now();
          const elapsed = now - millis;
          const difference = Math.round(elapsed / 1000 / 60); //convert the difference in millisecond to minutes
          calculateFee(difference);
        }
      });
  });

  async function getCarParkDetails() {
    let doc = await firebase
      .firestore()
      .collection("carparks")
      .doc(carpark)
      .get()
      .then((documentSnapshot) => {
        setParkingRate(documentSnapshot.data().parkingRate);
        setCoordinates(documentSnapshot.data().coordinates);
        console.log(coordinates);
      });
  }

  const calculateFee = (difference) => {
    var hours = Math.floor(difference / 60);
    var minutes = difference % 60;

    console.log(hours + " hours and " + minutes + " minutes");

    if (difference % 60 == 0) {
      console.log(hours + " hours");
    } else {
      hours++;
      console.log(hours + " hours");
    }

    setFee(hours * parkingRate);
  };

  const goToLocation = () => {
    openMap({
      zoom: 18,
      end: coordinates,
      navigate_mode: "preview",
    });
  };

  return (
    <LinearGradient colors={["lightblue", "#ffe3ff"]} style={styles.gradient}>
      <View style={styles.container}>
        <View style={{ borderWidth: 1, backgroundColor: "#C5A3FF" }}>
          <Text style={styles.text}>Time Entered: </Text>
          <Text style={styles.data}>{time}</Text>
        </View>
        <View style={{ borderWidth: 1, backgroundColor: "#C5A3FF" }}>
          <Text style={styles.text}>Number Plate: </Text>
          <Text style={styles.data}>{numberPlate}</Text>
        </View>
        <View style={{ borderWidth: 1, backgroundColor: "#C5A3FF" }}>
          <Text style={styles.text}>Car Park: </Text>
          <Text style={styles.data}>{carpark}</Text>
        </View>
        <View style={{ borderWidth: 1, backgroundColor: "#C5A3FF" }}>
          <Text style={styles.text}>Current Parking Fee: </Text>
          <Text style={styles.data}>RM{fee}</Text>
        </View>
        <View style={{ padding: 20 }}>
          <Button
            color="#6200EE"
            style={styles.button}
            onPress={goToLocation}
            title="Get Location"
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    padding: 30,
    justifyContent: "flex-start",
  },
  text: {
    paddingHorizontal: 5,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  button: {
    padding: 30,
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
  data: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
});

export default ParkingStatusScreen;
