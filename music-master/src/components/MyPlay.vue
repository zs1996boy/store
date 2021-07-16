<template>
  <router-link to="">
    <div>
      <div class="app">
        <load-img v-if="lyricArray.length<=0"></load-img>
        <ul class="box">
          <li
            v-for="(item, i) in lyricArray"
            :style="{
              backgroundColor: index == i ? '#990000' : '',
              color: index == i ? '#ccc' : '',
              top: index > 11 ? `-${(index - 10) * 30}px` : '',
            }"
            :key="i"
          >
            {{ item.lyric }}
          </li>
        </ul>
      </div>
      <div class="audio">
          <audio :src="playurl" ref="player" controls @timeupdate="playing" autoplay></audio>
      </div>
    </div>
    
  </router-link>
</template>
<script>
import LoadImg from './LoadImg'
export default {
  props: ["playurl", "playid","currentTimes"],
   components:{
     LoadImg
   },
  data() {
    return {
      index: 0,
      ids: "",
    };
  },
  methods: {
    playing() {
      let ctime = this.currentTimes;
      console.log(ctime)
      if (this.index >= this.lyricArray.length - 2) {
        this.index = this.lyricArray.length - 1;
        return;
      }
      for (let j = 0; j < this.lyricArray.length; j++) {
        if (
          this.lyricArray[j].time < ctime &&
          this.lyricArray[j + 1].time > ctime
        ) {
          this.index = j;
          break;
        }
      }
    },
  },
  computed: {
    lyricArray() {
      //裁切lyric字符串
      let arr = this.ids.split("\n");
      // console.log(arr);
      //正则判断时间
      let reg = /\[(\d+):(\d+\.+\d+)\](.*)/;
      //创建空数组
      let arrs = [];
      //循环裁切后的arr数组
      for (let j = 0; j < arr.length; j++) {
        //
        let l = arr[j];
        if (reg.test(l)) {
          arrs.push({
            time: parseInt(RegExp.$1) * 60 + parseFloat(RegExp.$2),
            lyric: RegExp.$3,
          });
        }
      }
      return arrs;
    },
  },
  created() {
    this.$nextTick(()=>{
      this.$axios.get(`/lyric?id=${this.playid}`).then((d) => {
      this.ids = d.data.lrc.lyric;
      //   console.log(this.ids)
    });
    })
    
  },
  activated() {},
};
</script>
<style lang="less" scoped>
.audio {
  position: fixed;
  align-items: center;
  bottom: 0px;
  left: 0px;
  height: 10vh;
  width: 100%;
  background-color: #f1f3f4;
  audio{
    height: 10vh;
    width: 100%;
  }
}
.box {
  width: 100vw;
  height: 100%;
  overflow: auto;
}
.box > li {
  line-height: 30px;
  position: relative;
}
.app {
  margin: 0px auto;
  height: 90vh;
  text-align: center;
  overflow: hidden;
}
</style>