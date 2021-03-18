import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCArMEMkIk1rCMCb62odePx2zhOJPzDP2s",
    authDomain: "bt3103-week-6-e0648.firebaseapp.com",
    projectId: "bt3103-week-6-e0648",
    storageBucket: "bt3103-week-6-e0648.appspot.com",
    messagingSenderId: "503588819847",
    appId: "1:503588819847:web:526c07acbcfb43f7acf922",
    measurementId: "G-01R346C19L"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;