<template>
  <router-link to="">
    <div
      class="dad"
      v-for="(item, index) in allsong"
      :key="index"
      @click="changeIndex(index + 1, item)"
    >
      <div class="son">
        <span>{{ index + 1 }}.</span>
        <li>
          <ol v-html="$options.filters.highLight(item.name,value)">
            {{
              item.name
            }}
          </ol>
          <ol v-html="$options.filters.highLight(item.name,value)">
            {{
              item.song.artists[0].name
            }}-{{
              item.song.album.name
            }}
          </ol>
        </li>
      </div>
      <span
        :class="[
          show == index + 1 ? 'fa-play-circle' : 'fa-play-circle-o',
          'fa',
          'myplay',
        ]"
        @click.left.prevent.stop="changeIndex(index + 1, item)"
        @click.stop="$emit('play',item)"
      ></span>
    </div>
  </router-link>
</template>
<script>
export default {
  props: {
        allsong:Array,
        value:{
            type:String,
            default:''
        }
    },
  data() {
    return {
      show: 0,
      itemid: "",
    };
  },
  methods: {
    changeIndex(event, item) {
      this.show = event;
      this.itemid = item.id;
      this.$emit("son", item.id);
      console.log(this.allsong);
    },
  },
  filters:{
        highLight(v,k){
            //把 关键词 替换成 <span style="color::red">关键词</span>
           return v.replace(k,'<span style="color:#f12391;">'+k+'</span>')
        }
    }
};
</script>
<style lang="less" scoped>
a {
  color: black;
  -webkit-tap-highlight-color: transparent; //改变点击默认背景蓝色为透明
  .dad {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #ccc;
    .son {
      width: 80%;
      // height: 50px;
      line-height: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 16px;
      font-weight: bold;
      display: flex;
      span:nth-child(1) {
        display: inline-block;
        width: 30px;
        text-align: center;
        color: #ccc;
      }
      li {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        ol {
          height: 25px;
          line-height: 25px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        ol:nth-child(2) {
          color: #ccc;
          font-size: 14px;
          font-weight: normal;
        }
      }
    }
    .myplay {
      height: 50px;
      line-height: 50px;
      font-size: 30px;
      color: #ccc;
    }
  }
}
</style>