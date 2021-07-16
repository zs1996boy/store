<template>
  <div :class="['player',{pause:!playstate}]">
    <audio
      v-if="playMusic"
      autoplay
      @play="play"
      @pause="pause"
      ref="player"
      @ended="ended"
      @timeupdate="timeupdate"
      :src="`https://music.163.com/song/media/outer/url?id=${playMusic.id}.mp3`"
    ></audio>
    <transition enter-active-class="animate__animated animate__slideInLeft" leave-active-class="animate__animated animate__slideOutRight">
      <div class="minibar" @click="isFull=true" v-if="playMusic" v-show="playShow">
        <div><img :src="playMusic.picUrl"/></div>
        <div>
          <p>{{ playMusic.name }}</p>
          <p>
            <ol>专辑:{{ playMusic.song.album.name }}</ol>
          <ol>
              歌手:
              <span v-for="art in playMusic.song.artists" :key="art.id">
              {{ art.name }}
            </span>
          </ol>
            
          </p>
        </div>
        <div 
        :class="[
            playstate ? 'fa-pause' : 'fa-play',
            'fa',
            'myplay',
          ]"
        @click.prevent.stop="togglePlay">
            <canvas width="50" height="50" ref="playround" class="canvas"></canvas>
        </div>
      </div>
     </transition>
    <transition  enter-active-class="animate__animated animate__slideInUp" leave-active-class="animate__animated animate__slideOutRight">
  <full-screen :playMusic="playMusic"
                v-if="isFull"
                :lyric="lyric"
                :currentTime="currentTime"
                :duration="duration"
                :playMode ="playMode"
                :playstate="playstate"
                @close="isFull=false"
                @changetime="changetime"
                @togglePlay="togglePlay"
                @changeMode="changeMode"
                :playList="playList"
                ref="lyricpage"
                 @changePlayMusic="$emit('changePlayMusic',$event)"
  ></full-screen>
</transition>
  </div>
</template>

<script>
import FullScreen from "@/components/FullScreen.vue";
export default {
  components: { FullScreen },
  props: ["playMusic","playList","mvitem"],
  data() {
    return {
      duration: 0, //记录音乐总时长
      currentTime: 0, //记录当前播放的时间
      playstate: true, //记录是否播放
      isFull: false,
      lyric: null,
      playMode:1, //播放模式：顺序，随机，单曲
      playShow:true,
    };
  },
  watch: {
    mvitem(a,b){
      if(this.playMusic){
        console.log(a,b);
        this.playShow=a;
        if(a==true||a==false){
          if(this.playstate){
            console.log(111111)
            this.$refs.player.pause();
          }
        }
      }
      
      
    },
    playMusic(newMusic) {
      //侦听playMusic当前播放的音乐.获取歌词
      this.axios
        .get("/lyric", {
          params: {
            id: newMusic.id,
          },
        })
        .then((d) => {
          if (d.data && d.data.lrc && d.data.lrc.lyric) {
            this.lyric = d.data.lrc.lyric;
          }
        });
    },
  },
  methods: {
    ended(){
     if(this.playMode == 3){
       this.$refs.player.play();
     }else{
       this.$refs.lyricpage.next();
     }
    },
     // 切换播放模式
    changeMode(){
      if(this.playMode>=3){
       this.playMode = 1;
      }else{
      this.playMode++;
      }
    },
    timeupdate(event) {
      this.duration = event.target.duration; //当前音乐总时长
      this.currentTime = event.target.currentTime; //当前播放时间
      this.drawCircle(this.duration, this.currentTime);
    },
    drawCircle(total, current) {
      let canvas = this.$refs.playround;
      let cxt = canvas.getContext("2d");
      cxt.clearRect(0, 0, 50, 50);
      cxt.beginPath();
      cxt.strokeStyle = "#ccc";
      cxt.lineWidth = 4;
      cxt.arc(25, 25, 20, 0, Math.PI * 2);
      cxt.stroke();
      cxt.closePath();

      cxt.beginPath();
      cxt.strokeStyle = "#f12391";
      cxt.lineWidth = 4;
      cxt.arc(25, 25, 20, 0, Math.PI * 2 * (current / total));
      cxt.stroke();
      cxt.closePath();
    },
    togglePlay() {
      //如果是播放状态 改为暂停
      if (this.playstate) {
        // this.playstate=false;
        this.$refs.player.pause(); //暂停
      } else {
        // this.playstate=true;
        this.$refs.player.play(); //播放
      }
    },
    play() {
      this.playstate = true;
    },
    pause() {
      this.playstate = false;
    },
    changetime(event) {
      let t = (event / 100) * this.duration; //得到播放时间
      this.$refs.player.currentTime = t; //改变播放时间
    },
  },
};
</script>
<style lang="less" scoped>
.player {
  .minibar {
    position: fixed;
    width: 100vw;
    height: 60px;
    background-color: rgb(248, 248, 248);
    bottom: 0px;
    z-index: 9;
    display: flex;
    align-items: center;
    border-top: 1px solid #ccc;
    border-radius: 30px 0 0 0;
    div {
      &:first-child {
        width: 50px;
        margin-left: 8px;
        img {
          width: 100%;
          border-radius: 50%;
          animation: aa 3s 0s linear infinite;
        }
      }
      &:nth-child(2) {
        width: 70%;
        text-indent: 20px;
        display: flex;
        flex-direction: column;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:first-child {
            color: #f12391;
            font-weight: bold;
          }
          &:last-child {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            font-size: 12px;
          }
        }
      }
      &:last-child {
        width: 30%;
        position: relative;
        text-align: right;
        margin-right: 25px;
        line-height: 50px;
        font-size: 20px;
        color: black;
        .canvas {
          position: absolute;
          width: 50px;
          right: -16.5px;
          height: 50px;
        }
      }
    }
  }
}
.pause {
  .minibar {
    div {
      &:first-child {
        img {
          animation-play-state: paused;
        }
      }
    }
  }
}
.color {
  color: black;
}
@keyframes aa {
  form {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>