<template>
  <div>
    <form @submit="submits">
      <div class="search">
        <input
          type="text"
          placeholder="歌名/歌手"
          @input="input"
          v-model="value"
        />
      </div>
    </form>
    <component :is="showcomponent" :value="value" @submits="submits" @play="$emit('play',$event)"></component>
  </div>
</template>

<script>
// @ is an alias to /src
//热门搜索
import SearchHot from "@/components/SearchHot";
import SearchResults from "@/components/SearchResults";
import SearchTips from "@/components/SearchTips";
export default {
  name: "Search",
  components: {},
  data() {
    return {
      value: "",
      showcomponent: SearchHot,
    };
  },
  methods: {
    input() {
      if (this.value == "") {
        this.showcomponent = SearchHot;
      } else {
        this.showcomponent = SearchTips;
      }
    },
    submits(event) {
      if(event.value){
        this.value=event.value;
      }
      this.showcomponent = SearchResults;
    },
  },
  created() {
    this.axios.get("/personalized/newsong").then((d) => {
      console.log(d);
    });
  },
};
</script>
<style lang="less" scoped>
.search{
  display: flex;
  justify-content: center;
  margin-top: 20px;
  input{
    width: 60%;
    height: 30px;
    outline: none;
    border-color: #f12391;
    border-radius: 30px;
    text-indent: 1em;
  }
}
</style>
