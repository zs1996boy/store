<template>
    <div class="myloading">
        <van-loading size="24px" color="#000" class="Loading" v-if="loading">加载中...</van-loading>
    </div>
</template>
<script>
export default {
    props:['loading']
}
</script>
<style lang="less">
.myloading{
    .Loading{
        z-index: 99;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%);
    }
}
</style>