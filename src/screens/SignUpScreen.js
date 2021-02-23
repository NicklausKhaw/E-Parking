import React, { useState } from "react";
import { TextInput, View, StyleSheet, Button, Text, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { registration } from "../api/firebaseMethods";

const SignUpScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [numberPlate, setNumberPlate] = useState("");

  const emptyState = () => {
    setName("");
    setEmail("");
    setPassword("");
    setNumberPlate("");
  };

  const onSubmitCheck = (name, email, password, numberPlate) => {
    console.log({ email, password, numberPlate });
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const adminEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@utar.my/;

    if (name.length < 1) {
      createErrorAlert();
      return;
    }

    if (emailRegex.test(email) === false) {
      createErrorAlert();
      return;
    }
    if (password.length < 8) {
      createErrorAlert();
      return;
    }

    if (adminEmailRegex.test(email) === true) {
      registration(email, password, name, numberPlate, "1");
      emptyState();
    } else {
      if (numberPlate.length < 2) {
        createErrorAlert();
        return;
      } else {
        registration(email, password, name, numberPlate, "0");
        emptyState();
      }
    }
  };

  return (
    <LinearGradient colors={["lightblue", "#ffe3ff"]} style={styles.gradient}>
      <View style={styles.screen}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          required
          autoCapitalize="words"
          onChangeText={(text) => setName(text)}
        />
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          required
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          secureTextEntry
          required
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />
        <Text style={styles.label}>
          Car Number Plate
          <Text style={{ color: "red" }}>
            {" "}
            (Not required for admin account)
          </Text>
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="default"
          required
          autoCapitalize="characters"
          onChangeText={(text) => setNumberPlate(text)}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Sign Up"
            onPress={() => onSubmitCheck(name, email, password, numberPlate)}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const createErrorAlert = () =>
  Alert.alert(
    "Invalid input",
    "Please enter the correct Name, E-mail, Password and Car Number Plate",
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );

SignUpScreen.navigationOptions = {
  headerTitle: "Sign Up",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 40,
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    marginTop: 10,
  },
  label: {
    fontWeight: "bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
  },
});

export default SignUpScreen;
