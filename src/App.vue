<template>
  <router-view />
  <main-loader v-show="loading"></main-loader>
</template>

<script>
// import { Capacitor } from "@capacitor/core"
import MainLoader from '@/assets/components/MainLoader.vue';
import { mapMutations, mapActions, mapGetters } from "vuex"

export default {
  name: 'App',
  components: {
    MainLoader
  },
  methods: {
    ...mapMutations(['clearData', 'updateSigned', 'updateCredentials', 'updateToken', 'upFcmSigned']),
    ...mapActions(['defineBiometryType', 'logOut']),
  },
  computed: {
    ...mapGetters(['loading'])
  },
  beforeMount() {
    // alert('App before mounted')
    const isSigned = window.localStorage.getItem('isSigned')
    this.updateSigned(isSigned)
  },
  mounted() {
    // alert(Capacitor.getPlatform())
    // alert('App mounted')
    try {
        this.defineBiometryType()
        const hasCredentials = window.localStorage.getItem('hasCredentials')
        this.updateCredentials(hasCredentials)
        // alert('Biometry has been registrfned')
    } catch (error) {
        alert('Ошибка доступа к биометрии')
        console.log('Biometry: ', error)
    }
  },
  beforeUnmount() {
    // this.clearData()
    // this.logOut()
    // this.updateToken('')
    // this.upFcmSigned('')

  }
};
</script>

<style lang="scss"></style>
