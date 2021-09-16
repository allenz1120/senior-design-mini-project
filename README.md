## Senior Design Mini Project: Calorie counter
# Benjamin Li, Allen Zou

Calorie counter is an application that will let you scan the barcodes of food items and will provide a visual representation of the macros you have consumed. Users are required to login using gmail.

## How to Build
In order to build the calorie counter project, all dependencies need to be installed first. Refer to the **Dependencies** section for a list.

Run ```npm install``` to install all libraries and code dependencies
Run ```expo start -c``` to build the project
	 - This should then launch a window where you can scan the expo QR code with the expo app on your phone

## Source Code

## API
This calorie counter is built on Firebase. We use Firestore to store data from the scanned barcodes. The frontend encapsulates some API functionality to work with the data within Firebase.

GET PAST SCANNED FOODS: getPastScannedFoods
 - getPastScannedFoods will retrieve all previous barcodes scanned and update a bar graph showing selected macros.

POST SCANNED BARCODE: postScannedBarcode
 - postScannedBarcode will add the food item scanned to the firebase database with selected macros and serving size.

## Dependencies
Node (tested with version 14.17.3)
npm (tested with 6.14.13)

## Issues
You may run into an error when downloading the app through the expo app says there are two conflicting views. To fix this, run ```npm uninstall firebase``` then ```expo install firebase```.