<template>
  <div class="main">
    <get-back></get-back>
    <my-img :item="coverImgUrl"></my-img>
    <div class="songbox" @click="songList(allsong)"><i class="fa fa-plus" aria-hidden="true"></i>加入歌单</div>
    <div class="box">
      <div @click="isShow=true" :class="isShow==true?'color':''">歌曲</div>
      <div @click="isShow=false" :class="isShow==false?'color':''">评论</div>
    </div>
    <all-song :allsong="allsong" @son='dad' @play="$emit('play',$event)" v-show="isShow"></all-song>
    <my-comment :hotComments="hotComments" :comments="comments" v-show="!isShow"></my-comment>
    <botton-logo></botton-logo>
  </div>
</template>

<script>
import AllSong from "@/components/AllSong";
import MyImg from '../components/MyImg.vue';
import GetBack from '../components/GetBack';
import MyComment from '../components/MyComment';
import BottonLogo from "@/components/BottonLogo";
export default {
  props: ["musicid"],
  components: {
    AllSong,
    MyImg,
    GetBack,
    MyComment,
    BottonLogo
  },
  data() {
    return {
      allsong: [],
      playid:1478826571,
      playurl:'',
      coverImgUrl:'',
      hotComments:[],
      comments:[],
      isShow:true,
    };
  },
  methods:{
      dad(data){
          console.log(data)
          this.playid=data;
          console.log(this.musicid)
      },
      songList(event){
        console.log("加入歌单")
        console.log(event);
        this.$emit('playLists',event)
      }
  },
  created() {
    this.$nextTick(() => {
      this.$axios.get(`playlist/detail?id=${this.musicid}`).then((d) => {
        this.coverImgUrl=d.data.playlist.coverImgUrl;
        this.allsong = d.data.playlist.tracks.map((data)=>{
          data.song={
                    artists:data.ar,
                    album:data.al
                }
                return data;
        })
        console.log(this.allsong)
      })
      this.$axios.get(`/comment/playlist?id=${this.musicid}`).then((da) => {
        this.hotComments=da.data.hotComments;
        this.comments=da.data.comments;
      })
    });
      
  },
  activated(){
      
  }
};
</script>
<style lang="less" scoped>
.box{
  display: flex;
  height: 50px;
  align-items: center;
  div{
    padding:0 5px;
  }
}
.color{
  color: #f12391;
}
.main{
  position: relative;
  .songbox{
  position: absolute;
  top: 40vw;
  right: 0;
  padding: 2vw;
  font-size: 2vw;
  background-color:white;
  border-radius: 50px;
  box-shadow: 0px 0px 1px black;
  i{
    margin-right: 2px;
  }
}
}

</style>
