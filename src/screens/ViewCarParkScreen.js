import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

const ViewCarParkScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [carParks, setCarParks] = useState([]);

  useEffect(() => {
    const subscriber = firebase
      .firestore()
      .collection("carparks")
      .onSnapshot((querySnapshot) => {
        const carparks = [];

        querySnapshot.forEach((documentSnapshot) => {
          carparks.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setCarParks(carparks);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  console.log(carParks);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Car Park List</Text>
      <FlatList
        keyExtractor={(item) => item.key}
        data={carParks}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.navigate("CarParkDetail", {
                  id: item.key,
                  parkingRate: item.parkingRate,
                });
              }}
            >
              <Text style={styles.item}>{item.key}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    fontSize: 20,
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
  },
});

export default ViewCarParkScreen;
