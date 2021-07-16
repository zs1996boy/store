<template>
  <router-link to="">
    <div class="dad" v-for="(item,index) in listInfo" :key="item.id" @click="changeIndex(index+1,item)">
      <div class="son">
        <span>{{ index + 1 }}.</span>
        {{ item.name }}
        <span>
          {{item.ar[0].name}}-{{item.al.name}}
        </span>
      </div>
      <span
        :class="[show==(index+1) ? 'fa-play-circle' : 'fa-play-circle-o', 'fa', 'myplay']"
         @click.left.prevent.stop="changeIndex(index + 1, item)"
         @click.stop="$emit('play',item)"
      ></span>
    </div>
  </router-link>
</template>
<script>
export default {
  props: ["allsong"],
  data() {
    return {
      listInfo:[],//存歌
      show: 0,
      itemid:'',
      page:0,//记录页码
      perpage:20,//每页显示20条
      hotList:[]
    };
  },
  created(){
        // 歌单歌曲数据
        this.$nextTick(()=>{
          window.addEventListener('scroll',this.onScroll);
        })
        
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            window.addEventListener('scroll',vm.onScroll);
        })
    },
    beforeRouteLeave(to,from,next){
        window.removeEventListener('scroll',this.onScroll);
        next();
    },
  methods:{
      changeIndex(event,item){
          this.show=event;
          this.itemid=item.id;
          this.$emit('son',item.id);
          console.log("播放音乐")
      },
      loadeMore(){
            this.page++; 
            let start=(this.page)*this.perpage;
            let end=(this.page+1)*this.perpage;
            this.listInfo=this.listInfo.concat(this.hotList.slice(start,end));
        },
        onScroll(){
            let h=document.documentElement.scrollHeight||document.body.scrollHeight;
            let top=document.documentElement.scrollTop||document.body.scrollTop;
            let ch=document.documentElement.clientHeight||document.body.clientHeight;
            if(h-top-ch==0){
                this.loadeMore();
            }
        },
  },
  watch:{
    allsong(event){
      this.hotList=event;
      this.listInfo=this.hotList.slice(0,10);
      console.log(this.listInfo);
    }
  }
};
</script>
<style lang="less" scoped>
a {
  color: black;
-webkit-tap-highlight-color: transparent;//改变点击默认背景蓝色为透明
  .dad {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    .son {
      width: 80%;
      // height: 50px;
      line-height: 50px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
      font-weight: bold;
      span:nth-child(1) {
        display: inline-block;
        width: 50px;
        text-align: center;
        color: #ccc;
      }
      span:nth-child(2) {
        color: #ccc;
        font-size: 14px;
        font-weight: normal;
      }
    }

    .myplay {
      width: 20%;
      height: 50px;
      text-align: center;
      line-height: 50px;
      font-size: 30px;
      color: #ccc;
    }
  }
}
</style>