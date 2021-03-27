import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import "firebase/firestore";

const ViewParkedCarsScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("parking")
      .where("carpark", "==", id)
      .onSnapshot((querySnapshot) => {
        const cars = [];

        querySnapshot.forEach((documentSnapshot) => {
          cars.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setCars(cars);
        setLoading(false);

        if (cars.length == 0) {
          alert("No cars are currently parked here");
          navigation.pop();
        }
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  console.log(cars);
  return (
    <LinearGradient colors={["lightblue", "#ffe3ff"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.header}>Cars Parked at {id}</Text>
        <FlatList
          keyExtractor={(item) => item.key}
          data={cars}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.button}>
                <Text style={styles.item}>{item.key}</Text>
              </TouchableOpacity>
            );
          }}
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
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    fontSize: 20,
    alignSelf: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 30,
    padding: 20,
    color: "blue",
  },
  button: {
    borderWidth: 1,
    paddingHorizontal: 100,
    paddingVertical: 20,
    borderColor: "green",
  },
});

export default ViewParkedCarsScreen;
