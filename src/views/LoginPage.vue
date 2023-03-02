<template>
    <email-sign v-if="!isSigned"/>
    <email-login v-if="!!isSigned"/>
</template>

<script>
import EmailSign from "@/assets/components/EmailSign.vue";
import EmailLogin from "@/assets/components/EmailLogin.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
    name: 'LoginPage',
    components: {
        EmailSign,
        EmailLogin
    },
    computed: {
        ...mapGetters(['isSigned'])
    },
    watch: {
        //...mapGetters(['isSigned'])
    },
    methods: {
        ...mapActions(['clearNativeBiometric']),
        ...mapMutations(['clearData']),
        exit() {
            this.clearData()
            this.clearNativeBiometric()
        }
    }
}
</script>

<style>

</style>