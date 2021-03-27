import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import "firebase/firestore";

const PaymentScreen = ({ navigation }) => {
  const amount = parseFloat(navigation.getParam("amount"));
  const wallet = parseFloat(navigation.getParam("wallet"));
  const id = navigation.getParam("id");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [name, setName] = useState("");

  async function updateWallet() {
    let doc = await firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        wallet: wallet + amount,
      })
      .then(() => {
        createAlert("Top Up Successful");
      });
  }

  const onSubmitCheck = () => {
    const nameRegex = /^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$/;
    const numberRegex = /^[0-9]+$/;

    if (numberRegex.test(cardNumber) === false || cardNumber.length < 12) {
      createAlert("Invalid credit card number entered");
      return;
    }
    if (nameRegex.test(name) === false) {
      createAlert("Invalid name entered");
      return;
    }
    if (
      month < 1 ||
      month > 12 ||
      numberRegex.test(month) === false ||
      year < 1
    ) {
      createAlert("Invalid date entered");
      return;
    }
    if (numberRegex.test(cvv) === false || cvv.length != 3) {
      createAlert("Invalid cvv entered");
      return;
    }

    updateWallet();
    navigation.navigate("Home");
  };

  const createAlert = (message) => {
    Alert.alert(message);
  };

  return (
    <LinearGradient colors={["lightblue", "#ffe3ff"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.header}>Payment</Text>
        <Text style={{ paddingBottom: 10, color: "red" }}>
          Amount to Top Up: RM{amount}
        </Text>
        <Text style={styles.text}>Card Number: </Text>
        <TextInput
          style={styles.cardInput}
          placeholder="123412341234"
          keyboardType="number-pad"
          maxLength={12}
          onChangeText={(text) => setCardNumber(text)}
        />
        <Text style={styles.text}>Name on Card: </Text>
        <TextInput
          style={styles.cardInput}
          placeholder="John"
          keyboardType="default"
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.text}>Expiry Date: </Text>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.smallInput}
            placeholder="MM"
            keyboardType="number-pad"
            onChangeText={(text) => {
              setMonth(text);
            }}
            maxLength={2}
          />
          <Text style={{ paddingTop: 12, fontSize: 25 }}> / </Text>
          <TextInput
            style={styles.smallInput}
            placeholder="YY"
            keyboardType="number-pad"
            onChangeText={(text) => {
              setYear(text);
            }}
            maxLength={2}
          />
        </View>
        <Text style={styles.text}>CVV: </Text>
        <TextInput
          style={styles.smallInput}
          placeholder="123"
          keyboardType="number-pad"
          onChangeText={(text) => {
            setCvv(text);
          }}
          maxLength={3}
        />
        <Button
          title="Pay Now"
          color="#6200EE"
          onPress={() => {
            onSubmitCheck();
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
  header: {
    alignSelf: "center",
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 25,
  },
  container: {
    margin: 10,
    padding: 20,
    justifyContent: "space-around",
  },
  cardInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    fontSize: 16,
    paddingLeft: 5,
  },
  text: {
    fontSize: 18,
    color: "#8803fc",
    fontWeight: "bold",
  },
  smallInput: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    fontSize: 16,
    width: 50,
    paddingLeft: 10,
  },
});

export default PaymentScreen;
