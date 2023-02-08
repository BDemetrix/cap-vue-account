
<template>
  <email-sign v-if="!isSigned" @signed="signIn" />
  <email-login v-if="isSigned && !isLogged" @logged="logIn" />
  <home-page v-if="isLogged" :firebaseConfig="firebaseConfig"/>
</template>

<script>
import EmailSign from "@/views/EmailSign.vue";
import EmailLogin from "@/views/EmailLogin.vue";
import HomePage from "@/views/HomePage.vue";

export default {
  data() {
    return {
      isSigned: window.localStorage.getItem('isSigned'),
      isLogged: false,
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
    };
  },
  components: {
    EmailSign,
    EmailLogin,
    HomePage,
  },
  methods: {
    signIn(isSigned) {
      this.isSigned = isSigned;
    },
    logIn(isLogged) {
      this.isLogged = isLogged;
    }
  },
  mounted() {
    
  },

};
</script>


<style lang="scss">
</style>

