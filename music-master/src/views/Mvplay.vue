<template>
    <div>
        <get-back></get-back>
        <p>MV</p>
        <picture-item v-for="mv in hotList" :key="mv.id"
          :item="mv"
          :Musichalls="Mvall"
        ></picture-item>
        <load-img v-if="!(hotList.length==50)"></load-img>
        <p v-if="hotList.length==50">到底了>>>></p>
    </div>
</template>
<script>
import PictureItem from "@/components/PictureItem";
import GetBack from '../components/GetBack';
import LoadImg from '../components/LoadImg.vue';
export default {
    components: {
    PictureItem,
        GetBack,
        LoadImg,
  },
    data(){
        return{
            Mvall:"/Mvall/",
            hotList:[],
            allList:[],
            page:0,//记录页码
            perpage:10,//每页显示20条
            isLoading:true
        }
    },
    methods:{
    loadeMore(){
      this.isLoading=true;
      this.page++; // 1  2
      let start=(this.page)*this.perpage;// 20   40
      let end=(this.page+1)*this.perpage;// 40   60
      this.hotList=this.hotList.concat(this.allList.slice(start,end));
      this.isLoading=false;
    },
    onScroll(){
      // console.log('scrollHeight',document.documentElement.scrollHeight)
      // console.log('scrollTop',document.documentElement.scrollTop)
      // console.log('clientHeight',document.documentElement.clientHeight)
      let h=document.documentElement.scrollHeight||document.body.scrollHeight;
      let top=document.documentElement.scrollTop||document.body.scrollTop;
      let ch=document.documentElement.clientHeight||document.body.clientHeight;
      if(h-top-ch==0){
        this.loadeMore();
      }
    }
  },
   created() {
    //调用mv
    this.$axios.get("/top/mv?limit=50").then((d) => {
      this.allList = d.data.data.map((item) => {
        item.picUrl = item.cover;
        this.isLoading=false;
        return item;
      });
       this.hotList=this.allList.slice(0,10);
    });
    window.addEventListener('scroll',this.onScroll);
  },
  beforeRouteLeave(to,from,next){//移除滚动.
    window.removeEventListener('scroll',this.onScroll);
    next();
  },
}
</script>
<style lang="less" scoped>
p{
    text-align: center;
    color: #f123910;
}
</style>