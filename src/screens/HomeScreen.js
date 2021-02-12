import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HomeScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <Button
        style={styles.buttons}
        onPress={() => props.navigation.navigate("ScanQR")}
        title="Scan QR code"
      />
      <Button
        style={styles.buttons}
        onPress={() => props.navigation.navigate("ParkingStatus")}
        title="Check Parking Status"
      />
      <Button
        style={styles.buttons}
        onPress={() => props.navigation.navigate("AccountDetail")}
        title="Account Detail"
      />
      <Button
        style={styles.buttons}
        onPress={() => props.navigation.navigate("TopUp")}
        title="Top Up Credit"
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
