<template>
  <button class="go-back" @click="goBack">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" fill="none">
        <path d="M480 896 160 576l320-320 42 42-248 248h526v60H274l248 248-42 42Z"/>
    </svg>
  </button>
</template>

<script>
export default {
    name: 'BackArrow',
    methods: {
        goBack() { 
            this.$emit('go-back')
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
    .go-back {
        position: fixed;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px; 
        border: 0;
        background: none;
        margin: 0;
        padding: 10px;
    }

    .go-back svg {
        fill: #999;
        width: 100%;
        height: 100%;
    }
</style>

