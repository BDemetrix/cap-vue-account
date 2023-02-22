
<template>
  <email-sign v-show="!isSigned" @signed="signIn" />
  <email-login v-show="isSigned && !isLogged" @logged="logIn" @to-sign-up="toSignUp"/>
  <home-page v-show="isLogged" :firebaseConfig="firebaseConfig" />
</template>

<script>
import EmailSign from "@/views/EmailSign.vue";
import EmailLogin from "@/views/EmailLogin.vue";
import HomePage from "@/views/HomePage.vue";
import { NativeBiometric } from "capacitor-native-biometric";

export default {
  data() {
    return {
      // fcmSigned: window.localStorage.getItem("fcmSigned"),
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
    },
    toSignUp(isSigned) {
      this.isSigned = isSigned
      window.localStorage.setItem('isSigned', '')
    },

    async performBiometricVerificatin() {
      const result = await NativeBiometric.isAvailable();

      if (!result.isAvailable) {
        alert('Биометри не поддерживается')
        return
      }

      //const isFaceID = result.biometryType == BiometryType.FACE_ID;
      //console.log({isFaceID})
      alert('Тип биоменрии: ' + result.biometryType)

      const verified = await NativeBiometric.verifyIdentity({
        reason: "For easy log in",
        title: "Log in",
        subtitle: "Maybe add subtitle here?",
        description: "Maybe a description too?",
      })
        .then(() => true)
        .catch(() => false);

      if (!verified) {
        alert('Биометри не идентифицирована')
        return
      }

      const credentials = await NativeBiometric.getCredentials({
        server: "www.example.com",
      });

      console.log(credentials)
      alert('Биометри доступна')
    },
  },
  mounted() {
    window.localStorage.setItem("fcmSigned", "")
    this.performBiometricVerificatin()
  },

};
</script>


<style lang="scss">
</style>

