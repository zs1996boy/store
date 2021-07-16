<template>
  <div>
    <p>搜索结果:</p>
    <li-item :allsong="searchresult" @play="$emit('play', $event)" :value="value"></li-item>
    <load-img v-show="isLoading"></load-img>
    <div v-show="!isLoading">到底了</div>
  </div>
</template>
<script>
import LiItem from '@/components/LiItem.vue';
import LoadImg from './LoadImg.vue';
export default {
  components: { LiItem,LoadImg },
    props:['value'],
    data() {
    return {
      searchresult: [],
      page: 0, //默认第一页
      perpage: 10, //每页显示三十
      isLoading: true,
    };
  },
  created() {
    this.isLoading = true;
    this.$axios.get("/search?keywords=" + this.value).then((d) => {
      console.log(d);
      console.log(this.value);
      this.searchresult = d.data.result.songs.map((data) => {
        data.song = {
          artists: [{ name: data.artists[0].name }],
          album: data.album,
        };
        this.isLoading = false;
        return data;
      });
    });
    window.addEventListener('scroll',this.onScroll);
  },
  methods: {
    onScroll(){
      let h=document.documentElement.scrollHeight||document.body.scrollHeight;
      let top=document.documentElement.scrollTop||document.body.scrollTop;
      let ch=document.documentElement.clientHeight||document.body.clientHeight;
      if(h-top-ch<5){
        console.log("加载更多")
        this.loadMore();
      }
    },
    loadMore() {
      this.isLoading = true;
      this.page++;
      this.getresult();
    },
    getresult() {
      this.axios.get("/search", {
          //axios get传值
          params: {
            keywords: this.value,
            limit: this.perpage,
            offset: this.page * this.perpage,
          },
        })
        .then((d) => {
          if(d.data.result.songs&&d.data.result&&d.data){
            let result = d.data.result.songs.map((data) => {
            data.song = {
              artists: data.artists,
              album: data.album,
            };
            return data;
          });
          this.isLoading = false;
          this.searchresult = this.searchresult.concat(result);
          }else{
            this.isLoading = false;
            return
          }
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      window.addEventListener("scroll", vm.onScroll);
    });
  },
  beforeRouteLeave(to, from, next) {
    //移除滚动.
    window.removeEventListener("scroll", this.onScroll);
    next();
  },
  activated() {
    // 1页面 每页10
    this.searchresult = [];
    this.getresult();
  },
};
    

</script>
<style lang="less" scoped>
div {
  padding: 0 8vw;
  p {
    text-indent: 0.5em;
    color: #f12391;
  }
}
</style>