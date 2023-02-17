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

      <button class="link" type="submit" @click="toLogin">
        Войти
      </button>
    </form>
  </div>
</template>

<script>
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

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

      const user = this.user;
      FirebaseAuthentication.createUserWithEmailAndPassword({
        email: user.email,
        password: user.password,
      })
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          // ...
          if (user) {
            this.$emit('signed', true);
            window.localStorage.setItem('isSigned', 1);
          }
        })
        .catch((error) => {
          console.log(error);
          if ( error.code === 'auth/email-already-in-use') {
            alert('Такой логин уже существует')
            this.$emit('signed', true);
            window.localStorage.setItem('isSigned', 1);
          }
          // ..
        });
    },
    toLogin() {
      this.$emit('signed', true);
    }
  },
};
</script>
