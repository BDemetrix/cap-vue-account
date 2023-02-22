<template>
  <div class="login wrapper">
    <img class="logo" src="@/assets/logo.png" alt="Логотип" />
    <form class="form" @submit.prevent>
      <input
        class="input"
        type="email"
        placeholder="E-mail"
        autocomplete="email"
        v-model="user.email"
      />
      <input
        class="input"
        type="password"
        placeholder="Пароль"
        autocomplete="off"
        v-model="user.password"
      />
      <button class="btn" type="submit" @click="logIn">Войти</button>

      <button class="link" type="submit" @click="toSignUp">
        Зарегистрироваться
      </button>

      <button class="link" type="submit" @click="bioSignUp">Биометрия</button>

      <!-- <label>
        <input
        @change="reme"
        class="checkbox"
        type="checkbox"
        v-model="remember"
        />
      </label> -->
    </form>
  </div>
</template>

<script>
//import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import { NativeBiometric } from "capacitor-native-biometric";

export default {
  name: "EmailLogin",
  data() {
    return {
      user: {
        email: "",
        password: "",
        repPassword: "",
      },
      remember: null,
      server: "www.example.com",
    };
  },
  methods: {
    logIn() {
      const user = this.user;
      this.firebaseAuthentication(user)
    },

    toSignUp() {
      this.$emit("to-sign-up", false);
    },

    async bioSignUp() {
      const user = await this.performBiometricVerificatin()
      user.email = user.username
      console.log(user)
      this.firebaseAuthentication(user)
    },

    firebaseAuthentication(user) {
      FirebaseAuthentication.signInWithEmailAndPassword({
        email: user.email,
        password: user.password,
      })
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
          this.$emit("logged", true);

          // Save user's credentials
          NativeBiometric.setCredentials({
            username: this.user.email,
            password: this.user.password,
            server: this.server,
          }).then();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          window.localStorage.setItem("isSigned", "");
          return false;
        });
    },

    async performBiometricVerificatin() {
      const result = await NativeBiometric.isAvailable();

      if (!result.isAvailable) {
        alert("Биометри не поддерживается");
        return;
      }

      // const isFaceID = result.biometryType == BiometryType.FACE_ID;
      // console.log({ isFaceID });
      alert("Тип биоменрии: ", result.biometryType);

      const verified = await NativeBiometric.verifyIdentity({
        reason: "For easy log in",
        title: "Log in",
        subtitle: "Maybe add subtitle here?",
        description: "Maybe a description too?",
      })
        .then(() => true)
        .catch(() => false);

      if (!verified) {
        alert("Биометри не идентифицирована");
        return;
      }

      const credentials = await NativeBiometric.getCredentials({
        server: "www.example.com",
      });

      console.log(credentials);
      alert("Биометри доступна");
      return credentials;
    },

    /* rememberMe() {

    } */
  },
};
</script>
