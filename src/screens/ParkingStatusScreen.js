import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { createOpenLink } from "react-native-open-maps";

const ParkingStatusScreen = () => {
  const yosemite = { latitude: 37.865101, longitude: -119.53833 };
  const openYosemite = createOpenLink(yosemite);
  const openYosemiteZoomedOut = createOpenLink({ ...yosemite, zoom: 30 });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Time Entered: </Text>
      <Text style={styles.text}>Location: </Text>
      <Button
        style={styles.button}
        onPress={openYosemite}
        title="Get Location"
      />
    </View>
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
    padding: 30,
  },
  button: {
    padding: 30,
  },
});

export default ParkingStatusScreen;
