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

      <button class="link" type="submit" @click="updateSigned('')">
        Зарегистрироваться
      </button>
      <button class="link" type="button" v-if="isSigned || isLogged" @click="exit">
          Выйти
      </button>

      <button class="link" type="submit" @click="bioSignUp" v-if="biometryType.prop">{{biometryType.name}}</button>

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
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "EmailLogin",
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      remember: null,
      server: "www.example.com",
    };
  },
  computed: {
    ...mapGetters(['isSigned', 'isLogged', 'biometryType'])
  },
  methods: {
    ...mapActions(['logInWithEmailAndPassword', 'clearNativeBiometric', 'logOut']),
    ...mapMutations(['updateSigned']),
    async logIn() {
      await this.logInWithEmailAndPassword(this.user)
      this.$router.push('/push')
    },

    async bioSignUp() {
      const user = await this.performBiometricVerificatin()
      user.email = user.username
      console.log(user)
      this.logInWithEmailAndPassword(user)
    },

    exit() {
      this.logOut()
      // this.clearNativeBiometric()
    }
  },
};
</script>
