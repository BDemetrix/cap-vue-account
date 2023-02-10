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
      <input
        class="input"
        type="password"
        placeholder="Повторите пароль"
        autocomplete="off"
        v-model="user.repPassword"
      />
      <button class="btn" type="submit" @click="signUp">
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "EmailSignin",
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
    signUp() {
      if (this.user.password !== this.user.repPassword) {
        alert("пароли не совпадают!");
        return;
      }

      const auth = getAuth();

      createUserWithEmailAndPassword(auth, this.user.email, this.user.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          alert(user.uid);
          // ...
          if (user.uid) {
            this.$emit('signed', true);
            window.localStorage.setItem('isSigned', 1);
          }
        })
        .catch((error) => {
          console.log(error);
          window.localStorage.setItem('isSigned', 1);
          alert(error.message)
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // ..
        });
    },
  },
};
</script>
