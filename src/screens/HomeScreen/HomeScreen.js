import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, TouchableNativeFeedbackBase } from 'react-native';
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
  const [itemName, setItemName] = useState(null);
  const [calorieCount, setCalorieCount] = useState(0);

  const [promptForServings, setPromptForServings] = useState(false);
  const [servings, setServings] = useState(1);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  async function uploadDb(barcode, item, calories) {
    console.log(item);
    console.log(calories);
    const dbh = firebase.firestore();

    dbh.collection("scannedFood").doc(barcode).set({
      itemName: item,
      calorieCount: calories,
      servings: servings
      
})
  }
  const retrieveResult = (barcode) => {
    var requestUri = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=" + barcode + "&dataType=Branded";
    console.log(requestUri);
    axios.get(requestUri)
            .then(response => {
              console.log(response);
              setItemName(response.data.foods[0].description);
              setCalorieCount(response.data.foods[0].foodNutrients[3].value); // TODO change to grab by name
              item = response.data.foods[0].description;
              calories = response.data.foods[0].foodNutrients[3].value;
              uploadDb(barcode, item, calories);
            })
            .catch(error => {
              console.log(error);
            })
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setPromptForServings(true);
    setBarcodeType(type);
    // uncomment the line below for IOS
    // data = data.substring(1)
    setBarcodeValue(data);
    console.log(data);
    console.log(barcodeValue);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    retrieveResult(data);
  };

  const GetRecipe = () => {
    // firebase scanned items
  }

  const PostScannedItem = ({ name, calories }) => {
    // firebase scanned item
    // barcode, item name, calories
  }

  const createAlert = () =>
    Alert.alert(
      "Choose Servings",
      "I know this is jank AF",
      [
        {
          text: "1",
          onPress: () => setServings(1),
        },
        {
          text: "2",
          onPress: () => setServings(2),
        },
        { text: "3", 
          onPress: () => setServings(3),
        }
      ]
    );

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
      {promptForServings && <Button title={'Choose Servings'} onPress={createAlert} />}
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