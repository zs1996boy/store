<template>
    <div class="box">
        <ul>
            <li v-for="(item,index) in content" :key="index" :class="num==index?'color':''" @click="getitem(item,index)">{{item}}</li>
        </ul>
        <ul>
            <load-img v-if="isLoading"></load-img>
            <picture-item v-for="mv in newdata" :key="mv.id"
          :item="mv"
          :Musichalls="Mvall"
        ></picture-item>
        </ul>
    </div>
</template>
<script>
import LoadImg from '@/components/LoadImg.vue'
import PictureItem from "@/components/PictureItem";
export default {
    components: {
    LoadImg,
    PictureItem
  },
    data(){
    return{
      num:0,
      singer:[],
      content:['内地','港台','欧美','韩国','日本'],
      isLoading: true,
      region:'内地',
      newdata:'',
      Mvall:"/Mvall/",
    }
  },
  methods:{
    getitem(event,index){
        this.num=index;
        this.region=event;
         this.isLoading=true;
        this.axios.get("/top/mv?area="+this.region).then(d=>{
            this.newdata = d.data.data.map((item) => {
            item.picUrl = item.cover;
            return item;
        });
        this.isLoading=false;
            console.log(this.newdata)
        })
    //     this.$axios.get(`/mv/detail?mvid=${this.newdata}`).then((da) => {
    //      console.log(da)
    //   })   
    }
  },
  created(){
      this.$nextTick(()=>{
          this.isLoading=true;
          this.axios.get("/top/mv?area="+this.region).then(d=>{
            this.newdata = d.data.data.map((item) => {
            item.picUrl = item.cover;
            return item;
        });
        this.isLoading=false;
            })  
      })
     
    },
}
</script>
<style lang="less" scoped>
.color{
    color: #f12391;
}
.box{
    width: 100%;
    display: flex;
    ul{
        &:first-child{
            width: 10vw;
            min-width: 30px;
            // background-color: tomato;
            li{
    
                text-align: center;
                font-size: 3.3vw;
                padding-bottom: 10px;
                letter-spacing:3px;
            }
        }
        &:last-child{
            min-width: 133px;
            flex: 1;
            height: 90vh;
            overflow-y: auto;
            // background-color: turquoise;
        }
    }
}
</style>