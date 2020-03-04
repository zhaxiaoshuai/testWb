<template>
  <el-form
    ref="AccountFrom"
    :model="account"
    :rules="rules"
    label-position="left"
    label-width="0px"
    class="demo-ruleForm login-container"
  >
    <h3 class="title">系统登录1</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button
        type="primary"
        style="width:100%;"
        @click.native.prevent="handleLogin"
        :loading="logining"
      >登录</el-button>
    </el-form-item>
    <mt-button type="primary" @click="gotoHello">戚</mt-button>
    <mt-button type="primary" @click="gotoHello1">超</mt-button>
  </el-form>
</template>
<script>
import { login } from "@/api/devAssess";
import axios from "axios";
import { Button } from "mint-ui";
import { Indicator } from "mint-ui";
import { Swipe, SwipeItem } from "mint-ui";
import { Range } from "mint-ui";

/*  alert("版本信息"+navigator.appVersion);
 */ export default {
  data() {
    return {
      logining: false,
      ip: "",
      address: "",
      latitude: "",
      longitude: "",
      account: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  mounted() {
    this.freegeoip();
    /*     this.getip();
     */
  },

  methods: {
    freegeoip() {
      axios({
        method: "get",
        url: "http://freegeoip.net/json/",
        data: ""
      }).then(data => {
        this.latitude = data.data.latitude;
        this.longitude = data.data.longitude;
        this.ip = data.data.ip;
      });
    },
    getip() {
      axios({
        method: "get",
        url: "http://ip.chinaz.com/getip.aspx",
        data: ""
      }).then(data => {
        alert(data);
        console.log(data);
        this.ip = data.ip;
        this.address = data.address;
        alert(this.ip);
        alert(this.address);
      });
    },
    gotoHello1() {
      // this.$router.push({ path: "/helloworld" });
      this.$router.push({ path: "/swellsettle/swellsettleclaim" });
    },
      gotoHello() {
          // this.$router.push({ path: "/helloworld" });
          // this.$router.push({ path: "/kirinprotected/getkirinprotected" });
          // this.$router.push({ path: "/kirinprotected/drumRoll" });
          this.$router.push({ path: "/kirinprotected/IntroductionKirinBao" });

          
      },
    handleLogin() {
      // lef user = JSON.parse(JSON.stringify(u))
      //强行进入
      var user = {
        username: "admin",
        password: "qidalin",
        email: "42*****26@qq.com",
        name: "戚大林",
        id: "001",
        appVersion: "版本信息" + navigator.appVersion,
        ip: this.ip,
        address: this.address,
        latitude: this.latitude,
        longitude: this.longitude,
        golumnHeaderList: ['nihao','hello','world']
      };
      sessionStorage.setItem("access-user", JSON.stringify(user));
      this.$router.push({ path: "/user/list" });

      return; //不进行网络请求

      this.$refs.AccountFrom.validate(valid => {
        if (valid) {
          this.logining = true;
          //NProgress.start();
          var loginParams = {
            username: this.account.username,
            password: this.account.pwd
          };

          login(this._validate())
            .then(r => {
              for (var i = 0; i < r.golumnHeaderList.length; i++) {
                r.golumnHeaderList[i].columnHeaderValue;
              }
              this.logining = false;

              if (r.id) {
                //进入主页

                var user = {
                  username: r.username,
                  password: r.password,
                  email: "42*****26@qq.com",
                  name: r.username,
                  id: r.id,
                  appVersion: "版本信息" + navigator.appVersion,
                  ip: this.ip,
                  address: this.address,
                  latitude: this.latitude,
                  longitude: this.longitude,
                  golumnHeaderList: r.golumnHeaderList
                };
                sessionStorage.setItem("access-user", JSON.stringify(user));
                this.$router.push({ path: "/user/list" });
              } else {
                this.$message({
                  message: "用户名不存在或密码错误!",
                  duration: 1500
                });

                this.logining = false;
              }
            })
            .catch(e => {
              this.$message({ message: e.message, duration: 1500 });

              this.logining = false;
            });
        } else {
          this.logining = false;

          console.log("error submit!!");
          return false;
        }
      });
    },
    //搜索条件及校验
    _validate() {
      const regParams = this.getParams();
      return regParams;
    },

    getParams() {
      const params = {
        username: this.account.username,
        password: this.account.pwd
      };

      return params;
    }
  },
  mounted() {
     document.title = "登录";
  }
};
</script>
<style>
body {
  background: #dfe9fb;
}
</style>
<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 160px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  background: -ms-linear-gradient(top, #fff, #6495ed); /* IE 10 */
  background: -moz-linear-gradient(top, #b8c4cb, #f6f6f8); /*火狐*/
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#b8c4cb),
    to(#f6f6f8)
  ); /*谷歌*/
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#fff),
    to(#6495ed)
  ); /* Safari 4-5, Chrome 1-9*/
  background: -webkit-linear-gradient(
    top,
    #fff,
    #6495ed,
    #fff
  ); /*Safari5.1 Chrome 10+*/
  background: -o-linear-gradient(top, #fff, #6495ed); /*Opera 11.10+*/

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
