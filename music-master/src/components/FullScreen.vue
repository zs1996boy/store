<template>
  <div
    :class="['fullPage', { pause: !playstate }]"
    :style="{ background: `url(${playMusic.picUrl}) no-repeat 0 0/100% 100%` }"
  >
    <i class="fa fa-arrow-left boxbottom" @click="$emit('close')" aria-hidden="true"></i>
    <!-- 歌单列表 -->
    <transition enter-active-class="animate__animated animate__slideInUp" leave-active-class="animate__animated animate__slideOutRight">
       <ul class="playList" v-show="showList">
         <p>
           歌单
           <i @click="showList=!showList" class="fa fa-times"></i>
         </p>
         <div class="paddingtop"></div>
          <li
            v-for="song in playList"
            :key="song.id"
            :class="{ active: playMusic.id == song.id }"
            @click="$emit('changePlayMusic', song)"
          >
          <ol><img :src='song.picUrl' alt=""></ol>
            <ol>{{ song.name }}</ol>
          </li>
        </ul>
    </transition>
    <div class="pic">
      <img :src="playMusic.picUrl" />
    </div>
    <h2>{{ playMusic.name }}</h2>
    <div class="lyric">
      <ul
        v-bind:style="{
          transform: `translateY(-${lyricIndex * 29 - boxh}px)`
        }"
      >
        <li
          v-for="(item, index) in lyricArray"
          :key="index"
          :class="{ highlight: index == lyricIndex }"
        >
          {{ item.lyric }}
        </li>
      </ul>
    </div>
    <div class="control">
      <div class="playrange">
        <span>{{ currentTime | formatTime }}</span>

        <input
          type="range"
          max="100"
          :value="(currentTime / duration) * 100"
          @change="changeTime"
        />

        <span>{{ duration | formatTime }}</span>
      </div>
      <div class="select">
        <span  class="way" @click="$emit('changeMode')">
          <!-- 顺序1 随机2 单曲3 -->
          <button class="fa fa-exchange" v-show="playMode==1"></button>
          <button class="fa fa-random" v-show="playMode==2"></button>
          <button class="fa fa-refresh" v-show="playMode==3"></button>
        </span>
        <button class="fa fa-fast-backward" aria-hidden="true" @click="prev"></button>
        <button @click="$emit('togglePlay')"  :class="['fa', playstate?'fa-pause':'fa-play']" aria-hidden="true"></button>
        <button class="fa fa-fast-forward" aria-hidden="true" @click="next"></button>
        <button @click="showList=!showList" class="fa fa-outdent"></button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FullPage",
  props: [
    "playMusic",
    "playstate",
    "lyric",
    "currentTime",
    "duration",
    "playList",
    "playMode"
  ],
  data() {
    return {
      showList: false,
      boxh:null,
    };
  },
  created(){
    this.$nextTick(()=>{
      let h=parseInt(document.querySelector(".lyric").offsetHeight);
      this.boxh=h/2;
      console.log(this.playList)
    })
  },
  methods: {
    next() {
      let i = 0;
      this.playList.map((d, index) => {
        if (d.id == this.playMusic.id) {
          //找到当前播放音乐下标
          i = index;
        }
      });
      if(i >= this.playList.length-1){
        i = 0;
      }else if(this.playMode == 1) {
        i++;
      }else if(this.playMode == 2){//随机播放时
        i =  Math.floor(Math.random()*this.playList.length);
      }
      let pmusic = this.playList[i];
      this.$emit("changePlayMusic", pmusic);
    },
    prev() {
      let i = 0;
      this.playList.map((d, index) => {
        if (d.id == this.playMusic.id) {
          //找到当前播放音乐下标
          i = index;
        }
      });
      if(i<=0){
        i=this.playList.length-1;
      }else if(this.playMode == 1){//顺序播放
        i--;
      }else if(this.playMode == 2){//随机播放时
        i =  Math.floor(Math.random()*this.playList.length);
      }
      let pmusic = this.playList[i];
      this.$emit("changePlayMusic", pmusic);
      //$emit('',song)
    },
    changeTime(event) {
      let val = event.target.value;
      this.$emit("changetime", val);
      // console.log(event.target.value);
    },
  },
  computed: {
    lyricArray() {
      //格局字符串歌词 转化为数组
      let lyric = this.lyric;
      if (!lyric) return []; //如果没有歌词返回空
      let arr = lyric.split("\n");
      arr.pop();
      let reg = /\[(\d+):(\d+\.\d+)\](.*)/;
      let lyricArr = arr.map((d) => {
        if (reg.test(d)) {
          let lyricObj = {
            time: parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2),
            lyric: RegExp.$3,
          };
          return lyricObj;
        }
      });

      return lyricArr;
    },
    lyricIndex() {
      //计算属性当前歌词下标
      let ctime = this.currentTime; //当前播放时间
      let lyric = this.lyricArray; //歌词计算属性数组
      let index = 0;
      for (let i = 0; i < lyric.length; i++) {
        if (i >= lyric.length - 1) {
          //最后一条歌词
          index = i;
          break;
        }
        if (lyric[i].time <= ctime && ctime < lyric[i + 1].time) {
          index = i;
          break;
        }
      }
      return index;
    },
  },
  filters: {
    formatTime(val) {
      let minutes = parseInt(val / 60);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let sec = parseInt(val) - parseInt(minutes * 60);
      sec = sec < 10 ? "0" + sec : sec;
      return minutes + ":" + sec;
    },
  },
};
</script>
<style lang="less" scoped>
.boxbottom{
    width: 10vw;
    height: 10vw;
    opacity: 0.5;
    text-shadow: 0px 0px 2px black;
    text-align: center;
    line-height: 10vw;
    position: fixed;
    z-index: 99;
    font-size: 4vw;
    color: rgb(236, 230, 230);
}
.fullPage {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1111;
  &::after{
    content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      background: inherit;
      box-shadow: inset 0 0 0 3000px rgba(255,255,255,0.3);
      filter: blur(10px);
      z-index: -1;
  }
  &::before{
    content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      background: #1d0110;
      z-index: -2;
  }
  .playList {
      position: fixed;
      bottom: 0;
      height: 50vh;
      width: 100vw;
      overflow-y: auto;
      border-radius:3vh 3vh 0 0 ;
      background-color: rgba(240, 236, 236,.8);
      z-index: 2222;
      p{
        width: 100vw;
        height: 30px;
        line-height: 30px;
        text-align: center;
        position: fixed;
        z-index: 22222;
        border-radius:5vh 5vh 0 0 ;
        background-color: rgba(240, 236, 236,1);
        i{
          position: absolute;
          right: 20px;
          top: 5px;
        }
      }
      .paddingtop{
        padding-top: 30px;
      }
      li {
        padding: 8px;
        margin-left: 10px;
        display: flex;
        align-items: center;
        border-bottom:1px solid #ccc;
        ol{
          &>img{
          height: 5vw;
          }
          &:nth-child(2){
            margin-left: 3vw;
          }
        }
        &.active {
          font-weight: bold;
          color: #f12391;
        }
      }
    }
  .pic {
    margin: 0 auto;
    margin-top: 10vh;
    width: 20vw;
    min-width: 20vh;
    max-width: 28vh;
    border: 2px solid #f12391;
    animation: rounds 5s 0s linear infinite;
    border-radius: 50%;
    overflow: hidden;
    box-sizing: border-box;
    img {
      display: block;
    }
  }
  h2 {
    text-align: center;
    color: #f12391;
    font-size: 20px;
    text-shadow: 0px 0px 1px #000;
    margin-bottom: 10px;
    font-weight: bold;
  }
  .lyric {
    position: relative;
    width: 70vw;
    margin: 0 auto;
    background-color: transparent;
    font-weight: bold;
    color: #fff;
    text-shadow: 0px 0px 3px black;
    height: 40vh;
    overflow: hidden;
    // border-radius: 20px 20px 0 0;
    // box-shadow: 1px 1px 5px rgb(34, 28, 28);
    margin-bottom:10px ;
    ul {
      li {
        text-align: center;
        overflow: auto;
        width: 100%;
        height: 1.7857rem;
        line-height: 1.7857rem;
        vertical-align: top;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: .8571rem;
        
        &.highlight {
          color: #f12391;
          font-weight: bold;
          font-size: 20px;
        }
      }
    }
  }
  .control {
    text-align: center;
    position: relative;
    .playrange {
      display: flex;
      color: white;
      justify-content: space-around;
      span {
        width: 15%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-shadow: 0px 0px 5px black;
      }
      input[type="range"] {
        margin-top: 8px;
        outline: none;
        -webkit-appearance: none; /*清除系统默认样式*/
        width: 56% !important;
        background: -webkit-linear-gradient(to left #f12391, #f1eff0) no-repeat, rgb(221, 221, 221);
        background-size: 100%; /*设置左右宽度比例*/
        height: 3px; /*横条的高度*/
      }
      /*拖动块的样式*/
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; /*清除系统默认样式*/
        height: 16px; /*拖动块高度*/
        width: 16px; /*拖动块宽度*/
        background: #fff; /*拖动块背景*/
        border-radius: 50%; /*外观设置为圆形*/
        border: solid 1px #f12391; /*设置边框*/
      }
      input {
        width: 86vw;
      }
    }
    .select {
      margin-top: 30px;
      width: 100vw;
      height: 10vh;
      font-size: 4vh;
      &>button{
          border-color:transparent;
          color: #fff;
          padding: 1.5vw;
          margin: 0 1.5vw;
          outline: none;
          background-color: transparent;
          text-shadow: 0px 0px 1px black;
          border-radius: 50%;
          &:nth-child(3){
            border-radius: 0;
            padding: 1vw 1.5vw;
          }
      }
      .way{
         &>button{
           color: #fff;
            outline: none;
            background-color: transparent;
            text-shadow: 0px 0px 1px black;
            border-color:transparent;
            border-radius: 50%;
            padding: 1.5vw;
         }
      }
    }
  }
}
.songlist{
    width: 50px;
    height: 50px;
    background: #ccc;
    border-color: #f12391;
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    position: fixed;
    right: 15px;
    top: 5px;
    z-index: 99;
    font-size: 20px;
    font-weight: bold;
    color: #f12391

}
.pause {
  .pic {
    animation-play-state: paused;
  }
}
@keyframes rounds {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>