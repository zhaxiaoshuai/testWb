<template>
  <div class="compensate">
    <head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
      />
    </head>

    <div class="code">条码号：{{ form.toeMouthCode }}</div>
    <div class="code">手机号：{{ form.phone }}</div>
    <div class="content">
      <div class="tips">以下为轮胎理赔收货信息，请确认填写！如果理赔成功，工厂将快递直寄消费者；消费者承担快递费用</div>
      <div class="list">
        <div class="starColor">*</div>
        <span>收货人</span>
        <input v-if="pageInit == 0" type="text" placeholder="请输入收货人" v-model="form.recUser"/>
        <input
          v-if="pageInit == 1"
          type="text"
          placeholder="请输入收货人"
          v-model="form.recUser"
          readonly="readonly"
        />
      </div>
      <div class="list">
        <div class="starColor">*</div>
        <span>联系方式</span>
        <input v-if="pageInit == 0" type="text" placeholder="请输入联系方式" v-model="form.recPhone"/>

        <input
          v-if="pageInit == 1"
          type="text"
          placeholder="请输入联系方式"
          v-model="form.recPhone"
          readonly="readonly"
        />
      </div>
      <div class="list">
        <div class="starColor">*</div>
        <span>收货地址</span>
        <input type="text" v-if="pageInit == 0" placeholder="请输入收货地址" v-model="form.recAddress"/>
        <input
          type="text"
          v-if="pageInit == 1"
          placeholder="请输入收货地址"
          v-model="form.recAddress"
          readonly="readonly"
        />
      </div>
      <input type="file" id="crowd_file1" hidden="true" class="crowd_file1" accept="image/*"/>
      <input type="file" id="crowd_file2" hidden="true" class="crowd_file2" accept="image/*"/>
      <input type="file" id="crowd_file3" hidden="true" class="crowd_file3" accept="image/*"/>
      <input type="file" id="crowd_file4" hidden="true" class="crowd_file4" accept="image/*"/>
      <div class="example">
        <div class="tips2">请认真查看示例，按要求提交照片</div>
        <div class="showDetail" @click="showExample">查看示例</div>
        <!--        <a href="#">查看示例</a>-->
      </div>
      <div class="photo">
        <div class="img_l">
          <img :src="form.imageUrl1" alt class="tu" @click="img1Cli"/>
          <div v-if="pageInit == 1 && form.image1Status == '1'" class="again" @click="img1Cli">
            <img src="../../assets/images/upload_again.png" alt/>
            重新上传
          </div>
        </div>
        <div class="img_l">
          <img :src="form.imageUrl2" alt class="tu" @click="img2Cli"/>
          <div v-if="pageInit == 1 && form.image2Status == '1'" class="again" @click="img2Cli">
            <img src="../../assets/images/upload_again.png" alt/>
            重新上传
          </div>
        </div>
        <div class="img_l">
          <img :src="form.imageUrl3" alt class="tu" @click="img3Cli"/>
          <div v-if="pageInit == 1 && form.image3Status == '1'" class="again" @click="img3Cli">
            <img src="../../assets/images/upload_again.png" alt/>
            重新上传
          </div>
        </div>
        <div class="img_l">
          <img :src="form.imageUrl4" alt class="tu" @click="img4Cli"/>
          <div v-if="pageInit == 1 && form.image4Status == '1'" class="again" @click="img4Cli">
            <img src="../../assets/images/upload_again.png" alt/>
            重新上传
          </div>
        </div>
      </div>
      <button @click="submit">提交申请</button>
    </div>
  </div>
</template>
<script>
    import {Toast} from "mint-ui";
    import $ from "jquery";
    import {Indicator} from "mint-ui";
    import axios from "axios";

    export default {
        //鼓包理赔页面
        name: "swellsettleclaim",

        data() {
            return {
                form: {
                    insturanceDocId: "",
                    carNum: "",
                    toeMouthCode: "",
                    phone: "",
                    recUser: "",
                    recPhone: "",
                    recAddress: "",
                    createTime: "",
                    lapseTime: "",
                    imageUrl1: require("../../assets/images/entirety@2x.png"),
                    imageUrl2: require("../../assets/images/swell@2x.png"),
                    imageUrl3: require("../../assets/images/dot@2x.png"),
                    imageUrl4: require("../../assets/images/bar_code@2x.png"),
                    image1Status: "0",
                    image2Status: "0",
                    image3Status: "0",
                    image4Status: "0"
                },
                pageInit: 0, //是否是回显页标识
                callback:false,
            };
        },
        methods: {


            destroyed() {
                Indicator.close();
            },
            startLoad() {
                Indicator.open({
                    text: "加载中...",
                    //文字
                    spinnerType: "fading-circle"
                    //样式
                });
            },
            endLoad() {
                Indicator.close();
            },

            showExample() {
                //跳转到查看示例页面
                this.GLOBAL.clearCache=false;
                sessionStorage.setItem('info',JSON.stringify(this.form));
                this.$router.push({path: "/kirinprotected/drumRoll"});
            },

            submit() {
                var then = this;
                if (
                    this.form.recUser == "" ||
                    this.form.recAddress == "" ||
                    this.form.recPhone == ""
                ) {
                    Toast("必填项不能为空！");
                    return false;
                }
                if (
                    this.form.imageUrl1.indexOf("white/image") == -1 ||
                    this.form.imageUrl2.indexOf("white/image") == -1 ||
                    this.form.imageUrl3.indexOf("white/image") == -1 ||
                    this.form.imageUrl4.indexOf("white/image") == -1
                ) {
                    Toast("请选择要上传的图片！");
                    return false;
                }
                if (
                    this.form.image1Status == "1" ||
                    this.form.image2Status == "1" ||
                    this.form.image3Status == "1" ||
                    this.form.image4Status == "1"
                ) {
                    Toast("请将重新上传审核未通过的图片！");
                    return false;
                }
                const reg = /^[1][0-9]{10}$/;
                if (!reg.test(then.form.recPhone)) {
                    Toast("请输入正确的手机号！");
                    return false;
                }
                then.startLoad();
                this.axios.post("/qlb/claim/white/submitClaim", this.form).then(res => {
                    then.endLoad();
                    if (res.code == 0) {
                        //跳转页面
                        then.$router.push({
                            path: "/kirinprotected/kirinprotectedservice?selected='2'"
                        });
                    }else{Toast(res.msg);
                    }
                });
            },

            dataURLtoBlob(dataurl) {//base64格式图片 转为Blob
                var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], { type: mime });
            },

            yasuo(fileObj) {
                var then = this;
                return new Promise((resolve, reject) => {

                    let reader = new FileReader()
                    reader.readAsDataURL(fileObj)
                    reader.onload = function (e) {
                        let image = new Image() //新建一个img标签（还没嵌入DOM节点)
                        image.src = e.target.result
                        //0
                        image.onload = function () {

                            let canvas = document.createElement('canvas'),
                                context = canvas.getContext('2d'),
                               /* imageWidth = image.width / 2,    //压缩后图片的大小
                                imageHeight = image.height / 2,*/
                                scale = image.width / image.height,
                                imageWidth = 500,
                                imageHeight = 500/scale,
                                data = ''

                            canvas.width = imageWidth
                            canvas.height = imageHeight
                            context.drawImage(image, 0, 0, imageWidth, imageHeight)
                            //context.rotate(90 * Math.PI / 180)
                            data = canvas.toDataURL('image/jpeg')
                            var blogData = then.dataURLtoBlob(data);
                            resolve(blogData);
                        }
                    }
                });
            },


            img1Cli() {
                var _this = this;
                if(_this.callback&&_this.form.image1Status!='1'){
                    return;
                }
                $("#crowd_file1").click();
                $("#crowd_file1").on("change", function (e) {
                    var size = e.target.files[0].size;
                    if(size > 10240*512){
                        Toast('图片大小不能超过5MB，请重新上传')
                        return;
                    }
                    _this.yasuo($("#crowd_file1")[0].files[0]).then(obj=>{
                        const params = new FormData(); // 创建一个formdata对象
                        params.append("file", obj);
                        //开始上传
                        _this.startLoad();
                        _this.axios.post("/qlb/claim/white/imageUpload", params).then(res => {
                            _this.endLoad();
                            if (res.code == 0) {
                                _this.form.image1Status = "0";
                                _this.form.imageUrl1 = res.data.path;

                            } else {
                                Toast(res.msg);
                            }
                            var obj = document.getElementById('crowd_file1') ;
                            obj.outerHTML=obj.outerHTML;
                        });
                    })
                });



            },

            img2Cli() {
                var _this = this;
                if(_this.callback&&_this.form.image2Status!='1'){
                    return;
                }
                $("#crowd_file2").click();
                $("#crowd_file2").on("change", function (e) {
                    var size = e.target.files[0].size;
                    if(size > 10240*512){
                        Toast('图片大小不能超过5MB，请重新上传')
                        return;
                    }
                    _this.yasuo($("#crowd_file2")[0].files[0]).then(obj=>{
                        const params = new FormData(); // 创建一个formdata对象
                        params.append("file", obj);
                        //开始上传
                        _this.startLoad();
                        _this.axios.post("/qlb/claim/white/imageUpload", params).then(res => {
                            _this.endLoad();
                            if (res.code == 0) {
                                _this.form.image2Status = "0";
                                _this.form.imageUrl2 = res.data.path;

                            } else {
                                Toast(res.msg);
                            }
                            var obj = document.getElementById('crowd_file2') ;
                            obj.outerHTML=obj.outerHTML;
                        });
                    })
                });

            },
            img3Cli() {

                var _this = this;
                if(_this.callback&&_this.form.image3Status!='1'){
                    return;
                }
                $("#crowd_file3").click();
                $("#crowd_file3").on("change", function (e) {
                    var size = e.target.files[0].size;
                    if(size > 10240*512){
                        Toast('图片大小不能超过5MB，请重新上传')
                        return;
                    }
                    _this.yasuo($("#crowd_file3")[0].files[0]).then(obj=>{
                        const params = new FormData(); // 创建一个formdata对象
                        params.append("file", obj);
                        //开始上传
                        _this.startLoad();
                        _this.axios.post("/qlb/claim/white/imageUpload", params).then(res => {
                            _this.endLoad();
                            if (res.code == 0) {
                                _this.form.image3Status = "0";
                                _this.form.imageUrl3 = res.data.path;

                            } else {
                                Toast(res.msg);
                            }
                            var obj = document.getElementById('crowd_file3') ;
                            obj.outerHTML=obj.outerHTML;
                        });
                    })
                });

            },
            img4Cli() {

                var _this = this;
                if(_this.callback&&_this.form.image4Status!='1'){
                    return;
                }
                $("#crowd_file4").click();
                $("#crowd_file4").on("change", function (e) {
                    var size = e.target.files[0].size;
                    if(size > 10240*512){
                        Toast('图片大小不能超过5MB，请重新上传')
                        return;
                    }
                    _this.yasuo($("#crowd_file4")[0].files[0]).then(obj=>{
                        const params = new FormData(); // 创建一个formdata对象
                        params.append("file", obj);
                        //开始上传
                        _this.startLoad();
                        _this.axios.post("/qlb/claim/white/imageUpload", params).then(res => {
                            _this.endLoad();
                            if (res.code == 0) {
                                _this.form.image4Status = "0";
                                _this.form.imageUrl4 = res.data.path;
                            } else {
                                Toast(res.msg);
                            }
                            var obj = document.getElementById('crowd_file4') ;
                            obj.outerHTML=obj.outerHTML;
                        });
                    })
                });

            }
        },
        mounted() {
            document.title = "麒麟保鼓包理赔";
            if(this.GLOBAL.clearCache){
                sessionStorage.removeItem('info');
            }
            this.GLOBAL.clearCache=true;
            var then = this;
            var toeMouthCode = this.$route.query.toeMouthCode;
            var createTime = this.$route.query.createTime;
            var lapseTime = this.$route.query.lapseTime;
            var phone = this.$route.query.phone;
            var insturanceDocId = this.$route.query.insturanceDocId;
            var carNum = this.$route.query.carNum;
            var pageInit = this.$route.query.pageInit;

            var info= JSON.parse(sessionStorage.getItem('info'));

            if(info!=null&&info!=''&&info!=undefined){
                Object.assign(then.form, info);
            }

            this.form.phone = phone;
            this.form.toeMouthCode = toeMouthCode;
            this.form.createTime = createTime;
            this.form.lapseTime = lapseTime;
            this.form.insturanceDocId = insturanceDocId;
            this.form.carNum = carNum;
            this.pageInit = pageInit;
            if (this.pageInit == 1) {
                then.startLoad();
                this.axios
                    .post("/qlb/claim/white/getClaimInfoByToeMouthCode", {
                        toeMouthCode: then.form.toeMouthCode
                    })
                    .then(res => {
                        then.endLoad();
                        if (res.code == 0) {
                            then.callback=true;
                            //跳转页面
                            var obj = res.data;
                            then.form.toeMouthCode = obj.toeMouthCode;
                            then.form.phone = obj.phone;
                            then.form.recUser = obj.recUser;
                            then.form.recAddress = obj.recAddress;
                            then.form.recPhone = obj.recPhone;

                            then.form.imageUrl1 = obj.imageUrl1;
                            then.form.image1Status = obj.image1Status;

                            then.form.imageUrl2 = obj.imageUrl2;
                            then.form.image2Status = obj.image2Status;

                            then.form.imageUrl3 = obj.imageUrl3;
                            then.form.image3Status = obj.image3Status;

                            then.form.imageUrl4 = obj.imageUrl4;
                            then.form.image4Status = obj.image4Status;
                        }
                    });
            } else {
                then.pageInit = 0;
            }
        }
    };
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .compensate {
    border-top: 10px solid #f6f6f6;
  }

  .compensate .code {
    color: #1b7cff;
    font-size: 14px;
    border-bottom: 1px solid #f6f6f6;
    font-weight: 600;
    padding: 0 20px;
    line-height: 40px;
  }

  .compensate .content {
    padding: 0 20px;
  }

  .compensate .list {
    border-bottom: 1px solid #f6f6f6;
    line-height: 40px;
    height: 40px;
    display: flex;
    align-items: center;
  }

  .compensate .list span {
    color: #000;
    font-size: 14px;
    width: 60px;
    display: block;
    margin-right: 20px;
  }

  .compensate .list input {
    font-size: 14px;
    color: #989898;
    border: none;
    width: calc(100% - 80px);
    height: 40px;
    line-height: 40px;
    background: none;
    outline: medium;
  }

  .compensate .tips {
    font-size: 12px;
    color: #f00;
    margin: 10px 0;
    line-height: 22px;
  }

  .compensate .example {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
  }

  .compensate .example .tips2 {
    font-size: 12px;
    color: #f00;
  }

  .compensate .example a {
    color: #1b7cff;
    font-size: 12px;
    text-decoration: none;
    font-weight: 600;
  }

  .compensate .photo {
    margin: 30px 15px 0 15px;
    display: flex;
    flex-wrap: wrap;
  }

  .compensate .photo .img_l {
    width: 45%;
    height: 0;
    padding-bottom: 45%;
    overflow: hidden;
    margin-right: 10%;
    margin-bottom: 30px;
    position: relative;
  }

  .compensate .photo .img_l:nth-child(2n) {
    margin-right: 0;
  }

  .compensate .photo .img_l .tu {
    width: 100%;
    padding-bottom: 100%;
  }

  .compensate .photo .img_l .again {
    height: 200%;
    position: absolute;
    width: 100%;
    padding-bottom: 100%;
    left: 0;
    top: 100%;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .compensate .photo .img_l .again img {
    width: 60px;
  }

  .compensate .photo .img_l .again {
    top: 0;
  }

  .compensate button {
    color: #fff;
    font-size: 16px;
    background: #1b7cff;
    border-radius: 5px;
    width: 100%;
    border: none;
    height: 40px;
    line-height: 40px;
  }

  .showDetail {
    color: #1b7cff;
    font-size: 12px;
  }

  .starColor {
    color: #f00;
  }
</style>
