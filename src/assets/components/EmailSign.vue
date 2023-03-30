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
      <button class="btn" type="submit" @click="subscribe">
        Зарегистрироваться
      </button>

      <div class="center">Уже есть кабинет?</div>
      <button class="link" type="button" @click="toLogin">
        Войти
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

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
    ...mapActions(['signUp']),
    ...mapMutations(['updateSigned', 'setLoading']),
    async subscribe() {
      if (this.user.password !== this.user.repPassword) {
        alert("пароли не совпадают!");
        return;
      }
      //this.setLoading(true)
      await this.signUp(this.user)
      //this.setLoading(false)
    },
    toLogin() {
      this.updateSigned('1')
    }
  },
};
</script>
