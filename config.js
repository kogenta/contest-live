// Firebase Configuration
// INSTRUCTIONS: Replace with your Firebase project credentials
// To get these:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project (or use existing)
// 3. Go to Project Settings > General > Your apps
// 4. Click "Add app" or select Web app
// 5. Copy the firebaseConfig object
// 6. Enable Realtime Database in Firebase Console
// 7. Set Realtime Database Rules to:
//    {
//      "rules": {
//        ".read": true,
//        ".write": true
//      }
//    }

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Export for use in other files
window.db = database;
