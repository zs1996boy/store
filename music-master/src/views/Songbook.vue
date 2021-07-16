<template>
    <div>
        <load-img v-if="isLoading"></load-img>
        <div v-for="item in list" :key="item.id" class="maxbox">
        <router-link :to="`/Musichall/${item.id}`" tag="div">
        <div class="box">
            <li>
            <img :src="item.coverImgUrl" alt="">
            </li>
            <li>
            <p>{{item.name}}</p>
            <ol v-for="(i,index) in item.tracks" :key="index">{{i.first}}-<span>{{i.second}}</span></ol>
            </li>
        </div>   
        </router-link>
        </div>
    </div>
</template>
<script>
import LoadImg from '@/components/LoadImg.vue'
export default {
    components: {
    LoadImg
  },
    data(){
    return{
      list:[],
      allList:[],
      singer:[],
      isLoading: true,
    }
  },
  created(){
    this.axios.get('/toplist/detail').then(d=>{
      this.allList=d.data.list;
      // console.log(this.allList)
      this.list=this.allList.slice(0,4);
      this.isLoading=false;
    })
  }
}
</script>
<style lang="less" scoped>
ul,li{
  list-style: none;
}
.maxbox{
  .box{
    display: flex;
    margin: 5px 0;
    border-bottom: 1px solid #ccc;
    border-top: 1px solid #ccc;
    li:nth-child(1){
      width: 30%;
      min-width: 80px;
      img{
        min-width: 80px;
        min-height: 80px;
        border-radius: 20px;
      }
    }
    li:nth-child(2){
      margin-left: 10px;
      width: 68%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      p{
        font-size: 4vw;
        font-weight: bold;
      }
      ol{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color:#333;
        font-size: 3.73333vw;
        span{
          color:#ccc;
        }
      }
    }
  }
}
</style>
