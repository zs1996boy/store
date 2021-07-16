<template>
<div class="box">
  <div  @click="$emit('mv',true)">
    <get-back></get-back>
  </div>
    <video :src="url" autoplay controls class="video" @loadstart="$emit('mv',false)"></video>
    <div class="paddingTop"></div>
    <div class="coneter">
        <li>{{name}}</li>
        <li>播放次数:<span>{{playCount|formatNum()}}</span></li>
        <li>发布时间:<span>{{publishTime}}</span></li>
        <li @click="isShow=!isShow" >简介:
            <p v-show="isShow">{{desc|formatdata}}</p>
        </li>
        <my-comment :hotComments="hotComments" :comments="comments"></my-comment>
    </div>
</div>

</template>
<script>
import GetBack from '@/components/GetBack.vue'
import MyComment from '@/components/MyComment.vue';
export default {
    props:['Mvid'],
    data(){
        return{
             url:'',
             name:'',
             publishTime:'',
             playCount:'',
             desc:'',
             hotComments:'',
             comments:'',
             isShow:false,
        }
    },
    components: { GetBack,MyComment },
    created() {
    this.$nextTick(() => {
      this.$axios.get(`/mv/url?id=${this.Mvid}`).then((d) => {
        this.url=d.data.data.url;
        console.log(d)
      })
      this.$axios.get(`/mv/detail?mvid=${this.Mvid}`).then((da) => {
        this.name=da.data.data.name;
        this.publishTime=da.data.data.publishTime;
        this.playCount=da.data.data.playCount;
        this.desc=da.data.data.desc;
         console.log(da)
      })
      this.$axios.get(`/comment/mv?id=${this.Mvid}`).then((d) => {
        this.comments=d.data.comments;
        this.hotComments=d.data.hotComments;
      })
      
    });
  },
  filters: {
  formatNum(value) {
      if (value >= 10000) {
        return (parseInt(value) / 10000).toFixed(0) + "万";
      }
      return value;
    },
    formatdata(value) {
      if (value.length<=0) {
        return '无简介'
      }
      return value;
    },
  }
}
</script>
<style lang="less" scoped>
ul,li,ol{
    list-style: none;
}
.box{
    position: relative;
    width: 100vw;
.video{
    position: absolute;
    z-index: 9;
    top:0px;
    left: 0px;
    height: 30vh;
    width: 100vw;
}
.paddingTop{
    height: 30vh;
    width: 100vw;
    background-color: black;
}
.coneter{
  width: 100vw;
    height: 70vh;
    top: 30vh;
    position: absolute;
    overflow-y: auto;
    li{
        margin-left: 15px;
        font-size: 12px;
        color: #999;
        &:first-child{
            font-size: 17px;
            color: #f12391;
            font-weight: bold;
        }
        &:nth-child(4){
            font-size: 15px;
            color: #f12391;
            position: relative;
            &::after{
                content: '';
                position: absolute;
                width: 15px;
                height: 15px;
                top: 7.5px;
                left: 35px;
                border-left: 7.5px solid transparent;
                border-right: 7.5px solid transparent;
                border-top: 5px solid red;
            }
        }
        span{
            margin-left: 5px;
        }
    }
}
}

</style>