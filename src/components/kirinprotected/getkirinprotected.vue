<template>
<div class="mainPage">
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
    />
  </head>
  <div class="titleHeaderDiv" v-if="1">个人信息</div>
  <div class="titleDiv" v-if="1">
    <!-- :attr="{ maxlength: 11 }" -->

    <mt-field
      type="number"
      class="title"
      label="手机号"
      :attr="{ maxlength: 11 }"
      placeholder
      v-model="params.phone"
      style="border-top-left-radius: 10px;border-top-right-radius: 10px;"
      :readonly="isOldUser"
    ></mt-field>
    <mt-field
      class="title"
      label="验证码"
      placeholder
      v-model="params.verificationCode"
      @blur.native.capture="codeChange"
      v-if="this.isOldUser == false"
    >
      <Button class="get_verification_code" @click="getCodeFun" :disabled="disabled" v-if="sending">
        <template>获取验证码</template>
      </Button>
      <Button class="time_countdown" :disabled="disabled" v-else>
        <template>{{second}}秒后重发</template>
      </Button>
      <!-- <Button class="get_verification_code" @click="getCodeFun" :disabled="disabled">
          <template v-if="sending">获取验证码</template>
          <template v-else>{{second}}秒后重发</template>
      </Button>-->
    </mt-field>

    <mt-field
      class="title"
      autofocus="autofocus"
      label="车牌号"
      placeholder
      v-model="params.licensePlateNumber"
      @focus.native.capture="licensePlateNumberFocus"
      @blur.native.capture="licensePlateNumberBlur"
      id="inputLicensePlateNumber"
    >
      <img
        class="text_image"
        src="../../assets/images/camera.png"
        @click="callCamera"
        ref="fileBtn"
      />
    </mt-field>
    <!-- hidden="true" -->
    <!-- onpropertychange="carnumUpload(event)" -->
    <input type="file" id="crowd_file" hidden="true" class="crowd_file" accept="image/*" />
    <mt-field
      class="title"
      label="地区"
      placeholder
      v-model="params.region"
      style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;"
      readonly="true"
    ></mt-field>
    <!-- disabled="disabled" -->
  </div>
  <div class="titleHeaderDiv">条码信息</div>
  <div class="titleDiv">
    <mt-field
      class="title"
      id="title"
      label="条码1"
      placeholder
      v-model="params.barcode1.barCode"
      style="border-top-left-radius: 10px;border-top-right-radius: 10px;"
      @blur.native.capture="leaveBarCode(params.barcode1,0)"
      @focus.native.capture="editBarCode(params.barcode1)"
      :readonly="params.barcode1.status == 3"
    >
      <div class="text_title" v-if="params.barcode1.barCode" @click="replace(params.barcode1,0)">替换</div>
      <img
        class="text_image"
        v-else
        src="../../assets/images/qilininsurance_scan.png"
        id="wxcode"
        @click="scanToScan(params.barcode1,0)"
      />
    </mt-field>
    <mt-field
      class="title"
      id="title"
      label="条码2"
      placeholder
      v-model="params.barcode2.barCode"
      @blur.native.capture="leaveBarCode(params.barcode2,0)"
      @focus.native.capture="editBarCode(params.barcode2)"
      :readonly="params.barcode2.status == 3"
    >
      <div class="text_title" v-if="params.barcode2.barCode" @click="replace(params.barcode2,0)">替换</div>
      <img
        class="text_image"
        v-else
        src="../../assets/images/qilininsurance_scan.png"
        @click="scanToScan(params.barcode2,0)"
      />
    </mt-field>
    <mt-field
      class="title"
      id="title"
      label="条码3"
      placeholder
      v-model="params.barcode3.barCode"
      @blur.native.capture="leaveBarCode(params.barcode3,0)"
      @focus.native.capture="editBarCode(params.barcode3)"
      :readonly="params.barcode3.status == 3"
    >
      <div class="text_title" v-if="params.barcode3.barCode" @click="replace(params.barcode3,0)">替换</div>
      <img
        class="text_image"
        v-else
        src="../../assets/images/qilininsurance_scan.png"
        @click="scanToScan(params.barcode3,0)"
      />
    </mt-field>
    <mt-field
      class="title"
      id="title"
      label="条码4"
      placeholder
      v-model="params.barcode4.barCode"
      @blur.native.capture="leaveBarCode(params.barcode4,0)"
      @focus.native.capture="editBarCode(params.barcode4)"
      :readonly="params.barcode4.status == 3"
    >
      <div class="text_title" v-if="params.barcode4.barCode" @click="replace(params.barcode4,0)">替换</div>
      <img
        class="text_image"
        v-else
        src="../../assets/images/qilininsurance_scan.png"
        @click="scanToScan(params.barcode4,0)"
      />
    </mt-field>
    <mt-field
      class="title"
      id="title"
      label="条码5"
      placeholder
      v-model="params.barcode5.barCode"
      @blur.native.capture="leaveBarCode(params.barcode5,0)"
      @focus.native.capture="editBarCode(params.barcode5)"
      :readonly="params.barcode5.status == 3"
    >
      <div class="text_title" v-if="params.barcode5.barCode" @click="replace(params.barcode5,0)">替换</div>
      <img
        class="text_image"
        v-else
        src="../../assets/images/qilininsurance_scan.png"
        @click="scanToScan(params.barcode5,0)"
      />
    </mt-field>
    <mt-field
      class="title"
      id="title"
      label="冬季胎条码1"
      placeholder
      v-model="params.winterTyresBarcode1.barCode"
      @blur.native.capture="leaveBarCode(params.winterTyresBarcode1,1)"
      @focus.native.capture="editBarCode(params.winterTyresBarcode1)"
      :readonly="params.winterTyresBarcode1.status == 3"
    >
      <div
        class="text_title"
        v-if="params.winterTyresBarcode1.barCode"
        @click="replace(params.winterTyresBarcode1,1)"
      >替换</div>
      <img
        class="text_image"
        v-else
        src="../../assets/images/qilininsurance_scan.png"
        @click="scanToScan(params.winterTyresBarcode1,1)"
      />
    </mt-field>
    <mt-field
      class="title"
      id="title"
      label="冬季胎条码2"
      placeholder
      v-model="params.winterTyresBarcode2.barCode"
      @blur.native.capture="leaveBarCode(params.winterTyresBarcode2,1)"
      @focus.native.capture="editBarCode(params.winterTyresBarcode2)"
      :readonly="params.winterTyresBarcode2.status == 3"
    >
      <div
        class="text_title"
        v-if="params.winterTyresBarcode2.barCode"
        @click="replace(params.winterTyresBarcode2,1)"
      >替换</div>
      <img
        class="text_image"
        v-else
        src="../../assets/images/qilininsurance_scan.png"
        @click="scanToScan(params.winterTyresBarcode2,1)"
      />
    </mt-field>
    <mt-field
      class="title"
      id="title"
      label="冬季胎条码3"
      placeholder
      v-model="params.winterTyresBarcode3.barCode"
      @blur.native.capture="leaveBarCode(params.winterTyresBarcode3,1)"
      @focus.native.capture="editBarCode(params.winterTyresBarcode3)"
      :readonly="params.winterTyresBarcode3.status == 3"
    >
      <div
        class="text_title"
        v-if="params.winterTyresBarcode3.barCode"
        @click="replace(params.winterTyresBarcode3,1)"
      >替换</div>
      <img
        class="text_image"
        v-else
        src="../../assets/images/qilininsurance_scan.png"
        @click="scanToScan(params.winterTyresBarcode3,1)"
      />
    </mt-field>
    <mt-field
      class="title"
      id="title"
      label="冬季胎条码4"
      placeholder
      v-model="params.winterTyresBarcode4.barCode"
      @blur.native.capture="leaveBarCode(params.winterTyresBarcode4,1)"
      @focus.native.capture="editBarCode(params.winterTyresBarcode4)"
      :readonly="params.winterTyresBarcode4.status == 3"
    >
      <div
        class="text_title"
        v-if="params.winterTyresBarcode4.barCode"
        @click="replace(params.winterTyresBarcode4,1)"
      >替换</div>
      <img
        class="text_image"
        v-else
        src="../../assets/images/qilininsurance_scan.png"
        @click="scanToScan(params.winterTyresBarcode4,1)"
      />
    </mt-field>
    <mt-field
      class="title"
      id="title"
      label="冬季胎条码5"
      placeholder
      v-model="params.winterTyresBarcode5.barCode"
      style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;"
      @blur.native.capture="leaveBarCode(params.winterTyresBarcode5,1)"
      @focus.native.capture="editBarCode(params.winterTyresBarcode5)"
      :readonly="params.winterTyresBarcode5.status == 3"
    >
      <div
        class="text_title"
        v-if="params.winterTyresBarcode5.barCode"
        @click="replace(params.winterTyresBarcode5,1)"
      >替换</div>
      <img
        class="text_image"
        v-else
        src="../../assets/images/qilininsurance_scan.png"
        @click="scanToScan(params.winterTyresBarcode5,1)"
      />
    </mt-field>
  </div>

  <div class="submit_div">
    <mt-button id="submit" class="submit" type="primary" @click="submit">提交申请</mt-button>
  </div>
  <!-- 此处slots为动态传入的值，通过computed来处理，数据通过vuex管理，由于数据为对象数组，需设置 value-key 属性来指定显示的字段名 -->
  <mt-popup v-model="popupVisible" position="bottom" class="mint-popup">
    <mt-button @click="handleConfirm" class="popupSure">确认</mt-button>
    <mt-button @click="handleInput" class="handlePopupSure">手输</mt-button>

    <mt-picker
      :slots="slots"
      @change="onDateChange"
      :visible-item-count="5"
      :show-toolbar="true"
      ref="picker"
      value-key="carNum"
    ></mt-picker>
  </mt-popup>
</div>
</template>

<script>
// import "http://res.wx.qq.com/open/js/jweixin-1.4.0.js"
import { jssdkSign } from "@/api/devAssess";
import wx from "weixin-js-sdk";
import { Toast } from "mint-ui";
import $ from "jquery";
import { Indicator } from "mint-ui";
// 正则
import { isLicensePlate } from "@/libs/filters/regex";
// import { EXIF } from "@/libs/filters/exif";
import { EXIF } from "./exif.js";

export default {
  name: "getkirinprotected",

  data() {
    return {
      // mt-picker 绑定到 slots 属性的数组由对象组成，每个对象都对应一个 slot
      slots: [
        {
          // flex: 1,
          // 对应 slot 的备选值数组。若为对象数组，则需在 mt-picker 标签上设置 value-key 属性来指定显示的字段名
          values: [],
          // className: "slot1",
          // 对应 slot 的对齐方式
          textAlign: "center"
        }
      ],
      // editSubmit: false, //此字段用在编辑过程中提交
      //验证码错误 ，true：错误  false：正确
      verificationCodeError: false,
      //控制键盘  只有多个车牌号的时候用到这个字段
      licensePlateNumberEidt: false,
      // 未找到引用
      show: true,
      // 控制popup组件的显示与隐藏
      popupVisible: false,
      // 是否是老用户 如果是老用户true 将会加载老用户的信息
      isOldUser: false,
      // 未找到引用
      msg: "Welcome to Your Vue.js App",
      // 验证码倒计时默认值
      second: 60,
      // 防止有人把disabled属性去掉 重复获取验证码
      sending: true,
      // 默认组件不可以编辑
      disabled: false,
      // 老用户的地理位置 k3系统 有的二维码可能之前在别的城市有扫过
      city: "",
      // 老用户的地理位置 k3系统 有的二维码可能之前在别的城市有扫过
      province: "",
      // carArray: [],
      //旧条码
      oldBarcode: [], 
       //新条码
      newBarcode: [],
      //旧冬季条码
      oldWinterBarcode: [], 
      //新冬季条码
      newWinterBarcode: [], 
      //记录编辑的条码
      editingBarCode: { barCode: "", status: "" }, 
      params: {
        // 手机号双向绑定
        phone: "",
        // 验证码双向绑定
        verificationCode: "",
        // 车牌号的数据绑定
        licensePlateNumber: "",
        city: "",
        province: "",
        region: "",
        barcode1: {
          barCode: "",
          status: ""
        },
        barcode2: {
          barCode: "",
          status: ""
        },
        barcode3: {
          barCode: "",
          status: ""
        },
        barcode4: {
          barCode: "",
          status: ""
        },
        barcode5: {
          barCode: "",
          status: ""
        },
        winterTyresBarcode1: {
          barCode: "",
          status: ""
        },
        winterTyresBarcode2: {
          barCode: "",
          status: ""
        },
        winterTyresBarcode3: {
          barCode: "",
          status: ""
        },
        winterTyresBarcode4: {
          barCode: "",
          status: ""
        },
        winterTyresBarcode5: {
          barCode: "",
          status: ""
        }
        // avatar: require("@/assets/images/789.png")
      }
    };
  },

  methods: {
    // base64转blob对象  https://blog.csdn.net/qq_39098813/article/details/81263598
    dataURLtoBlob(dataurl) {
      //base64格式图片 转为Blob
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },

    // 未找到该方法调用的位置
    compress(fileObj) {
      var then = this;
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        // 上传image
        reader.readAsDataURL(fileObj);
        reader.onload = function(e) {
          let image = new Image(); //新建一个img标签（还没嵌入DOM节点)
          image.src = e.target.result;
          image.onerror = () => resolve(fileObj);

          image.onload = function() {
            // let canvas = document.createElement("canvas"),
            //   context = canvas.getContext("2d"),
            //   /* imageWidth = image.width / 2,    //压缩后图片的大小
            //                      imageHeight = image.height / 2,*/
            //   imageWidth = 200,
            //   imageHeight = 250,
            //   data = "";

            // canvas.width = imageWidth;
            // canvas.height = imageHeight;
            // context.drawImage(image, 0, 0, imageWidth, imageHeight);
            // data = canvas.toDataURL("image/jpeg");
            // var blogData = then.dataURLtoBlob(data);
            // resolve(blogData);

            // 获取图片元数据（EXIF 变量是引入的 exif-js 库暴露的全局变量）

            EXIF.getData(image, function() {
              // 获取图片旋转标志位
              var orientation = EXIF.getTag(then, "Orientation");
              // 根据旋转角度  在画布上对图片进行旋转
              if (orientation === 3 || orientation === 6 || orientation === 8) {
                const canvas = document.createElement("canvas");

                const ctx = canvas.getContext("2d");
                // canvas.width = 200;
                // canvas.height = 250;
                switch (orientation) {
                  case 3: // 旋转180°
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.rotate((180 * Math.PI) / 180);
                    ctx.drawImage(
                      img,
                      -img.width,
                      -img.height,
                      img.width,
                      img.height
                    );
                    break;
                  case 6: // 旋转90°
                    canvas.width = img.height;
                    canvas.height = img.width;
                    ctx.rotate((90 * Math.PI) / 180);
                    ctx.drawImage(img, 0, -img.height, img.width, img.height);
                    break;
                  case 8: // 旋转-90°
                    canvas.width = img.height;
                    canvas.height = img.width;
                    ctx.rotate((-90 * Math.PI) / 180);
                    ctx.drawImage(img, -img.width, 0, img.width, img.height);
                    break;
                }
                // 返回新图片
                // canvas.toBlob(file => resolve(fileObj), "image/jpeg", 0.92);
                Toast("2222");

                var data = canvas.toDataURL("image/jpeg");
                var blogData = then.dataURLtoBlob(data);
                resolve(blogData);
              } else {
                resolve(fileObj);
              }
            });
          };
        };
      });
    },
    // 验证码离开焦点后触发的事件
    codeChange: function() {
      // Toast("离开验证码调用接口");
      console.log("验证码 input 离开啦");
      // this.params.verificationCode 验证码数据双向绑定
      if (this.params.verificationCode == "") {
        //如果验证码为空 不进行网络请求
        // Toast("请输入验证码");
        return;
      }
      // 接口需要的参数
      /*
        this.params.phone 手机号双向绑定
      */
      var params = {
        phone: this.params.phone,
        registCode: this.params.verificationCode
      };

      Indicator.open({
        //文字
        text: "加载中...",
        //样式
        spinnerType: "fading-circle"
      });
      this.axios
        .post("/qlb/insurance/white/checkRegisterCode", params)
        .then(res => {
          if (res.code == 0) {
            if (res.data.length != 0) {
              //有数据情况
              // document.activeElement.blur(); //键盘触发取消
              $("#inputLicensePlateNumber .mint-field-core").blur(); //键盘触发取消

              for (let i = 0; i < res.data.length; i++) {
                // var item = res.data[i];
                this.slots[0].values.push(res.data[i]);
              }
              this.popupVisible = true;
            } else {
              //没数据情况
              this.popupVisible = false;
            }
            this.verificationCodeError = false; //验证码正确
          } else {
            Toast(res.msg);
            this.verificationCodeError = true; //验证码错误
            // alert(res.msg);
            console.log(res.code);
          }
          Indicator.close();
        });
    },
    // 未在页面找到这个事件的调用
    changeEvent: function() {
      console.log("change事件触发啦，滑动停止后的值为-----" + this.WindValue);
    },
    // 未在页面找到这个事件的调用
    dianji: function() {
      console.log("页面主操作1");
      wx.getNetworkType({
        success: function(res) {
          var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
          console.log(networkType);
        }
      });
    },
    // wexin-js-sdk后台返回的接口
    wxConfig(_appid, _timestamp, _nonceStr, _signature) {
      // alert("微信配置");
      var that = this;
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: _appid, // 必填，公众号的唯一标识
        timestamp: _timestamp, // 必填，生成签名的时间戳
        nonceStr: _nonceStr, // 必填，生成签名的随机串
        signature: _signature, // 必填，签名，见附录1
        jsApiList: [
          "checkJsApi", //判断当前客户端版本是否支持指定JS接口
          "translateVoice", // 识别音频并返回识别结果接口  * 未找到调用
          "scanQRCode", // 微信扫一扫接口   *定义在scanToScan方法中 782行
          "openCard", //查看微信卡包中的卡券接口  * 未找到调用
          "chooseImage", //拍照或从手机相册中选图接口  * 未找到调用
          "uploadImage" //上传图片接口  * 未找到调用
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      // 通过ready接口处理成功验证
      wx.ready(function() {
        wx.checkJsApi({
          jsApiList: [
            "checkJsApi", //判断当前客户端版本是否支持指定JS接口
            "translateVoice", // 识别音频并返回识别结果接口
            "scanQRCode", // 微信扫一扫接口
            "openCard", //查看微信卡包中的卡券接口
            "chooseImage", //拍照或从手机相册中选图接口
            "uploadImage" //上传图片接口
          ],
          success: function(res) {
            if (res.checkResult.scanQRCode === true) {
              // alert("配置成功");
            } else {
              alert("抱歉，当前客户端版本不支持扫一扫");
            }
          }
        });
        wx.getLocation({
          type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function(res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度

            // 拼接后台接口需要的参数
            var params = {
              location:
                String(longitude).substring(0, 8) +
                "," +
                String(latitude).substring(0, 8)
            };
            //调用接口 获取省市区

            that.axios
              .post("/qlb/insurance/white/getlocation", params)
              .then(res => {
                if (res.code == 0) {
                  // alert("地理位置成功" + that.province);
                  //存定位
                  that.city = res.data.city;
                  that.province = res.data.province;
                  //存请求数据
                  if (
                    that.params.province.length == 0 ||
                    that.params.city.length == 0
                  ) {
                    that.params.province = res.data.province;
                    that.params.city = res.data.city;
                    that.params.region = res.data.province + res.data.city;
                  }
                } else {
                  Toast(res.msg);
                  console.log(res.code);
                }
              });
          }
        });
      });
      //  weixin-js-sdk 出错配置
      wx.error(function(res) {
        alert("配置出错了：" + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
      });
    },
    // 失去焦点后校验输入条码是否合法的事件
    leaveBarCode: function(item, isCommon) {
      // document.body.scrollTop = 0;
      // document.documentElement.scrollTop = 0;
      // document.activeElement.blur(); //键盘触发取消
      //离开编辑条码
      var _this = this;
      _this.checkToeMouthCount(item.barCode, isCommon).then(data => {
        // 非0状态提示 并且不是-2状态 ，  -2代表为条码为空
        if (data.code == 0 || data.code == -2) {
          if (isCommon == 0) {
            if (item.firstScan == null) {
              //判断是否第一次扫码 eidtOrReplace == 1 说明是已经第一次扫码了 （新条码录入场景：第一次扫码 然后编辑的情况（） oldBarcode不记录）
              if (item.eidtOrReplace == null) {
                //判断是否第一次替换 eidtOrReplace == 1  ，说明是已经第一次替换或编辑了 中间的替换oldBarcode不记录
                // Toast("第一次编辑");
                // 记录这次扫码的信息 并且保存到旧条码的数组中
                _this.oldBarcode.push(_this.editingBarCode.barCode);
                item.eidtOrReplace = 1;
              } else {
                // Toast("非第一次编辑");
              }
            }
            //删除之前的条码 indexOf() 如果找到对应的数据返回下标，如果没找到返回-1
            if (_this.newBarcode.indexOf(_this.editingBarCode.barCode) >= 0) {
				// splice(indexOf(x),1) 当x存在时 就删除当前x
              _this.newBarcode.splice(
                _this.newBarcode.indexOf(_this.editingBarCode.barCode),
                1
              );
            }
			  //编辑这条不存在的话 加入新数组
            if (_this.newBarcode.indexOf(item.barCode) < 0) {
              _this.newBarcode.push(item.barCode);
            }
          } else {
            if (item.firstScan == null) {
              //判断是否第一次扫码 eidtOrReplace == 1 说明是已经第一次扫码了 （新条码录入场景：第一次扫码 然后编辑的情况（） oldWinterBarcode不记录）
              if (item.eidtOrReplace == null) {
                //判断是否第一次替换 eidtOrReplace == 1  ，说明是已经第一次替换或编辑了 中间的替换oldBarcode不记录
                // Toast("第一次编辑");
                _this.oldWinterBarcode.push(_this.editingBarCode.barCode);
                item.eidtOrReplace = 1;
              } else {
                // Toast("非第一次编辑");
              }
            }
            //删除之前的冬季条码
            if (
              _this.newWinterBarcode.indexOf(_this.editingBarCode.barCode) >= 0
            ) {
              _this.newWinterBarcode.splice(
                _this.newWinterBarcode.indexOf(_this.editingBarCode.barCode),
                1
              );
            }
            if (_this.newWinterBarcode.indexOf(item.barCode) < 0) {
              //编辑这条存在的话 不加入新数组
              _this.newWinterBarcode.push(item.barCode);
            }
          }
          // if (_this.editSubmit) {
          //   //这种情况只有光标在输入框内 点击提交的时候 记录editSubmit为true，等光标离开输入框焦点后再执行提交
          //   _this.submit();
          // }
        } else {
          //此处加入code为-2 不会执行以下 判断中的 item.barCode == ""  代码暂时保留
          if (item.barCode == "") {
            //删除之前的旧条码
            // Toast("请输入条码信息");
            if (isCommon == 0) {
              if (_this.newBarcode.indexOf(_this.editingBarCode.barCode) >= 0) {
                _this.newBarcode.splice(
                  _this.newBarcode.indexOf(_this.editingBarCode.barCode),
                  1
                );
              }
            } else {
              if (
                _this.newWinterBarcode.indexOf(_this.editingBarCode.barCode) >=
                0
              ) {
                _this.newWinterBarcode.splice(
                  _this.newWinterBarcode.indexOf(_this.editingBarCode.barCode),
                  1
                );
              }
            }

            return;
          }
          //如果条码不存在，设置为之前记录的条码

          item.barCode = _this.editingBarCode.barCode;
        }
      });
    },
    // 输入框焦点触发事件
    editBarCode: function(item) {
      // this.editSubmit = false;
      if (this.checkInformation() == false) {
        document.activeElement.blur(); //键盘取消
        return;
      }
      //记录正在编辑的条码
      this.editingBarCode = {
        barCode: item.barCode,
        status: item.status
      };
      // Toast("正在编辑条码:" + this.editingBarCode.barCode);
    },
    checkToeMouthCount(barCode, isCommon) {
      if (barCode != "") {
        Indicator.open({
          text: "加载中...",
          //文字
          spinnerType: "fading-circle"
          //样式
        });
      }

      return new Promise((resolve, reject) => {
        this.axios
          .post("/qlb/claim/white/checkToeMouthCount", {
            toeMouthCode: barCode,
            type: isCommon
          })
          .then(res => {
            if (res.code != 0 && res.code != -2) {
              // 非0状态提示 并且不是 -2 状态 ，  -2代表为条码为空
              Toast(res.msg);
            }
            Indicator.close();

            resolve(res);
          });
      });
    },
    // 条码的扫描事件
    scanToScan: function(item, isCommon) {
      if (this.checkInformation() == false) {
        return;
      }
      //扫一扫条码
      var _this = this;
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res) {
          // Toast(res.resultStr);
          _this.checkToeMouthCount(res.resultStr, isCommon).then(data => {
            if (data.code == 0 || data.code == -2) {
              item.barCode = res.resultStr;
              item.firstScan = 1;
              if (isCommon == 0) {
                _this.newBarcode.push(item.barCode);
              } else {
                _this.newWinterBarcode.push(item.barCode);
              }
            }
          });
        },
        fail: function() {
          Toast("扫码出错");
        },
        error: function() {
          alert("error");
        }
      });
    },
    // 替换二维码上传事件
    replace(item, isCommon) {
      if (this.checkInformation() == false) {
        return;
      }
      //替换条码
      if (item.status == 3) {
        Toast("条码正在理赔中，无法替换");
        return;
      }
      var _this = this;

      // 调起微信扫一扫接口
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
        success: function(res) {
          //判断条码是否存在，如果存在的话 继续执行
          _this.checkToeMouthCount(res.resultStr, isCommon).then(data => {
            if (data.code == 0 || data.code == -2) {
              if (isCommon == 0) {
                if (item.firstScan == null) {
                  //判断是否第一次扫码 eidtOrReplace == 1 说明是已经第一次扫码了 （新条码录入场景：第一次扫码 然后替换的情况（） oldBarcode不记录）
                  if (item.eidtOrReplace == null) {
                    //判断是否第一次替换 eidtOrReplace == 1  ，说明是已经第一次替换或编辑了 中间的替换oldBarcode不记录
                    // Toast("第一次替换");
                    _this.oldBarcode.push(item.barCode);
                    item.eidtOrReplace = 1;
                  } else {
                    // Toast("非第一次替换");
                  }
                }
                //删除之前的条码
                _this.newBarcode.splice(
                  _this.newBarcode.indexOf(item.barCode),
                  1
                );
                //新增新扫的条码
                item.barCode = res.resultStr;

                if (_this.newBarcode.indexOf(item.barCode) < 0) {
                  //编辑这条存在的话 不加入新数组 否则加入
                  _this.newBarcode.push(item.barCode);
                }
              } else {
                if (item.firstScan == null) {
                  //判断是否第一次扫码 eidtOrReplace == 1 说明是已经第一次扫码了  ，（新条码录入场景：第一次扫码 然后替换的情况 oldWinterBarcode不记录）
                  if (item.eidtOrReplace == null) {
                    //判断是否第一次替换 eidtOrReplace == 1 ，说明是已经第一次替换或编辑了 中间的替换oldBarcode不记录
                    // Toast("第一次替换");
                    _this.oldWinterBarcode.push(item.barCode);
                    item.eidtOrReplace = 1;
                  } else {
                    // Toast("非第一次替换");
                  }
                }

                //删除之前的冬季条码
                _this.newWinterBarcode.splice(
                  _this.newWinterBarcode.indexOf(item.barCode),
                  1
                );
                //新增新扫的冬季条码
                item.barCode = res.resultStr;
                if (_this.newWinterBarcode.indexOf(item.barCode) < 0) {
                  //编辑这条存在的话 不加入新数组 否则加入
                  _this.newWinterBarcode.push(item.barCode);
                }
              }
            }
          });
        },
        fail: function() {
          Toast("扫码出错");
          // console.log("出错了2");
        },
        error: function() {
          alert("error");
        }
      });
    },
    // 点击'小相机'按钮上传图片
    callCamera: function() {
      if (this.params.phone == "") {
        Toast("请输入手机号");
        return false;
      }
      if (this.params.phone.length != 11) {
        this.params.phone = "";
        Toast("请输入正确手机号");
        return false;
      }
      if (this.params.verificationCode == "") {
        Toast("请输入验证码");
        return false;
      }
      if (this.verificationCodeError) {
        //验证码输入错误 不能上传图片
        Toast("验证码输入错误");
        this.params.verificationCode == "";
        return;
      }
      var _this = this;
      $("#crowd_file").click();
      $("#crowd_file").on("change", function(e) {
        _this.carnumUpload();
        // _this.compress($("#crowd_file")[0].files[0]).then(obj => {
        //   const params = new FormData(); // 创建一个formdata对象
        //   params.append("file", obj);

        //   Indicator.open({
        //     text: "加载中...",
        //     //文字
        //     spinnerType: "fading-circle"
        //     //样式
        //   });
        //   //开始上传
        //   _this.axios
        //     .post("/qlb/imageAnalys/white/carnumUpload", params)
        //     .then(res => {
        //       if (res.code == 0) {
        //         _this.params.licensePlateNumber = res.data;
        //         _this.licensePlateNumberBlur();
        //       } else {
        //         Toast(res.msg);
        //       }
        //       Indicator.close();
        //       var obj = document.getElementById("crowd_file");
        //       obj.outerHTML = obj.outerHTML;
        //     });
        // });
      });
      //以下是微信传图片方式
      // alert("相机");
      // var _this = this;
      // wx.chooseImage({
      //   count: 1, // 默认9
      //   sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      //   sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      //   success: function(res) {
      //     var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      //     // alert("chooseImage成功" + localIds[0]);

      //     _this.getLocalData(localIds[0]);
      //   }
      // });
    },
    /*
    getLocalData: function(localid) {
      var _this = this;
      //获取本地图片资源
      wx.getLocalImgData({
        localId: localid, // 图片的localID
        success: function(res) {
          // alert("获取本地图片资源成功");
          var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
          const params = new FormData(); // 创建一个formdata对象
          // params.append("file", this.params.avatar); //本地
          // params.append("file", localData);
          params.append("file", _this.base64toFile(localData));

          //开始上传
          _this.axios
            .post("/wechat/imageAnalys/white/carnumUpload", params)
            .then(res => {
              if (res.code == 0) {
                _this.params.licensePlateNumber = res.data;
              } else {
                Toast(res.msg);
                // alert(res.msg);
                console.log(res.code);
              }
            });
        }
      });
    },
    */

    // 车牌的点击上传图片事件 事件委托在 callCamera 事件上
    carnumUpload() {
      const params = new FormData(); // 创建一个formdata对象
      params.append("file", $("#crowd_file")[0].files[0]);
      params.append("phone", this.params.phone);

      var _this = this;
      Indicator.open({
        text: "图片识别中，请稍等...",
        //文字
        spinnerType: "fading-circle"
        //样式
      });
      //开始上传
      this.axios
        .post("/qlb/imageAnalys/white/carnumUpload", params)
        .then(res => {
          if (res.code == 0) {
            _this.params.licensePlateNumber = res.data;
            _this.licensePlateNumberBlur();
          } else {
            Toast(res.msg);
            // alert(res.msg);
            console.log(res.code);
          }
          Indicator.close();
          var obj = document.getElementById("crowd_file");
          obj.outerHTML = obj.outerHTML;
        });
    },
    // 点击获取验证码
    getCodeFun() {
      console.log("获取验证码");
      if (this.params.phone == "") {
        this.params.phone = "";
        Toast("请输入手机号");
        return;
      }

      if (this.params.phone.length != 11) {
        this.params.phone = "";
        Toast("请输入正确手机号");

        return;
      }

      //this.sending原为true,请求成功，!this.sending == true，主要是防止有人把disabled属性去掉，多次点击；
      if (!this.sending) return;

      //发送验证码
      var params = {
        phone: this.params.phone
      };
      Indicator.open({
        text: "加载中...",
        //文字
        spinnerType: "fading-circle"
        //样式
      });
      var _this = this;
      this.axios.post("/qlb/insurance/white/register", params).then(res => {
        if (res.code == 0) {
          // alert("成功" + res.data);
          Toast("发送验证码成功");
          // console.log("成功");
          _this.sending = false;
          _this.disabled = true;
          _this.timeDown();
        } else {
          // alert(res.msg);
          Toast(res.msg);
          console.log(res.code);
        }
        Indicator.close();
      });
    },
    // 发送验证码倒计时事件
    timeDown() {
      let result = setInterval(() => {
        --this.second;
        if (this.second < 0) {
          clearInterval(result);
          this.sending = true;
          this.disabled = false;
          this.second = 60;
        }
      }, 1000);
    },
    // 判断用户输入的信息是否为空 是否填写规范
    checkInformation() {
      if (this.params.phone == "") {
        Toast("请输入手机号");
        return false;
      }
      if (this.params.phone.length != 11) {
        this.params.phone = "";
        Toast("请输入正确手机号");
        return false;
      }
      if (this.params.verificationCode == "") {
        Toast("请输入验证码");
        return false;
      }
      if (this.verificationCodeError) {
        Toast("验证码输入错误");
        this.params.verificationCode == "";
        return false;
      }

      if (this.params.licensePlateNumber == "") {
        // Toast("请输入车牌号");  //此处不提示 要不重叠
        return false;
      }
      if (isLicensePlate(this.params.licensePlateNumber) == false) {
        Toast("请输入正确车牌号");
        this.params.licensePlateNumber = "";
        return false;
      }

      //地理位置如果没有，不允许提交
      if (this.params.province == "" || this.params.city == "") {
        Toast("请授权地理位置");
        return false;
      }
      return true;
    },
    // 提交按钮事件
    submit() {
      // document.activeElement.blur(); //键盘触发取消
      // this.editSubmit = true;
      // $("#title").blur(); //键盘触发取消

      if (this.checkInformation() == false) {
        return;
      }

      var params = {
        carNum: this.params.licensePlateNumber,
        phone: this.params.phone,
        city: this.params.city,
        province: this.params.province,
        newIceBarCodes: this.newWinterBarcode,
        oldIceBarCodes: this.oldWinterBarcode,
        newComBarCodes: this.newBarcode,
        oldComBarCodes: this.oldBarcode
      };
      // alert("parm"+JSON.stringify(params));
      Indicator.open({
        text: "加载中...",
        //文字
        spinnerType: "fading-circle"
        //样式
      });
      this.axios.post("/qlb/insurance/white/submitApply", params).then(res => {
        // Toast("res"+res);
        // 路由跳转
        if (res.code == 0) {
          this.$router.push({
            path: "/kirinprotected/kirinprotectedservice"
          });
        } else {
          Toast(res.msg);
          // alert(res.msg);
          console.log(res.code);
        }
        Indicator.close();
      });
    },
    //网络请求 获取配置wx参数
    getWxConfigData() {
      var array = window.location.href.split("#");
      // var token = sessionStorage.getItem("token");
      // alert("token:" + token);
      // console.log("token:" + token);
      var params = {
        url: array[0]
      };

      this.axios
        .post("http://phone.viphk1.ngrok.org/wechat/jssdk/sign", params)
        .then(res => {
          if (res.code == 0) {
            this.wxConfig(
              res.data.appId,
              res.data.timestamp,
              res.data.nonceStr,
              res.data.signature
            );
          } else {
            Toast(res.msg);
          }
          console.log(res);
        });
    },
    onDateChange(picker, values) {
      console.log(picker);
      console.log(values);
    },
    licensePlateNumberFocus() {
      console.log("车牌号触发");
      console.log(this.slots);

      if (this.slots[0].values.length != 0) {
        if (this.licensePlateNumberEidt) {
          return;
        }
        //有列表数据
        this.popupVisible = true; //popup显示
        $("#inputLicensePlateNumber .mint-field-core").blur(); //键盘触发取消
      } else {
        //无列表数据
        this.popupVisible = false; //popup隐藏
      }
    },
    licensePlateNumberBlur() {
      console.log("车牌号离开");

      if (this.params.licensePlateNumber == "") {
        Toast("请输入车牌号");
        return false;
      }
      /*
      
        这里的if判断 取反也可以  !isLicensePlate(this.params.licensePlateNumber)
        isLicensePlate()  正则表达式

      **/

      if (isLicensePlate(this.params.licensePlateNumber) == false) {
        Toast("请输入正确车牌号");
        this.params.licensePlateNumber = "";
        return false;
      }
      this.licensePlateNumberEidt = false;

      var isExistCar = false;

      for (let i = 0; i < this.slots[0].values.length; i++) {
        var item = this.slots[0].values[i];
        if (this.params.licensePlateNumber == item.carNum) {
          isExistCar = true;
          this.getUserInfo(item);

          break;
        }
      }
      if (isExistCar) {
        //存在车牌号  显示列表
        // this.popupVisible = true;
      } else {
        //不存在车牌号  置空
        var tempItem = {
          provinceName: this.province,
          cityName: this.city,
          carNum: this.params.licensePlateNumber,
          iceBarCode: [],
          comBarCode: []
        };

        this.getUserInfo(tempItem);
      }
    },
    // 手动输入车牌号事件
    handleInput() {
      console.log("手动输入车牌号");
      this.licensePlateNumberEidt = true;
      $("#inputLicensePlateNumber .mint-field-core").focus();
      this.popupVisible = false; //popup隐藏  focus.native.capture
    },
    handleConfirm() {
      console.log("选择车牌号");
      this.popupVisible = false;
      // getValues()[0]第一个 获取所有 slot 目前被选中的值（分隔符 slot 除外） mint-ui中定义的方法
      var currentTags = this.$refs.picker.getValues()[0];
      this.getUserInfo(currentTags);
    },
    // 页面加载完会执行此方法 初始化页面  加载用户 检查是否是老用户
    initPageLoadUser() {
      // this.isOldUser = true;
      // this.params.phone = "11111111111";
      // this.params.verificationCode = "1";
      // return;
      var _this = this;
      Indicator.open({
        //文字
        text: "加载中...",
        //样式
        spinnerType: "fading-circle"
      });
      this.axios.post("/qlb/insurance/white/initPageLoadUser", {}).then(res => {
        if (res.code == 0) {
          this.isOldUser = true;
          this.params.phone = res.data[0].phone;
          this.params.verificationCode = "1"; //获取用户数据后 验证码写死 前短用到 后台不传入

          this.slots[0].values = []; //初始化数组
          for (let i = 0; i < res.data.length; i++) {
            // var item = res.data[i];
            this.slots[0].values.push(res.data[i]);
          }
          // 如果是老用户，把老用户信息传递到getUserInfo方法中
          _this.getUserInfo(res.data[0]);
        } else {
          // Toast(res.msg);
        }
        Indicator.close();
      });
    },
    // 如果是老用户  就填写之前的用户信息
    getUserInfo(currentTags) {
      // 车牌号就等于之前输入的车牌号
      this.params.licensePlateNumber = currentTags.carNum;
      if (
        String(currentTags.provinceName).length == 0 ||
        String(currentTags.cityName).length == 0
      ) {
        this.params.city = this.city;
        this.params.province = this.province;
        //显示区域
        this.params.region = this.province + this.city;
      } else {
        this.params.city = currentTags.cityName;
        this.params.province = currentTags.provinceName;
        //显示区域
        this.params.region = currentTags.provinceName + currentTags.cityName;
      }
      //获取条码信息

      this.params.barcode1 = { barCode: "", status: "" };
      if (currentTags.comBarCode[0]) {
        this.params.barcode1 = currentTags.comBarCode[0];
      }

      this.params.barcode2 = { barCode: "", status: "" };
      if (currentTags.comBarCode[1]) {
        this.params.barcode2 = currentTags.comBarCode[1];
      }

      this.params.barcode3 = { barCode: "", status: "" };
      if (currentTags.comBarCode[2]) {
        this.params.barcode3 = currentTags.comBarCode[2];
      }

      this.params.barcode4 = { barCode: "", status: "" };
      if (currentTags.comBarCode[3]) {
        this.params.barcode4 = currentTags.comBarCode[3];
      }

      this.params.barcode5 = { barCode: "", status: "" };
      if (currentTags.comBarCode[4]) {
        this.params.barcode5 = currentTags.comBarCode[4];
      }

      this.params.winterTyresBarcode1 = {
        barCode: "",
        status: ""
      };
      if (currentTags.iceBarCode[0]) {
        this.params.winterTyresBarcode1 = currentTags.iceBarCode[0];
      }

      this.params.winterTyresBarcode2 = {
        barCode: "",
        status: ""
      };
      if (currentTags.iceBarCode[1]) {
        this.params.winterTyresBarcode2 = currentTags.iceBarCode[1];
      }

      this.params.winterTyresBarcode3 = {
        barCode: "",
        status: ""
      };
      if (currentTags.iceBarCode[2]) {
        this.params.winterTyresBarcode3 = currentTags.iceBarCode[2];
      }

      this.params.winterTyresBarcode4 = {
        barCode: "",
        status: ""
      };
      if (currentTags.iceBarCode[3]) {
        this.params.winterTyresBarcode4 = currentTags.iceBarCode[3];
      }

      this.params.winterTyresBarcode5 = {
        barCode: "",
        status: ""
      };
      if (currentTags.iceBarCode[4]) {
        this.params.winterTyresBarcode5 = currentTags.iceBarCode[4];
      }
    }
  },

  mounted() {
    document.title = "领取麒麟保";
    this.initPageLoadUser();
    this.getWxConfigData();
    var clientHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(window).on("resize", function(e) {
      var nowClientHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (clientHeight > nowClientHeight) {
        //键盘弹出的事件处理
        //Toast("弹起");
      } else {
        //键盘收起的事件处理
        //Toast("收起");
        document.activeElement.blur(); //键盘触发取消
      }
    });
  },
  destroyed() {
    Indicator.close();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/scss">
.mint-field-core[readonly] {
  color: #999999;
}

.mint-cell-wrapper {
  font-size: 13px !important;
}
</style>
<style scoped>
* {
  padding: 0;
  margin: 0;
}

/* h1,
  h2 {
    font-weight: normal;
  } */
.mainPage {
  background: #f6f6f6;
  width: 100%;
  height: 100%;
}

.titleDiv {
  padding: 10px;
}

.titleHeaderDiv {
  padding: 10px 10px 0px 10px;
  color: #1b7cff;
  font-size: 15px;
}

.get_verification_code {
  border: 0px;
  background: white;
  color: #1b7cff;
}

.time_countdown {
  border: 0px;
  background: white;
  color: #999999;
}

.title {
  color: #333333;
  /* border: 0px solid #F6F6F6; */
  font-size: 3px !important;
}

.text_title {
  color: #1b7cff;
  font-size: 13px;
}

.text_image {
  width: 20px;
  height: 20px;
}

.submit {
  text-align: center;
  color: white;
  background-color: #1b7cff;
  width: 100%;
  border-radius: 5px;
  font-size: 18px;
  height: 44px;
}

.submit_div {
  text-align: center;
  padding: 30px;
}

.mint-popup {
  width: 100%;
}

.popupSure {
  top: 10px;
  right: 10px;
  position: absolute;
  /* color: #1b7cff;
    background-color: white; */
  border: 0px;
  color: white;
  background-color: #1b7cff;
  height: 35px;
}

.handlePopupSure {
  top: 10px;
  left: 10px;
  position: absolute;

  border: 0px;
  color: white;
  background-color: #1b7cff;
  height: 35px;
}

.mint-field-core {
  background-color: white;
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
