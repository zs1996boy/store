<template>
  <div class="comment">
    <p>
      <span @click="New" :class="i==0?'color':''">最新评论</span>
      <span @click="Hot" :class="i==1?'color':''" v-if="hotComments.length">精彩评论</span>
    </p>
    <ul v-for="(item, index) in hotdata" :key="index">
      <div>
        <li>
          <img :src="item.user.avatarUrl" alt="" />
        </li>
        <li>
          <p>{{ item.user.nickname }}</p>
          <p>{{ item.time | formatDate("Y年m月d日") }}</p>
          <p>
            {{ item.content }}
          </p>
        </li>
      </div>
      <div>
        <i class="fa fa-thumbs-o-up"></i>{{ item.likedCount | formatNum() }}
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["hotComments", "comments"],
  data() {
    return {
      hotdata: [],
      i:0,
    };
  },
  methods:{
    Hot(){
      this.hotdata=this.hotComments;
      this.i=1;
    },
    New(){
      this.hotdata=this.comments;
      this.i=0;
    }
  },
  watch: {
    comments(event) {
      console.log(event);
      this.hotdata = event;
    },
    
  },
  filters: {
    formatDate(value, fstr) {
      let d = new Date(value);
      let formatO = {
        "Y+": d.getFullYear(),
        "m+": d.getMonth() + 1,
        "d+": d.getDate(),
        "h+": d.getHours(),
        "M+": d.getMinutes(),
        "S+": d.getSeconds,
      };
      for (let k in formatO) {
        let reg = new RegExp(k);
        let val = formatO[k];
        val = val < 10 ? "0" + val : val;
        fstr = fstr.replace(reg, val);
      }
      return fstr;
    },
    formatNum(value) {
      if (value >= 10000) {
        return (parseInt(value) / 10000).toFixed(0) + "万";
      }
      return value;
    },
  },
};
</script>
<style lang="less" scoped>
.color{
  color: #f12391;
}
.comment {
  & > p {
    color: #ccc;
    padding: 5px;
    background-color: rgb(238, 237, 237);
    span{
      padding: 5px;
    }
  }
  ul {
    padding: 5px;
    border-bottom: 1px solid #ccc;
    display: flex;
    div {
      &:first-child {
        width: 80%;
        display: flex;
        li {
          &:first-child {
            width: 50px;
            height: 50px;
            text-align: center;
            border: 2px solid #f12391;
            box-sizing: border-box;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          &:nth-child(2) {
            padding: 5px;
            width: 80%;
            p {
              &:nth-child(2) {
                font-size: 14px;
                color: #999;
              }
              &:last-child {
                margin: 5px 0;
                font-size: 17px;
                width: 100%;
                word-wrap: break-word;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
          }
        }
      }
      &:last-child {
        width: 20%;
        padding-top: 5px;
        text-align: center;
        i {
          font-size: 20px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>