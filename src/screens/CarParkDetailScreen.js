import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

const CarParkDetailScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const parkingRate = navigation.getParam("parkingRate");
  const [rate, setRate] = useState(parkingRate);

  return (
    <View>
      <Text>{id}</Text>
      <Text>{rate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CarParkDetailScreen;
