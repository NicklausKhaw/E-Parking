import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AccountDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: </Text>
      <Text style={styles.text}>Email: </Text>
      <Text style={styles.text}>Car Number Plate: </Text>
      <Text style={styles.text}>Wallet: RM</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    padding: 20,
    justifyContent: "flex-start",
  },
  text: {
    padding: 10,
    fontSize: 20,
  },
});

export default AccountDetailScreen;
