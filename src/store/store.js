import { createStore } from 'vuex'
import user  from "@/store/modules/user";
import nativePush from "@/store/modules/nativePush";

export default createStore({
  state: {
    firebaseConfig: {
      apiKey: "AIzaSyC3TpvymDTk1trjAGIMuZdFcLsxtjUWqFM",
      authDomain: "cap-vue-account.firebaseapp.com",
      databaseURL: "https://cap-vue-account-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "cap-vue-account",
      storageBucket: "cap-vue-account.appspot.com",
      messagingSenderId: "494879929657",
      appId: "1:494879929657:web:bf0babd7627127156fe4e8",
      measurementId: "G-EMY6WBG9KX"
    },
    PUBLIC_VAPID_KEY:
      "BP18qEecjZuO4Yi_xtG6jlmqk7EHGCqpc46zH6cuanWlqL7nXpKyfPJmmToFqdxD55rENrF_STkXjoX4U4KOxJw",
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user, nativePush
  }
})
