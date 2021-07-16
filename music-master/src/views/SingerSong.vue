<template>
    <div>
        <get-back></get-back>
        <my-img :item="picUrl">热度第一:{{allsongname}}</my-img>
        <li-item :allsong="allsong" @play="$emit('play',$event)"></li-item>
    </div>
</template>
<script>
import GetBack from '../components/GetBack.vue';
import MyImg from '../components/MyImg.vue';
import LiItem from '@/components/LiItem.vue';
export default {
  props: ["id"],
  components: {
    LiItem,
    GetBack,
    MyImg,
  },
    data() {
    return {
        allsong:[],
        picUrl:'',
        allsongname:''

    };
  },
  created() {
    this.$nextTick(() => {
      this.$axios.get(`/artist/top/song?id=${this.id}`).then((da) => {
        let songss=da.data.songs.map((data)=>{
                data.song={
                    artists:data.ar,
                    album:data.al
                }
                return data;
            });
        this.allsong = this.allsong.concat(songss);
        this.picUrl=da.data.songs[0].al.picUrl;
        this.allsongname=da.data.songs[0].name;
        console.log(this.allsong)
      })
    });
      
  },
  activated(){
      
  },
  
};
</script>
<style lang="less" scoped>
</style>
