# Senior Design Mini Project: Macro Manager
## Benjamin Li, Allen Zou

Macro Manager is an application that will let you scan the barcodes of food items and will provide a visual representation of the macros you have consumed. Users are required to login using gmail.

## How to Build
The application was developed using React-native and Firebase, and makes calls to the FDA API. In order to locally build the application, you need a Firebase database and an FDA API key (obtained here: https://fdc.nal.usda.gov/api-key-signup.html). Once you have a Firebase database, populate the following with your Firebase details.

```src/screens/LoginScreen.js```:
```
13            // Replace ANDROID_CLIENT_ID with android client id
14            androidClientId: 'ANDROID_CLIENT_ID',
15            // behavior:'web',
16            // Replace IOS_CLIENT_ID with ios client id
17            iosClientId: 'IOS_CLIENT_ID',
```

```src/screens/HomeScreen.js```:
```
9             const firebaseConfig = {
10
11               // Replace API_KEY with firebase api key
12               apiKey: "API_KEY",
13
14               // Replace AUTH_DOMAIN with firebase domain
15               authDomain: "AUTH_DOMAIN",
16
17               // Replace DATABASE_URL with database url
18               databaseURL: "DATABASE_URL",
19
20               // Replace PROJECT_ID with project id
21               projectId: "PROJECT_ID",
22
23               // Replace STORAGE_BUCKET with storage bucket
24               storageBucket: "STORAGE_BUCKET",
25
26               // Replace MESSAGING_SENDER_ID with messaging sender id
27               messagingSenderId: "MESSAGING_SENDER_ID",
28
29               // Replace APP_ID with application id
30               appId: "APP_ID",
31
32               measurementId: "G-17PKYZDMTN"
33
34            };
```

```src/screens/ResultsScreen.js```:
```
9             const firebaseConfig = {
10
11               // Replace API_KEY with firebase api key
12               apiKey: "API_KEY",
13
14               // Replace AUTH_DOMAIN with firebase domain
15               authDomain: "AUTH_DOMAIN",
16
17               // Replace DATABASE_URL with database url
18               databaseURL: "DATABASE_URL",
19
20               // Replace PROJECT_ID with project id
21               projectId: "PROJECT_ID",
22
23               // Replace STORAGE_BUCKET with storage bucket
24               storageBucket: "STORAGE_BUCKET",
25
26               // Replace MESSAGING_SENDER_ID with messaging sender id
27               messagingSenderId: "MESSAGING_SENDER_ID",
28
29               // Replace APP_ID with application id
30               appId: "APP_ID",
31
32               measurementId: "G-17PKYZDMTN"
33
34            };
```

Lastly, populate the following with your FDA API key:
```src/screens/HomeScreen.js```
```
83            // Replace API_KEY with FDC ID API key
84            var requestUri = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=API_KEY&query=" + barcode + "&dataType=Branded";
```

In order to compile the calorie counter project, all dependencies need to be installed first. Refer to the **Dependencies** section for a list. Then,

 - Run ```npm install``` to install all libraries and code dependencies
 - Run ```expo start -c``` to build the project
	 - This should then launch a window where you can scan the expo QR code with the expo app on your phone

## Authentication
Authentication for Macro Manager is done through oAuth by Google API. This desgin choice was made for increase security and ease of deployment. By using Google's API, we do not store user passwords on our Firebase database and have a prebuilt login screen for users to use

## API
This calorie counter is built on Firebase. We use Firestore to store data from the scanned barcodes. The frontend encapsulates some API functionality to work with the data within Firebase.

GET PAST SCANNED FOODS: getPastScannedFoods
 - getPastScannedFoods will retrieve all previous barcodes scanned and update a bar graph showing selected macros.

POST SCANNED BARCODE: postScannedBarcode
 - postScannedBarcode will add the food item scanned to the firebase database with selected macros and serving size.

## Database
Each scanned item becomes a document in the firebase collection called "scannedFood". The document ID is the UPC barcode of the item and it is populated with the macros listed below. 
![image](https://user-images.githubusercontent.com/55994268/133818351-dbebf316-db97-4f92-ba3b-9a12f4c7d31d.png)


## Dependencies
Node (tested with version 14.17.3)
npm (tested with 6.14.13)

## Issues
You may run into an error when downloading the app through the expo app says there are two conflicting views. To fix this, run ```npm uninstall firebase``` then ```expo install firebase```.
