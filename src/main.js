import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import 'vant/lib/index.css'
import {Uploader,ActionSheet,Dialog,Area,AddressEdit,Toast,AddressList,Step, Steps,Loading,Cell, CellGroup,SubmitBar,Popup,CouponCell, CouponList,ContactCard,Checkbox, CheckboxGroup,Stepper,RadioGroup, Radio,Sku,GoodsAction, GoodsActionIcon, GoodsActionButton ,Overlay,Tag,Col, Row,Tab, Tabs,Button,Tabbar,TabbarItem,Search,
  Image as VanImage,Swipe, SwipeItem,Lazyload,Grid, GridItem,Icon,
  SwipeCell,Card,Form,Field} from 'vant'

Vue.config.productionTip = false
Vue.use(Tabbar).use(TabbarItem).use(Search).use(VanImage).use(Uploader);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Icon);
Vue.use(SwipeCell);
Vue.use(Card);
Vue.use(Button);
Vue.use(Tab).use(Tabs);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tag);
Vue.use(Overlay);
Vue.use(Form).use(Field);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Sku).use(ContactCard);
Vue.use(CouponCell).use(CouponList).use(Popup).use(SubmitBar);
Vue.use(RadioGroup).use(Radio).use(Stepper).use(Checkbox).use(CheckboxGroup);
Vue.use(Cell).use(CellGroup).use(Loading);
Vue.use(Step).use(Steps).use(AddressList).use(Toast).use(AddressEdit).use(Area).use(Dialog).use(ActionSheet);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
