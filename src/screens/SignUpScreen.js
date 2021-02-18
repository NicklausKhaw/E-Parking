import React, { useState } from "react";
import { TextInput, View, StyleSheet, Button, Text, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SignUpScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [numberPlate, setNumberPlate] = useState("");

  return (
    <LinearGradient colors={["lightblue", "#ffe3ff"]} style={styles.gradient}>
      <View style={styles.screen}>
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
        {/* <Input
          id="email"
          label="Car Number Plate"
          keyboardType="default"
          required
          autoCapitalize="none"
          errorMessage="Please enter a valid car number plate"
          onInputChange={() => {}}
          initialValue=""
        /> */}
        <Text style={styles.label}>
          Car Number Plate (Not required for admin account)
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
            onPress={() => onSubmitCheck(email, password, numberPlate, props)}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const onSubmitCheck = (email, password, numberPlate, props) => {
  console.log({ email, password, numberPlate });
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const adminEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@utar.my/;

  if (emailRegex.test(email) === false) {
    createErrorAlert();
    return;
  }
  if (password.length < 8) {
    createErrorAlert();
    return;
  }

  if (adminEmailRegex.test(email) === true) {
    props.navigation.navigate("AdminHome");
  } else {
    if (numberPlate.length < 2) {
      createErrorAlert();
      return;
    }
    props.navigation.navigate("Stack");
  }
};

const createErrorAlert = () =>
  Alert.alert(
    "Invalid input",
    "Please enter the correct E-mail, Password and Car Number Plate",
    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
    { cancelable: false }
  );

SignUpScreen.navigationOptions = {
  headerTitle: "Sign Up",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //justifyContent: "center",
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

export default SignUpScreen;
