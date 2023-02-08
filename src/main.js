import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import '@/assets/scss/style.scss'
// import router from './router'
// import store from './store'

import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import "firebase/auth"
import "firebase/database"
import "firebase/messaging"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyC3TpvymDTk1trjAGIMuZdFcLsxtjUWqFM",
    authDomain: "cap-vue-account.firebaseapp.com",
    databaseURL: "https://cap-vue-account-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "cap-vue-account",
    storageBucket: "cap-vue-account.appspot.com",
    messagingSenderId: "494879929657",
    appId: "1:494879929657:web:bf0babd7627127156fe4e8",
    measurementId: "G-EMY6WBG9KX"
};

// Initialize Firebase
const fb = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

createApp(App).use(fb).mount('#app')
