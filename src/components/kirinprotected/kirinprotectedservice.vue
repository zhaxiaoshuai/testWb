<template>
  <div class="page-navbar">
    <!-- navbar -->
    <div id="header">
      <mt-navbar class="page-part" v-model="selected">
        <mt-tab-item id="1">我的保单</mt-tab-item>

        <mt-tab-item id="2">我的理赔</mt-tab-item>
      </mt-navbar>

      <div class="headerLine" v-if="selected == 1"></div>
      <div class="claimsHeaderLine" v-else></div>
    </div>

    <!-- <div class="i_can_apply">
      <div class="i_can_apply_title" style="margin-left: 10px;">还可为</div>

      <div class="bulge_claims">3</div>
      <div class="i_can_apply_title">条普通胎和</div>
      <div class="bulge_claims">5</div>
      <div class="i_can_apply_title">条冬季申请麒麟保服务 |</div>
      <div class="i_can_apply_click" @click="iCanApply">我要申请</div>
    </div>-->
    <div id="body">
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="no_more_data" v-if="insuranceDetailArray.length == 0">
            <img src="../../assets/images/no_more_data.png" style="width:223px;height:204px" />
          </div>
          <div
            class="tab_container_item"
            v-for="item in insuranceDetailArray"
            :key="item.carNum"
            :value="item.carNum"
            style="position: relative"
          >
            <div class="tab_container_item_div">申请条码：{{item.toeMouthCode}}</div>
            <div class="tab_container_item_div">车牌号码：{{item.carNum}}</div>
            <div class="tab_container_item_div">申请日期：{{item.createTimeStr}}</div>
            <div class="tab_container_item_div">保障期限：{{item.createTimeStr}} ~ {{item.lapseTimeStr}}</div>
            <div class="item_line"></div>
            <div v-if="item.status == 1" class="bulge_claims" @click="bulgeClaims(item)">鼓包理赔</div>
            <div v-else class="bulge_claims_gray">鼓包理赔</div>

            <img
              v-if="item.status == 1"
              class="state_image"
              src="../../assets/images/safeguard.png"
            />
            <img
              v-if="item.status == 2"
              class="state_image"
              src="../../assets/images/lost_efficacy.png"
            />
            <img
              v-if="item.status == 3"
              class="state_image"
              src="../../assets/images/compensate_principle.png"
            />
            <img v-if="item.status == 4" class="state_image" src="../../assets/images/expired.png" />
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="no_more_data" v-if="claimDetailArray.length == 0">
            <img src="../../assets/images/no_more_data.png" style="width:223px;height:204px" />
          </div>
          <div
            class="tab_container_item"
            v-for="item in claimDetailArray"
            :key="item.toeMouthCode"
            :value="item.toeMouthCode"
            style="position: relative"
          >
            <!-- type 0:鼓包理赔  目前只有1种类型 -->
            <div class="tab_container_item_div">理赔类型：鼓包理赔</div>
            <div class="tab_container_item_div">申请条码：{{item.toeMouthCode}}</div>
            <div class="tab_container_item_div">车牌号码：{{item.carNum}}</div>
            <div class="tab_container_item_div">保障期限：{{item.createTimeStr}} ~ {{item.lapseTimeStr}}</div>
            <div class="item_line"></div>
            <div
              class="tab_container_item_div"
              v-if="item.claimStatus != 3"
            >审批结果：{{item.approvalResult}}</div>
            <div
              class="tab_container_item_div"
              v-if="item.claimStatus != 3"
            >审批意见：{{item.approvalMsg}}</div>

            <div v-if="item.claimStatus == 3">
              <div class="tab_container_item_div">一审时间：{{item.firApprovalTimeStr}}</div>
              <div class="tab_container_item_div">审批结果：{{item.firApprovalResult}}</div>
              <div class="tab_container_item_opinion_div">审批意见：{{item.firApprovalMsg}}</div>
              <div class="item_line"></div>
            </div>

            <div v-if="item.approvalNum == 2 && item.claimStatus == 3">
              <div class="tab_container_item_div">二审时间：{{item.secApprovalTimeStr}}</div>
              <div class="tab_container_item_div">审批结果：{{item.secApprovalResult}}</div>
              <div class="tab_container_item_opinion_div">审批意见：{{item.secApprovalMsg}}</div>·
            </div>

            <div
              class="bulge_claims"
              @click="iCanApply(item)"
              v-if="item.approvalNum == 1 && item.claimStatus == 3"
            >再次申请</div>

            <img
              v-if="item.claimStatus == 1"
              class="claimsImageState"
              src="../../assets/images/claims_audit.png"
            />
            <img
              v-if="item.claimStatus == 2"
              class="claimsImageState"
              src="../../assets/images/claims_pass.png"
            />
            <img
              v-if="item.claimStatus == 3"
              class="claimsImageState"
              src="../../assets/images/claims_not_passpass.png"
            />
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <!-- <div class="apply_for_div">
      <mt-button class="apply_for" type="primary" @click="submit">我要申请</mt-button>
    </div>-->
  </div>
</template>
 
<script>
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";

export default {
  name: "kirinprotectedservice",

  data() {
    return {
      selected: "1",
      imageState: 1,
      insuranceDetailArray: [], //我的保单数组
      claimDetailArray: [] //我的理赔数组
    };
  },
  methods: {
    iCanApply(item) {
      this.$router.push({
        path:
          "/swellsettle/swellsettleclaim?pageInit=1&toeMouthCode=" +
          item.toeMouthCode +
          ""
      });
    },
    bulgeClaims(item) {
      console.log("鼓包理赔");

      this.$router.push({
        path:
          "/swellsettle/swellsettleclaim?toeMouthCode=" +
          item.toeMouthCode +
          "&createTime=" +
          item.createTime +
          "&lapseTime=" +
          item.lapseTime +
          "&phone=" +
          item.phone +
          "&insturanceDocId=" +
          item.insturanceDocId +
          "&carNum=" +
          item.carNum +
          "&pageInit=" +
          item.pageInit 
      });
    },
    insuranceDetail() {
      Indicator.open({
        text: "加载中...",
        //文字
        spinnerType: "fading-circle"
        //样式
      });
      this.axios.post("/qlb/insurance/white/insuranceDetail", {}).then(res => {
        if (res.code == 0) {
          // Toast("查询成功");
          this.insuranceDetailArray = res.data.insuranceDetail;
          this.claimDetailArray = res.data.claimDetail;

          // this.insuranceDetailArray = [];
          // this.claimDetailArray = [];
          var selected = this.$route.query.selected;
          if (selected) {
              this.selected = "2";

          }
        } else {
          Toast(res.msg);
          // alert(res.msg);
        }
        Indicator.close();
      });
    }
  },
  mounted() {
    document.title = "麒麟保服务";
    // var token = sessionStorage.getItem("token");
    // console.log("token:" + token);
    // Toast("token:" + token);
    this.insuranceDetail();
  },
  destroyed() {
    Indicator.close();
  }
};
</script>

<style type="text/scss">
.mint-tab-item.is-selected {
  border-bottom: 0px solid white;
  color: white;
}

.mint-navbar .mint-tab-item {
  color: white;
}

.mint-tab-item.is-selected .mint-tab-item-label {
  color: #1b7cff;
  font-size: 12pt;
}
.mint-tab-item .mint-tab-item-label {
  color: #333333;
  font-size: 12pt;
}
</style>

<style scoped>
/* *{margin: 0;padding:0;} */

.headerLine {
  height: 2px;
  width: 70px;
  background-color: #1b7cff;
  left: 16%;
  position: absolute;
  margin-bottom: -2px;
}
.claimsHeaderLine {
  height: 2px;
  width: 70px;
  background-color: #1b7cff;
  left: 66%;
  position: absolute;
  margin-bottom: -2px;
}
.page-navbar {
  background-color: #f6f6f6;
}
.tab_container_item {
  padding: 10px 10px 10px 10px;
  background-color: white;
  border-radius: 10px;
  margin: 10px;
}
.tab_container_item_div {
  height: 35px;
  font-size: 14px;
  color: #333333;
}
.tab_container_item_opinion_div {
  font-size: 14px;
  color: #333333;
}
.tab_container_item_cell {
  border: 0px;
}
.i_can_apply {
  margin: 10px 10px 0px 10px;
  background-color: white;
  border-radius: 25px;
  display: flex;
  font-size: 14px;
}
.i_can_apply_title {
  padding: 10px 0px;
  border-radius: 25px;
  display: flex;
  font-size: 14px;
  color: #333333;
}
.i_can_apply_click {
  height: 25px;
  text-align: center;
  color: #1b7cff;
  margin-top: 10px;
  margin-left: 5px;

  font-size: 14px;
}
.item_line {
  height: 1px;
  background-color: #f6f6f6;
  margin-bottom: 10px;
}
.bulge_claims {
  height: 25px;
  text-align: center;
  color: #1b7cff;
  margin-top: 10px;
  font-size: 14px;
}
.bulge_claims_gray {
  height: 25px;
  text-align: center;
  color: #999999;
  margin-top: 10px;
  font-size: 14px;
}
.state_image {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0px;
  right: 0px;
}
.claimsImageState {
  width: 98px;
  height: 88px;
  position: absolute;
  bottom: 0px;
  right: 0px;
}
.apply_for_div {
  width: 90%;
  text-align: center;
  position: absolute;
  bottom: 10px;
  left: 5%;
}
.apply_for {
  text-align: center;
  color: white;
  background-color: #1b7cff;
  width: 100%;
  border-radius: 5px;
  font-size: 15px;
  height: 44px;
}
.no_more_data {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
}

.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 0px solid white;
  /* color: white;
    margin-bottom: -2px; */
}

/* .mint-navbar .mint-tab-item.is-selected {
  border-bottom: 3px solid red;
  color: red;
}
.mint-tabbar > #mint-tab-item.is-selected {
  color: yellow;
}
.mint-navbar .mint-navbar .is-selected {
  border-bottom: none;
  color: #ffffff;
  margin-bottom: -0.04rem;
} */

/* #body {
  padding: 10px;
  padding-bottom: 60px;
 
} */

/* #footer {
   position:absolute;
   bottom:0;
   width:100%;
   height:60px;   
   background:#6cf;
} */
</style>
