<template>
    <div>
        <img :src="item" alt="">
        <div class="box"><slot></slot></div>
    </div>
</template>
<script>
export default {
    props:{
        item:String
    }
}
</script>
<style lang="less" scoped>
div{
    width: 100vw;
    height: 50vw;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content:flex-end;
    align-items: flex-end;
    img{
        position: absolute;
        width: 100vw;
        height: 50vw;
    }
    .box{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 10px;
        width: 50vw;
        text-align: right;
        color: white;
        font-size: 4vw;
        text-shadow: 0px 0px 2px black;
    }
}

</style>