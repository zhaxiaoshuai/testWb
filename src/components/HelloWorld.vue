<template>
  <div class>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">option A</mt-tab-item>
      <mt-tab-item id="2">option B</mt-tab-item>
      <mt-tab-item id="3">option C</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-cell v-for="n in 10" :key="n.msg" :title="'content ' + n" />
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell  v-for="n in 100" :key="n.msg" :title="'content ' + n" />

      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell v-for="n in 6" :key="n.msg" :title="'content ' + n" />

      </mt-tab-container-item>
    </mt-tab-container>
    <mt-range v-model="rangeValue"></mt-range>

    <mt-range
      v-model="rangeValue"
      :min="10"
      :max="90"
      :step="10"
      :bar-height="5"
      @change="changeevent()"
    ></mt-range>
    <mt-range
      v-model="inputValue"
      :min="0"
      :max="100"
      :step="1"
      :bar-height="6"
      @input="inputEvent()"
      @change="changeEvent()"
    ></mt-range>

    <mt-button type="default" @click="scan">default</mt-button>
    <mt-button type="primary">primary</mt-button>
    <mt-button type="danger">danger</mt-button>

    <mt-cell title="标题文字" style="color:red"></mt-cell>
    <mt-cell title="标题文字" style="color:red"></mt-cell>

    <a href="javascript:;" class="weui-btn weui-btn_primary">页面主操作</a>

    <div class="weui-slider">
      <div class="weui-slider__inner">
        <div style="width: 0;" class="weui-slider__track"></div>
        <div style="left: 0;" class="weui-slider__handler"></div>
      </div>
    </div>
    <!-- <this.$weui.button>2332</this.$weui.button> -->

    <a href="javascript:;" class="weui-btn weui-btn_primary weui-btn_loading" @click="dianji">
      <i class="weui-loading"></i>页面主操作1
    </a>
    <div style="height:200px">
      <mt-swipe :auto="4000">
        <mt-swipe-item style="background-color:red">1</mt-swipe-item>
        <mt-swipe-item style="background-color:#00ff00">2</mt-swipe-item>
        <mt-swipe-item style="background-color:#00ff99">3</mt-swipe-item>
        <mt-swipe-item style="background-color:#012488">4</mt-swipe-item>
      </mt-swipe>
    </div>

    <mt-field label="username" placeholder="Input username" v-model="username"></mt-field>
    <mt-field label="email" placeholder="Input email" type="email" v-model="email"></mt-field>
    <mt-field label="password" placeholder="Input password" type="password" v-modal="password"></mt-field>
    <mt-field label="phone" placeholder="Input tel" type="tel" v-model="phone"></mt-field>
    <mt-field label="website" placeholder="Input website" type="url" v-model="website"></mt-field>
    <mt-field label="number" placeholder="Input number" type="number" v-model="number"></mt-field>
    <mt-field label="birthday" placeholder="Input birthday" type="date" v-model="birthday"></mt-field>
    <mt-field
      label="introduction"
      placeholder="introduction"
      type="textarea"
      rows="4"
      v-model="introduction"
    ></mt-field>
    <!-- <div class="weui-tabbar">
      <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on">
        <span style="display: inline-block;position: relative;">
          <img src="" alt class="weui-tabbar__icon" />
          <span class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span>
        </span>
        <p class="weui-tabbar__label">微信</p>
      </a>
      <a href="javascript:;" class="weui-tabbar__item">
        <img src="" alt class="weui-tabbar__icon" />
        <p class="weui-tabbar__label">通讯录</p>
      </a>
      <a href="javascript:;" class="weui-tabbar__item">
        <span style="display: inline-block;position: relative;">
          <img src="" alt class="weui-tabbar__icon" />
          <span class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>
        </span>
        <p class="weui-tabbar__label">发现</p>
      </a>
      <a href="javascript:;" class="weui-tabbar__item">
        <img src="" alt class="weui-tabbar__icon" />
        <p class="weui-tabbar__label">我</p>
      </a>
    </div>-->
  </div>
</template>

<script>
import { Range } from "mint-ui";

import { Swipe, SwipeItem } from "mint-ui";

import { Field } from "mint-ui";
import { Navbar, TabItem } from "mint-ui";


// import "http://res.wx.qq.com/open/js/jweixin-1.4.0.js"

// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);

export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    changeEvent: function() {
      console.log("change事件触发啦，滑动停止后的值为-----" + this.WindValue);
    },
    dianji: function() {
      console.log("页面主操作1");
      // wx.scanQRCode({
      //   needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      //   scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      //   success: function(res) {
      //     var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果

      //     console.log(result);
      //   }
      // });
      wx.getNetworkType({
        success: function(res) {
          var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
          console.log(networkType);
        }
      });
    },
    scan: function() {
      console.log("扫码");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
