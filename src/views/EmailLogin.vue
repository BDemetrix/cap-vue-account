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
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "EmailLogin",
  data() {
    return {
      user: {
        email: "",
        password: "",
        repPassword: "",
      },
    };
  },
  methods: {
    logIn() {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
          this.$emit('logged', true);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          window.localStorage.setItem('isSigned', '');
        });
    },
  },
};
</script>
