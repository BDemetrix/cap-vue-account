import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js"
//import "firebase/database"
//import "firebase/messaging"
//import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyC3TpvymDTk1trjAGIMuZdFcLsxtjUWqFM",
    authDomain: "cap-vue-account.firebaseapp.com",
    databaseURL: "https://cap-vue-account-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cap-vue-account",
    storageBucket: "cap-vue-account.appspot.com",
    messagingSenderId: "494879929657",
    appId: "1:494879929657:web:27ef193d242b67576fe4e8",
    measurementId: "G-0ZFVX3Z8FC"
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig)
const auth = getAuth(fb)
console.log(auth);