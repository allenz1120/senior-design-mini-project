import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import axios from 'axios';

export default function App() {
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
    setBarcodeValue(data);
    console.log(barcodeValue);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    retrieveResult(barcodeValue);
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