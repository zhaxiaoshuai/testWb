// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// main.js 为入口文件，并与app.vue组件向关联使此组件为跟组件
// 是所有的内容都在app.vue 上面呈现。
import App from './App'
// import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-default/index.css'
import '@/assets/iconfont.css'
// 在router里配置路由，将app组件相关联
import router from './router'
import Mint from "mint-ui"
import  $  from "jquery"
import { Indicator } from 'mint-ui';

// import Mock from './mock'
// Mock.init()

Vue.config.productionTip = false
// 引入全部组件
// Vue.use(ElementUI)
import 'mint-ui/lib/style.css'
Vue.use(Mint);

// 按需引入部分组件
// import {Cell,Checklist} from 'minu-ui';
// import 'mint-ui/lib/style.css'
// Vue.component(Cell.name, Cell);
// Vue.component(Checklist.name, Checklist);
import { Navbar, TabItem } from 'mint-ui';

import global_ from './components/swellsettle/Global'//引用文件
Vue.prototype.GLOBAL = global_    //挂载到Vue实例上面


Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);

/* eslint-disable no-new */
// 生成vue的根实例;创建每个组件都会生成一个vue的实列，并且会用到根实例上面的所有属性
new Vue({
  el: '#app',
  router,
    // 声明模版
  template: '<App/>',
    // 注册成组件
  components: { App }
})
