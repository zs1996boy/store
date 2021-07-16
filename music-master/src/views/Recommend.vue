<template>
  <div class="recommend">
    <!-- 图片 -->
    <keep-alive>
      <my-banner></my-banner>
    </keep-alive>
    <load-img v-if="picUrl <= 0"></load-img>
    <table @click="packup = !packup">
      <border-title>推荐歌单</border-title>
    </table>
    <div class="recommned_songs" v-show="packup">
      <div>
        <picture-item
          v-for="item in recommend_songs"
          :key="item.id"
          :item="item"
          :Musichalls="Musichall"
        ></picture-item>
      </div>
      <load-img v-if="recommend_songs.length <= 0"></load-img>
    </div>
    <div class="Mvplay">
       <border-title>推荐MV</border-title>
    </div>
    <div class="recommned_songs" v-show="packup">
    <div>
        <picture-item v-for="mv in mv_sort" :key="mv.id"
          :item="mv"
          :Musichalls="Mvall"
        ></picture-item>
    </div>
    </div>
    <border-title>最新音乐</border-title>
    <ul>
      <load-img v-if="newSongs.length <= 0"></load-img>
      <li-item :allsong="newSongs" @play="$emit('play',$event)"></li-item>
    </ul>
    <botton-logo></botton-logo>   
  </div>
</template>

<script>
import BorderTitle from "@/components/BorderTitle";
import PictureItem from "@/components/PictureItem";
import LiItem from "@/components/LiItem";
// import MyImg from "@/components/MyImg.vue";
import LoadImg from "@/components/LoadImg.vue";
import MyBanner from "@/components/MyBanner"
import BottonLogo from "@/components/BottonLogo"
export default {
  name: "Recommend",
  components: {
    BorderTitle,
    PictureItem,
    LiItem,
    // MyImg,
    LoadImg,
    MyBanner,
    BottonLogo
  },
  data() {
    return {
      packup: true,
      recommend_songs: [],
      mv_sort: [],
      newSongs: [],
      picUrl: "",
      copywriter: "",
      Musichall:"/Musichall/",
      Mvall:"/Mvall/",

    };
  },
  created() {
    //推荐音乐
    this.$axios.get("/personalized").then((d) => {
      // console.log(d);
      this.recommend_songs = d.data.result.slice(0, 6);
      this.picUrl = this.recommend_songs[1].picUrl;
      this.copywriter = this.recommend_songs[0].copywriter.slice(5);
    });
    //调用mv
    this.$axios.get("/top/mv?limit=10").then((d) => {
      // console.log(d);
      // this.mv_sort=d.data
      this.mv_sort = d.data.data.slice(0, 4).map((item) => {
        item.picUrl = item.cover;
        return item;
      });
    });
    //最新音乐
    this.$axios.get("/personalized/newsong").then((d) => {
      this.newSongs = d.data.result;
    });
  },

  beforeRouteEnter(to,from,next){
    next((vm)=>{
      vm.$axios.get('/personalized').then(d=>{
        console.log(d);
      })
    });
  }
};
</script>
<style lang="less" scoped>
li{
  list-style: none;
}
.recommned_songs {
  width: 100%;
  overflow-x: auto;
  div {
    width: 200%;
    display: flex;
    justify-content: space-between;
    margin-right: 5px;
    div {
      width: 33%;
      flex-wrap: wrap;
    }
  }
}
.mv_sort {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  div {
    width: 49.5%;
  }
}
</style>