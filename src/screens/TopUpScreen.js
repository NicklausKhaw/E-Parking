import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

const TopUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wallet: RM </Text>
      <View style={styles.amount}>
        <Text style={styles.text}>Enter Amount: RM </Text>
        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="number-pad"
        />
      </View>
      <Button title="Top Up" />
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
  amount: {
    flexDirection: "row",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: 100,
  },
  button: {
    padding: 30,
    alignSelf: "baseline",
  },
});

export default TopUpScreen;
