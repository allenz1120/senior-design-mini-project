import { LineChart, BarChart } from "react-native-chart-kit";
import { Text, View, Button } from 'react-native';
// import { React, useState } from 'react';
import React, { useState } from 'react';
import * as firebase from 'firebase'
import 'firebase/firestore';
import { useEffect } from "react/cjs/react.development";
import styles from './styles';

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


export default function ResultsScreen() {
    const [macroData, setMacroData] = useState([
        0, 0, 0, 0
    ]);
    const [pulledData, setPulledData] = useState(false);
    var calorieTotal = 0;
    var proteinTotal = 0;
    var fatTotal = 0;
    var carbsTotal = 0;
    var servings = 1;

    async function getPastFoods() {
        const snapshot = await firebase.firestore().collection('scannedFood').get()
        return snapshot.docs.map(doc => {
            doc.data()
            if (doc.data().calorieCount) {
                servings = doc.data().servingsCount;
                calorieTotal = Math.round(calorieTotal + doc.data().calorieCount * servings);
                proteinTotal = Math.round(proteinTotal + doc.data().proteinCount * servings);
                fatTotal = Math.round(fatTotal + doc.data().fatCount * servings);
                carbsTotal = Math.round(carbsTotal + doc.data().carbsCount * servings);

            }
            setMacroData([
                calorieTotal,
                proteinTotal,
                fatTotal,
                carbsTotal
            ])
            console.log(calorieTotal);
            console.log(doc.data())
        });
    }

    useEffect(() => {
        (async () => {
            getPastFoods();
        })
    })
    return (
        <View>
            <Button title={'Get latest data'} onPress={() => { getPastFoods(); setPulledData(true) }} />
            <Text style={styles.Text}>Macros</Text>
            <BarChart
                data={{
                    labels: ["Calories", "Protein", "Fat", "Carbs"],
                    datasets: [
                        {
                            data: macroData
                        }
                    ]
                }}
                width={350} // from react-native
                height={200}
                yAxisLabel=""
                yAxisSuffix="mg"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
            {pulledData && <Text style={styles.Text}>
                Calories: {macroData[0]} kCal
                {'\n'}Protein: {macroData[1]} mg
                {'\n'}Fat: {macroData[2]} mg
                {'\n'}Carbs: {macroData[3]} mg
            </Text>}
            {!pulledData && <Text style={styles.Text}>Pull Latest Data</Text>}
        </View>
    )
}
