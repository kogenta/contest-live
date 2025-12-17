// Firebase Configuration
// INSTRUCTIONS: Replace with your Firebase project credentials
// To get these:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (or use existing)
// 3. Go to Project Settings > General > Your apps
// 4. Click "Add app" or select Web app
// 5. Copy the firebaseConfig object
// 6. Enable Realtime Database in Firebase Console
// 7. Set Realtime Database Rules (IMPORTANT - READ BELOW!)

// ⚠️ SECURITY WARNING - DATABASE RULES ⚠️
// The rules below are for DEMO/TESTING ONLY and allow anyone to read/write data.
// 
// FOR TESTING/DEMO (Copy to Firebase Console > Realtime Database > Rules):
//    {
//      "rules": {
//        ".read": true,
//        ".write": true
//      }
//    }
//
// FOR PRODUCTION, use more secure rules like:
//    {
//      "rules": {
//        "contestants": {
//          ".read": true,
//          ".write": "auth != null"
//        },
//        "scores": {
//          ".read": true,
//          ".write": "auth != null"
//        },
//        "judges": {
//          ".read": "auth != null",
//          ".write": false
//        }
//      }
//    }
//
// Additional Production Security Steps:
// 1. Enable Firebase Authentication
// 2. Change all judge PINs from default "1234" 
// 3. Use environment variables for sensitive config
// 4. Enable App Check to prevent abuse
// 5. Set up Firebase Security Rules properly
// 6. Monitor usage in Firebase Console

const firebaseConfig = {
    apiKey: "AIzaSyB1sIAD13jSE59HPVhMZrVvSfwveBiBd3o",
    authDomain: "animal-contest-vote.firebaseapp.com",
    databaseURL: "https://animal-contest-vote-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "animal-contest-vote",
    storageBucket: "animal-contest-vote.firebasestorage.app",
    messagingSenderId: "794102781188",
    appId: "1:794102781188:web:4b5fd4dda39b95e6d16c51"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Export for use in other files
window.db = database;
