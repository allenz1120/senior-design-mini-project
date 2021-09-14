import { LineChart } from "react-native-chart-kit";
import { Text, View, Button } from 'react-native';
import React from 'react'
import * as firebase from 'firebase'
import 'firebase/firestore';
import { useEffect } from "react/cjs/react.development";

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
    async function getMarker() {
        console.log("INSIDE GETMARKER")
        const snapshot = await firebase.firestore().collection('scannedFood').get()
        return snapshot.docs.map(doc => {
            doc.data()
            console.log(doc.data())
        });
    }

    useEffect(() => {
        (async () => {
            getMarker();
        })
    })
    return (
        <View>
            <Text>
                Helloworld
            </Text>
            <Button title={'Tap to Scan Again'} onPress={() => getMarker()} />
        </View>
        //     <View>
        //         <Text>Bezier Line Chart</Text>
        //         <LineChart
        //             data={{
        //                 labels: ["January", "February", "March", "April", "May", "June"],
        //                 datasets: [
        //                     {
        //                         data: [
        //                             Math.random() * 100,
        //                             Math.random() * 100,
        //                             Math.random() * 100,
        //                             Math.random() * 100,
        //                             Math.random() * 100,
        //                             Math.random() * 100
        //                         ]
        //                     }
        //                 ]
        //             }}
        //             width={350} // from react-native
        //             height={200}
        //             yAxisLabel="$"
        //             yAxisSuffix="k"
        //             yAxisInterval={1} // optional, defaults to 1
        //             chartConfig={{
        //                 backgroundColor: "#e26a00",
        //                 backgroundGradientFrom: "#fb8c00",
        //                 backgroundGradientTo: "#ffa726",
        //                 decimalPlaces: 2, // optional, defaults to 2dp
        //                 color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        //                 labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        //                 style: {
        //                     borderRadius: 16
        //                 },
        //                 propsForDots: {
        //                     r: "6",
        //                     strokeWidth: "2",
        //                     stroke: "#ffa726"
        //                 }
        //             }}
        //             bezier
        //             style={{
        //                 marginVertical: 8,
        //                 borderRadius: 16
        //             }}
        //         />
        //     </View>
    )
}
