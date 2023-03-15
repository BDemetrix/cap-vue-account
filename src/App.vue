<template>
  <router-view />
</template>

<script>
import { mapMutations, mapActions } from "vuex"

export default {
  name: 'App',
  methods: {
    ...mapMutations(['clearData', 'updateSigned', 'updateCredentials', 'updateToken', 'upFcmSigned']),
    ...mapActions(['defineBiometryType', 'logOut'])
  },
  beforeMount() {
    // alert('App before mounted')
    const isSigned = window.localStorage.getItem('isSigned')
    this.updateSigned(isSigned)
  }, 
  mounted() {
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
