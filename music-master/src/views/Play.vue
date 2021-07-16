<template>
  <div class="box">
    <get-back></get-back>
    <my-play :playurl="playurl" :playid="playid"></my-play>
  </div>
</template>

<script>
import MyPlay from "@/components/MyPlay";
import GetBack from '../components/GetBack.vue';
export default {
  props: ["playid","PlayEr"],
  components: {
    MyPlay,
    GetBack,
  },
  data() {
    return {
      playurl: "",
    };
  },
  created() {
    this.$axios.get(`song/url?id=${this.playid}`).then((d) => {
      this.playurl = d.data.data[0].url;
      console.log(d)
      console.log(this.PlayEr)
    });
  },
  activated() {},
};
</script>
<style lang="less" scoped>
.box{
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
  z-index: 9999;
  overflow: hidden;
}
</style>