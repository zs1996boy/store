<template>
  <div class="hot">
    <nav>
      <span></span>
      <router-link to="/hot">
        歌榜
      </router-link>
      <router-link to="/hot/singerbook">
        歌手榜
      </router-link>
      <router-link to="/hot/mvbook">
        mv榜
      </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Hot',
  components: {
  },
  data(){
    return{
    }
  },
  methods:{
    
  },
  created(){
  }
}
</script>
<style lang="less" scoped>
.hot{
  
  nav{
    display: flex;
    &>span{
    width: 10vw;
    min-width: 30px;
    padding-bottom: 10px;
    }
    a {
          letter-spacing:3px;
          font-size: 3.5vw;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 5px;
          color: #333;
          display: inline-block;
          &.router-link-exact-active {
            color: #f12391;
            position: relative;
          }
        }
  }
}
ul,li{
  list-style: none;
}

</style>
