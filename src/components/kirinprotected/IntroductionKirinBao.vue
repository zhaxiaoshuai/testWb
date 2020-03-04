<template>
  <div class="home-page" ref="homePage">
    <img class="img-logo" src="../../assets/images/qilin.png" s />
    <div class="search">
      <div class="input">什么是麒麟保？</div>
      <div class="look" @click="look">点我查看</div>
    </div>
    <div class="submit_div">
      <mt-button class="submit" type="primary" @click="getkirinprotected">领取麒麟保</mt-button>
    </div>
    <div class="submit_div_bd">
      <mt-button class="submit_bd" type="primary" @click="kirinprotectedservice">查看我的保单</mt-button>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {
      clientHeight: ""
    };
  },
  mounted() {
    document.title = "麒麟保";
    this.clientHeight = `${document.documentElement.clientHeight}`;
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };

    // var token = this.$route.query.token;
    // console.log("token:" + token);
    console.log("url:" + window.location.href);
    // alert(window.location.href);
    var urlArray = window.location.href.split("&param=");
    var array = urlArray[0].split("token=");
    //测试调试
    // alert(token);
    // alert(window.location.href);
    // alert(array[1]);  //token值
    // console.log("token:" + array[1]);
    sessionStorage.setItem("token", array[1]);

    // alert("token:" + array[1]);
    axios.defaults.headers.common["WXAuthorization"] = array[1];
  },
  watch: {
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    }
  },
  methods: {
    changeFixed(clientHeight) {
      this.$refs.homePage.style.height = clientHeight + "px";
    },
    look() {
      this.$router.push({ path: "/kirinprotected/kirinBao" });
    },
    getkirinprotected() {
      // this.$router.push({ path: "/kirinprotected/getkirinprotected" });
      // this.$router.push({ path: "/kirinprotected/getkirinprotected?username=21122" });

      this.$router.push({
        path: "/kirinprotected/getkirinprotected"
      });
    },
    kirinprotectedservice() {
      this.$router.push({ path: "/kirinprotected/kirinprotectedservice" });
    }
  }
};
</script>

<style type="text/scss">
.home-page {
  background: url("../../assets/images/img_background.png") no-repeat left top;
  background-size: 100% 100%;
  position: relative;
}
</style>


<style scoped>

.img-logo {
  width: 71%;
  height: 42%;
  position: absolute;
  bottom: 38%;
  text-align: center;
  left: 16%;
}
.submit_div {
  width: 90%;
  text-align: center;
  position: absolute;
  bottom: 80px;
  left: 5%;
}
.submit {
  text-align: center;
  color: white;
  background-color: #1b7cff;
  width: 100%;
  border-radius: 5px;
  font-size: 15px;
  height: 44px;
}
.submit_div_bd {
  width: 90%;
  text-align: center;
  position: absolute;
  bottom: 20px;
  left: 5%;
}
.submit_bd {
  text-align: center;
  color: #1b7cff;
  background-color: white;
  width: 100%;
  border-radius: 5px;
  font-size: 15px;
  height: 44px;
}
.search {
  width: 100%;
  display: flex;
  align-content: center;
  position: absolute;
  /*left: 23%;*/
  bottom: 29%;
  align-items: center;
  justify-content: center;
}
.search .input {
  width: 30%;
  height: 28px;
  line-height: 28px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  border: 1px solid #dfebff;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.search .look {
  width: 15%;
  height: 28px;
  line-height: 28px;
  background: #dfebff;
  color: #ec1e0e;
  font-size: 12px;
  text-align: center;
  border: 1px solid #dfebff;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
