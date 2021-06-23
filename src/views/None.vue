<template>
    <div class="none">
        <div><img :src="img" alt=""></div>
        <div class="conter">
            <div>页面未找到</div>
            <div>抱歉！您访问的页面不存在，请返回上一级或点击下方按钮返回首页...</div>
            <van-button round type="danger" to="/">返回首页</van-button>
        </div>
        
    </div>
</template>
<script>
import img from '../assets/404.png'
export default {
    data(){
        return{
            img
        }
    }
}
</script>
<style lang="less">
.none{
    top: 0;
    left: 0;
    z-index: 9;
    position: fixed;
    width: 375px;
    height: 100vh;
    background-color: #f4f6fb;
    img{
        margin-top:67.5px;
        width: 375px;
    }
    .conter{
        margin: 0 auto;
        width: 270px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &>div{
            &:first-child{
                font-size: 20px;
                margin-bottom: 30px;
                font-weight: bold;
            }
            &:nth-child(2){
                font-size: 15px;
                margin-bottom: 20px;
            }
        }
    }
}
</style>