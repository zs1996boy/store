<template>
  <ul class="navbar">
    <div>
      <div>倾听音乐<svg t="1620808055877" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2055"><path d="M136.975 459.498c19.802-8.927 39.667-13.894 57.321-15.067V176.836h318.018V480.64h-0.016c-0.304 26.293-29.81 58.951-73.636 78.663-51.578 23.215-103.462 19.681-115.861-7.876-12.399-27.572 19.361-68.716 70.954-91.93 19.865-8.943 39.743-13.908 57.413-15.081V282.079H255.441v195.819c1.828 26.719-28.196 60.993-73.575 81.405-51.578 23.215-103.446 19.681-115.845-7.876-12.415-27.571 19.361-68.715 70.954-91.929z m307.339 244.457C329.991 755.397 259.586 846.611 287.066 907.68c27.48 61.084 142.442 68.913 256.765 17.472 105.213-47.344 173.229-128.368 161.987-188.584V406.532c120.994 13.466 187.608 29.004 135.177 172.056l35.905 28.09c88.487-89.707 115.663-158.666 44.799-271.328-56.635-90.072-159.259-179.2-215.88-273.34H595.67v608.037c-44.648-1.158-98.07 9.931-151.356 33.908z" p-id="2056" fill="#f12391"></path></svg></div>
      <div class="Sousuo">
        <!-- <router-link to="/search"> -->
          <div class="fa fa-search" @click="router_to"></div>
        <!-- </router-link> -->
      </div>
    </div>
    <div>
      <li><router-link to="/recommend">推荐音乐</router-link></li>
      <li><router-link to="/hot">排行榜</router-link></li>
    </div>
  </ul>
</template>
<script>
export default {
  methods: {
    router_to(){
      this.$router.push('/search')
    }
  },
}
</script>
<style lang="less" scoped>
.navbar {
  border-bottom: 1px solid #999;
  width: 100vw;
  min-width: 133px;
  background-color: #fff;
  position: fixed;
  flex-direction: column;
  top: 0%;
  z-index: 99;
  height: 22.4vw;
  & > div {
    &:first-child {
      display: flex;
      font-size: 5vw;
      font-weight: bold;
      color: #f12391;
      line-height: 11.73333vw;
      padding: 0 3.2vw 0 4.8vw;
      & > div {
        &:first-child {
          width: 80%;
        }
        &:last-child {
            width: 20%;
          &>div{
              color: #ccc;
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: flex-end;
              align-items: center;
          }
        }
      }
    }
    &:nth-child(2) {
      height: 100%;
      display: flex;
      border-bottom: 1px solid #ccc;
      font-size: 3.73333vw;
      height: 10.66667vw;
      line-height: 10.66667vw;
      li {
        flex: 1;
        text-align: center;
        a {
          color: #333;
          display: inline-block;
          &.router-link-exact-active {
            color: #f12391;
            position: relative;
            &::after {
              content: "";
              display: block;
              width: calc(~"100% + 20px");
              margin-left: -10px;
              border: none;
              border-bottom: 2px solid #f12391;
              position: absolute;
              bottom: -1px;
            }
          }
          &.router-link-active{
            color: #f12391;
            position: relative;
            &::after {
              content: "";
              display: block;
              width: calc(~"100% + 20px");
              margin-left: -10px;
              border: none;
              border-bottom: 2px solid #f12391;
              position: absolute;
              bottom: -1px;
            }
          }
        }
      }
    }
  }
  svg{
    margin: 0 0.2vw;
    width:5vw;
  }
}
</style>