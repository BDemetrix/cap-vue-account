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
    methods: {
        ...mapActions(['defineBiometryType', 'clearNativeBiometric']),
        ...mapMutations(['clearData']),
        exit() {
            this.clearData()
            this.clearNativeBiometric()
        }
    },
    mounted() {
        try {
            this.defineBiometryType()
        } catch (error) {
            alert('Ошибка доступа к биометрии')
            console.log(error)
        }
    }
}
</script>

<style>

</style>