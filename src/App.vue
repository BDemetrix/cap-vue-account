<template>
  <router-view />
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: 'App',
  methods: {
    ...mapMutations(['clearData', 'updateSigned']),
    ...mapActions(['defineBiometryType'])
  },
/*   beforeMount() {

  }, */
  mounted() {
    const isSigned = window.localStorage.getItem('isSigned')
    this.updateSigned(isSigned);
       try {
           this.defineBiometryType()
       } catch (error) {
           alert('Ошибка доступа к биометрии')
           console.log(error)
       }
  },
  beforeUnmount() {
    this.clearData()
  }
};
</script>

<style lang="scss"></style>
