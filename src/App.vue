<template>
  <router-view/>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: 'App',
  methods: {
    ...mapMutations(['clearData'])
  },
  mounted() {
    // window.localStorage.setItem("fcmSigned", "")
  },
  beforeUnmount() {
    this.clearData()
  }
};
</script>


<style lang="scss">
</style>

