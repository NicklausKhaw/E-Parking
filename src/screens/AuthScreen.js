import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, Text, TextInput, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as firebase from "firebase";
import apiKeys from "../../config/keys";
import { signIn } from "../api/firebaseMethods";

const AuthScreen = (props) => {
  if (!firebase.apps.length) {
    console.log("Connected with Firebase");
    firebase.initializeApp(apiKeys.firebaseConfig);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.navigation.navigate("Stack");
      }
    });
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitCheck = () => {
    console.log({ email, password });
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailRegex.test(email) === false) {
      createErrorAlert();
      return;
    }
    if (password.length < 8) {
      createErrorAlert();
      return;
    }

    signIn(email, password);
  };

  const createErrorAlert = () =>
    Alert.alert(
      "Invalid input",
      "Please enter the correct E-mail and Password",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );

  return (
    <LinearGradient colors={["lightblue", "#ffe3ff"]} style={styles.gradient}>
      <View style={styles.screen}>
        <Text style={styles.text}>Sign In</Text>
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
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            onPress={() => {
              onSubmitCheck(email, password);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Switch to Sign Up"
            onPress={() => props.navigation.navigate("SignUp")}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    //alignItems: "center",
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

export default AuthScreen;
