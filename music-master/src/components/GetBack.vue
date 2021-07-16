<template>
    <i class="fa fa-arrow-left" @click="back" aria-hidden="true"></i>
</template>
<script>
export default {
    methods:{
    back(){
      this.$router.back();//后退
    }
}
}
</script>
<style lang="postcss" scoped>
i{
    width: 10vw;
    height: 10vw;
    text-shadow: 0px 0px 2px black;
    text-align: center;
    line-height: 10vw;
    position: fixed;
    z-index: 99;
    font-size: 4vw;
    color: #fff;
}
</style>