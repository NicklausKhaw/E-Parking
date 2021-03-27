import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as firebase from "firebase";
import "firebase/firestore";

export default function ScanQRScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const numberPlate = props.navigation.getParam("numberPlate");
  const wallet = props.navigation.getParam("wallet");
  const id = props.navigation.getParam("id");

  useEffect(() => {
    var date = new Date();
    setCurrentDate(date);
  }, []);

  async function addParkingData(data) {
    let doc = await firebase
      .firestore()
      .collection("parking")
      .doc(numberPlate)
      .set({
        carpark: data,
        enter: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        alert(`Entered ${data} on ${currentDate}`);
        props.navigation.pop();
      });
  }

  async function checkQR(data) {
    let doc = await firebase
      .firestore()
      .collection("carparks")
      .doc(data)
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          addParkingData(data);
          console.log("This QR code exists");
        }
      });
  }

  async function checkParkingDetail(data) {
    let doc = await firebase
      .firestore()
      .collection("parking")
      .doc(numberPlate)
      .get()
      .then((documentSnapshot) => {
        //if parking data does not exist, go to check qr code and add new parking data
        if (documentSnapshot.exists == false) {
          checkQR(data);
        } else {
          checkMatch(data);
        }
      });
  }

  async function checkMatch(data) {
    let doc = await firebase
      .firestore()
      .collection("carparks")
      .doc(data)
      .get()
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          const parkingRate = docSnapshot.data().parkingRate;
          calculateTime(data, parkingRate);
        }
      });
  }

  async function calculateTime(data, parkingRate) {
    let doc = await firebase
      .firestore()
      .collection("parking")
      .doc(numberPlate)
      .get()
      .then((docSnapshot) => {
        const date = docSnapshot.data().enter;
        const millis = date.toMillis();

        const now = Date.now();

        const elapsed = now - millis;
        const difference = Math.round(elapsed / 1000 / 60); //convert the difference in millisecond to minutes

        console.log("Enter: " + millis);
        console.log("Now: " + now);
        console.log("difference in minutes: " + difference);
        console.log("Parking Rate: " + parkingRate);
        console.log("Wallet: " + wallet);
        calculateFee(difference, parkingRate, data);
      });
  }

  async function deleteParkingDetail(data, fee) {
    let doc = await firebase
      .firestore()
      .collection("parking")
      .doc(numberPlate)
      .delete()
      .then(() => {
        alert(`Exit ${data} on ${currentDate}, RM${fee} deducted from wallet`);
        props.navigation.pop();
      });
  }

  async function updateWallet(data, balance, fee) {
    let doc = await firebase
      .firestore()
      .collection("users")
      .doc(id)
      .update({
        wallet: balance,
      })
      .then(() => {
        deleteParkingDetail(data, fee);
      });
  }

  const calculateFee = (difference, parkingRate, data) => {
    var hours = Math.floor(difference / 60);
    var minutes = difference % 60;

    console.log(hours + " hours and " + minutes + " minutes");

    if (difference % 60 == 0) {
      console.log(hours + " hours");
    } else {
      hours++;
      console.log(hours + " hours");
    }

    const fee = hours * parkingRate;

    if (wallet < fee) {
      console.log("Insufficient balance in wallet");
      alert(`Insufficient balance in wallet, fee is RM${fee}`);
      props.navigation.pop();
    } else {
      const balance = wallet - fee;
      updateWallet(data, balance, fee);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //on scan
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    checkParkingDetail(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button
          title={"QR code does not match, Tap to Scan Again"}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
}
