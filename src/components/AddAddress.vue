<template>
    <div>
        <van-address-edit
  :area-list="areaList"
  show-postal
  show-delete
  show-set-default
  show-search-result
  :search-result="searchResult"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @delete="onDelete"
  @change-detail="onChangeDetail"
/>
    </div>
</template>
<script>

export default {
  data() {
    return {
      areaList : {
  province_list: {
    // 110000: '北京市',
    // 120000: '天津市',
  },
  city_list: {
    // 110100: '北京市',
    // 120100: '天津市',
  },
  county_list: {
    // 110101: '东城区',
    // 110102: '西城区',
    // ....
  },
},
      searchResult: [],
    };
  },
  created() {
      this.$axios.get('/api/city_list').then(d=>{
              let province_temp = {};
      let province = d.data.data;
      province.forEach((item)=>{
        province_temp[item.v]=item.n;
      });
      this.areaList['province_list'] = province_temp;//添加省

      //市
      let province_tempcity={};
      for(let i=0;i<d.data.data.length;i++){
         let provincecity = d.data.data[i].c;
        //  console.log(provincecity);
         provincecity.forEach((item)=>{
           province_tempcity[item.v]=item.n;
         })
      }
      // console.log(province_tempcity);
      this.areaList['city_list'] = province_tempcity;//添加市

      //区
      let province_tempcounty={}
      for(let i=0;i<d.data.data.length;i++){
        // console.log(d.data.data[i].c[0].c);
        // for(let j=0;j<d.data.data[i].c[0].c.length;j++){
          // console.log(345);
          let provincecounty=d.data.data[i].c[0].c;
          // console.log(provincecounty);
          provincecounty.forEach((item)=>{
            province_tempcounty[item.v]=item.n;
          })
        // }
      }
      this.areaList['county_list'] = province_tempcounty;
      })
  },
  methods: {
    onSave() {
      this.$toast('save');
    },
    onDelete() {
      this.$toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>