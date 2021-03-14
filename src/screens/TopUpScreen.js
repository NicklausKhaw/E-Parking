import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const TopUpScreen = (props) => {
  const wallet = props.navigation.getParam("wallet");
  const id = props.navigation.getParam("id");
  const [amount, setAmount] = useState(0);

  const onSubmitCheck = () => {
    if (amount == 0 || isNaN(amount)) {
      Alert.alert("Enter a valid amount to continue");
    } else {
      props.navigation.navigate("Payment", {
        amount: amount,
        wallet: wallet,
        id: id,
      });
    }
  };

  return (
    <LinearGradient colors={["lightblue", "#ffe3ff"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.header}>Top Up</Text>
        <Text style={styles.text}>Wallet: RM{wallet}</Text>
        <View style={styles.amount}>
          <Text style={{ paddingTop: 10 }}>Enter Amount: RM </Text>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            keyboardType="number-pad"
            onChangeText={(text) => setAmount(text)}
          />
        </View>
        <Button
          color="#6200EE"
          title="Top Up"
          onPress={() => onSubmitCheck()}
        />
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
    paddingBottom: 30,
  },
  amount: {
    flexDirection: "row",
    paddingBottom: 20,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: 100,
    height: 40,
    paddingLeft: 5,
  },
  header: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 30,
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
});

export default TopUpScreen;
