<template>
  <div id="app">
    <nav-bar v-show="!$route.meta.hideNav"></nav-bar>
     <!-- <nav-bar v-show="showNav"></nav-bar> -->
    <div class="paddingTop" v-if="!$route.meta.hideNav"></div>
    <play-er  :playMusic="playMusic"
    :playList="playList"
    :mvitem="mvitem"
      @changePlayMusic="changePlayMusic"
    ></play-er>
    <transition>
      <!-- <keep-alive> -->
        <router-view @play="play" @mv="mv" @playLists="playLists"/>
      <!-- </keep-alive> -->
    </transition>
    <div class="padingBottom" v-if="playMusic"></div>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
import PlayEr from '@/components/PlayEr'
import defaultPic from '@/assets/music.png'
export default {
  data(){
    return{
      playMusic:null,
      playList:[],
      mvitem:null,
      copyplayLists:[],
    }
  },
  components:{
    NavBar,PlayEr
  },
  methods:{
    playLists(event){
      this.copyplayLists=event.map(d=>{
        if(!d.picUrl && d.song && d.song.album){
        d.picUrl=d.song.album.picUrl;
      }
      if(!d.picUrl){
        d.picUrl=defaultPic
      }
        return d
      });
      // this.playList.push(event);
      this.playList=this.copyplayLists
      this.playMusic=event[0];
    },
    changePlayMusic(event){
      if(event){
        this.playMusic=event;
      }
    },
    mv(event){
      console.log(event)
      this.mvitem=event;
    },
    play(event){
      //判断歌曲对象里面是否有图片 没有就拿专辑的图片.
      if(!event.picUrl && event.song && event.song.album){
        event.picUrl=event.song.album.picUrl;
      }
      if(!event.picUrl){
        event.picUrl=defaultPic
      }
      this.playMusic=event;
      console.log(event);
      //加入歌单
      let isPush=true;
      this.playList.map(d=>{
          if(d.id==event.id){//歌曲已经存在
            isPush=false;
          }
      });
      if(isPush) this.playList.push(event);
    },
  },
}
</script>
<style>
#app{
  min-width: 133px;
  width: 100vw;
}
.paddingTop{
  padding-top:22.4vw;
}
.padingBottom{
  padding-bottom: 60px;
}

</style>
