<template>
    <div class="login wrapper">
        <back-arrow @go-back="goBack"/>
        <img class="logo" src="@/assets/logo.png" alt="Логотип" />
        <h3 style="margin-bottom: 62px">У вас новое сообщение</h3>

        <label class="label">Заголовок Push</label>
        <div class="input">{{ getMsg.title }}</div>

        <label class="label">Текст Push</label>
        <div class="textarea">{{ getMsg.body }}</div>

        <img v-if="getMsg.image" :src="getMsg.image" alt="картинка" class="img">
    </div>
</template>

<script>
import BackArrow from "@/assets/components/BackArrow.vue"
import { mapGetters, mapMutations } from "vuex"

export default {
    name: "MsgPage",
    components: {
        BackArrow
    },
 
    methods: {
        ...mapMutations(['updateLogged']),
        goBack() { 
            this.$router.push({path: '/push'})
            // this.updateLogged('');
        },
    },
    computed: {
        ...mapGetters(['getMsg'])
    },
    mounted() {
    },
};
</script>

<style scoped>

</style>

