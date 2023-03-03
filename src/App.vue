<template>
  <router-view />
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: 'App',
  methods: {
    ...mapMutations(['clearData', 'updateSigned', 'updateCredentials']),
    ...mapActions(['defineBiometryType', 'logOut'])
  },
/*   beforeMount() {

  }, */
  mounted() {
    const isSigned = window.localStorage.getItem('isSigned')
    this.updateSigned(isSigned);
    try {
        this.defineBiometryType()
        const hasCredentials = window.localStorage.getItem('hasCredentials')
        this.updateCredentials(hasCredentials)
    } catch (error) {
        alert('Ошибка доступа к биометрии')
        console.log(error)
    }
  },
  beforeUnmount() {
    // this.clearData()
    this.logOut()
  }
};
</script>

<style lang="scss"></style>
