<template>
    <h3 class="bordertittle"><slot></slot></h3>
</template>
<style lang="less" scoped>
.bordertittle{
    padding: 1.33333vw 2.66667vw;
    font-size: 3.73333vw;
    color:#333;
    position: relative;
    color: black;
    &::after{
        content:"";
        position: absolute;
        border-left:2px solid black;
        left:0px;
        top: 1.89vw;
        height:3.73333vw;
        // min-height:13px;
        // top:4px;
    }
}
</style>