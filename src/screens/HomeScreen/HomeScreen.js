import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

export default function HomeScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeType, setBarcodeType] = useState(null);
  const [barcodeValue, setBarcodeValue] = useState(null);

  const [promptForServings, setPromptForServings] = useState(false);
  const [servings, setServings] = useState(1);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

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
    setPromptForServings(true);
    setBarcodeType(type);
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