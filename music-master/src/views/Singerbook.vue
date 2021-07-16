<template>
    <div>
        <load-img v-if="isLoading"></load-img>
    <div v-for="(item,index) in singer" :key="index" class="singer"  @click="$emit('allList',item)">
      <router-link :to="`/SingerSong/${item.id}`" tag="div" >
      <div>
        <img :src="`${item.img1v1Url}`" alt="">
      </div>
      <div>
          <li :style="{'color': (index <=2  ? '#f12391':'')}">{{index+1}}.</li>
          <li>{{item.name}}<span v-show="item.alias[0]">-{{item.alias[0]}}</span></li>
      </div>
      <svg @click.stop="aaa(item.id)" t="1620818877509" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2599"><path d="M512 1009.777778A497.777778 497.777778 0 1 1 512 14.222222a497.777778 497.777778 0 0 1 0 995.555556z m0-85.333334A412.444444 412.444444 0 1 0 512 99.555556a412.444444 412.444444 0 0 0 0 824.888888z" fill="#cccccc" p-id="2600"></path><path d="M316.928 512m-65.024 0a65.024 65.024 0 1 0 130.048 0 65.024 65.024 0 1 0-130.048 0Z" fill="#cccccc" p-id="2601"></path><path d="M512 512m-65.024 0a65.024 65.024 0 1 0 130.048 0 65.024 65.024 0 1 0-130.048 0Z" fill="#cccccc" p-id="2602"></path><path d="M707.072 512m-65.024 0a65.024 65.024 0 1 0 130.048 0 65.024 65.024 0 1 0-130.048 0Z" fill="#cccccc" p-id="2603"></path></svg>
      </router-link>
    </div>
    <div v-show="showsong" class="briefdesc">
      <div>
        <p>
          <span>歌手详情</span>
          <i @click="showsong=!showsong" class="fa fa-times"></i>
        </p>
        <div class="paddingtop"></div>
        <load-img v-if="sss" class="briefdescload"></load-img>
        <div v-show="!sss" class="content">
          {{songdata.briefDesc}}
          <div v-for="(i,ind) in introduction" :key="ind">
            <p>
              {{i.ti}}:
            </p>
            <div>{{i.txt}}</div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
import LoadImg from '@/components/LoadImg.vue'
export default {
    components: {
    LoadImg
  },
    data(){
    return{
      singer:[],
      isLoading: true,
      showsong:false,
      songdata:[],
      sss:true,
      introduction:[],
    }
  },
  methods:{
    aaa(event){
      this.sss=true;
      this.showsong=true;
      this.axios.get('/artist/desc?id='+event).then(da=>{
      this.songdata=da.data;
      this.introduction=this.songdata.introduction;
      this.sss=false;
    })
    }
  },
  created(){
    this.axios.get('/toplist/artist').then(d=>{
      this.singer=d.data.list.artists.slice(0,10);
      console.log(this.singer)
      this.isLoading=false;
    })
    
}
}
</script>
<style lang="less" scoped>
ul,li{
  list-style: none;
}
.singer{
  &>div{
  display: flex;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius:80vw 0 0 80vw;
  z-index: 9;
  div:nth-child(1){
    width: 30%;
    min-width: 80px;
    img{
      min-width: 80px;
      min-height: 80px;
      border-radius:50%;
    }
  }
  div:nth-child(2){
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 68%;
    font-size: 4vw;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    li{
        &:first-child{
            font-weight: bold;
        }
    }
  }
  svg{
      width: 6vw;
      margin-right: 4vw;
  }
  }
}
.briefdesc{
    position: fixed;
    bottom: 0;
    height: 50vh;
    width: 100vw;
    background-color: white;
    overflow: hidden;
    border-radius:3vh 3vh 0 0 ;
    z-index: 999;
    &>div{
      position: relative;
      overflow-y: auto;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .briefdescload{
        position: absolute;
        top: 50%;
        left: 47%;
      }
      &>p{
        width: 100vw;
        height: 30px;
        line-height: 30px;
        text-align: center;
        position: fixed;
        z-index: 22222;
        border-radius:3vh 3vh 0 0 ;
        background-color: white;
        i{
          position: absolute;
          right: 20px;
          top: 5px;
        }
      }
      .paddingtop{
        padding-top: 30px;
      }
      .content{
        line-height:30px;
        text-indent: 2em;
        div{
          p{
            color: #f12391;
            text-indent: 0em;
          }
          div{
            color: #999;
          }
        }
      }
    }
  }
</style>
