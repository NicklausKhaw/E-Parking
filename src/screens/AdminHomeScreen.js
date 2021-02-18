import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const HomeScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome Admin</Text>
      <Button
        style={styles.buttons}
        onPress={() => {}}
        title="View Car Parks"
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
