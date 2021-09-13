import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import * as firebase from 'firebase'
import 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyA1upfgKqCXxVxaXGBHCt3zPXHb3NjKL9w",

  authDomain: "senior-design-mini-proje-c95b5.firebaseapp.com",

  databaseURL: "https://senior-design-mini-proje-c95b5-default-rtdb.firebaseio.com",

  projectId: "senior-design-mini-proje-c95b5",

  storageBucket: "senior-design-mini-proje-c95b5.appspot.com",

  messagingSenderId: "503443879304",

  appId: "1:503443879304:web:f11c62f2888ae75e35f63d",

  measurementId: "G-17PKYZDMTN"

};

try {
  firebase.initializeApp(firebaseConfig)
  } catch (err) {
  // we skip the "already exists" message which is
  // not an actual error when we're hot-reloading
  if (!/already exists/.test(err.message)) {
  console.error('Firebase initialization error', err.stack)
  }
  }


export default function HomeScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeType, setBarcodeType] = useState(null);
  const [barcodeValue, setBarcodeValue] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function uploadDb() {
    const dbh = firebase.firestore();

    dbh.collection("scannedFood").doc("12321").set({
      barcode:"1231212",
      calorieCount: "1002",
      itemName:"Pudding"
})
  }
  const retrieveResult = (barcode) => {
    var requestUri = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=" + barcode + "&dataType=Branded";
    console.log(requestUri);
    axios.get(requestUri)
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            })
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setBarcodeType(type);
    //add this line for IOS
    data = data.substring(1)
    setBarcodeValue(data);
    console.log(data);
    console.log(barcodeValue);
    uploadDb();
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    retrieveResult(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission.</Text>;
  }
  if (hasPermission === false) {
    return <Text>You need to give permission to access the camera.</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });