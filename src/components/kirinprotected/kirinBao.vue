<template>
  <div class="what">
    <div class="logo">
      <img src="../../assets/images/qilin.png" alt />
    </div>
    <div class="title" ref="titleWith">
      <div>1、什么是麒麟保？</div>
<!--      <span></span>-->
    </div>
    <div class="content">
      <p>麒麟保是青岛森麒麟轮胎股份有限公司为回馈广大车友的信任与青睐，推出的一项增值服务；凡是从正规门店购买的森麒麟、路航、德林特3大品牌的轮胎，均可免费领取麒麟保。</p>
    </div>
    <div class="title">
      <div>2、麒麟保的作用</div>
<!--      <span></span>-->
    </div>
    <div class="content">
      <font>赔偿范围：</font>
      <p>1、保障期内（自申请之日起365天内）不论何种原因发生鼓包现象，均可获得100%的轮胎赔付。（门店工时费、轮胎安装费、动平衡及四轮定位费、快递费等费用不在理赔范围内，需消费者自行承担）。</p>
      <p>2、因鼓包引起的爆胎救援服务产生的直接费用，最高补贴1000元。（问题轮胎需要送至森麒麟指定门店确认，无论何种原因引起的爆胎，轮胎本身均不在本理赔范围内，可走产品三包质量鉴定理赔流程）。</p>
      <p>3、因鼓包引起的爆胎致驾驶员人身意外，最高赔付15万元。（需第三方鉴定机构、保险公司、森麒麟共同鉴定）。</p>
    </div>

    <div class="title">
      <div>3、怎么领取</div>
<!--      <span></span>-->
    </div>
    <div class="content">
      <p>1、微信关注森麒麟、路航、德林特、麒麟云公众号，点击底部“麒麟保“申请。</p>
    </div>

    <div class="title">
      <div>4、如何申请理赔</div>
<!--      <span></span>-->
    </div>
    <div class="content">
      <p>进入微信麒麟云公众号，点击“麒麟保”——“麒麟保申请”，找到要理赔的轮胎，选择相应的理赔项。麒麟保理赔申请预计在1~2个工作日内审核完成。</p>
    </div>

    <div class="title">
      <div>5、非理赔范围</div>
<!--      <span></span>-->
    </div>
    <div class="content">
      <p>1、权利人的故意或欺诈行为，我方将保持追究其法律责任的权利。</p>
      <p>2、出险时轮胎已超过保障有效期的。</p>
      <p>3、地震、雷击、火灾、爆炸、暴雨、洪水、台风等自然灾害。</p>
      <p>4、因自然磨损、腐蚀、人为损害（包括但不限于人为刺扎、故意撞击等）非意外原因导致的轮胎损坏。</p>
      <p>5、受损轮胎与申请时所填写的车牌号码、轮胎条形码、识别码不匹配的。</p>
      <p>6、受损轮胎非门店购买，被盗、被遗弃或其他任何原因导致无法让初始购买门店回收的。</p>
      <p>7、轮胎的条形码、识别码、品牌型号等被破坏、移除、磨损或其他原因无法进行识别的。</p>
      <p>8、受损轮胎非森麒麟签约门店购买。</p>
      <p>9、发生在中华人民共和国境外（包括香港、澳门及台湾地区）的损失。</p>
    </div>

    <div class="content-bottom">
      <font>本活动最终解释权归青岛森麒麟轮胎股份有限公司所有</font>
    </div>
  </div>
</template>

<script>
    export default {

        mounted() {
            document.title = "什么是麒麟保";
        }
    };
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.what {
  border-top: 10px solid #e2e2e2;
  padding-top: 10px;
}
.what .logo {
  /* border: 1px dashed #888888; */
  margin: auto;
  width: 100px;
  margin-bottom: 25px;
}
.what .logo img {
  width: 100%;
  margin-bottom: -3px;
}
.what .title {
  position: relative;
  height: 20px;
  padding: 0 20px;
}
.what .title div {
  font-size: 16px;
  color: #374357;
  font-weight: 600;
  position: absolute;
  z-index: 2;
}
.what .title span {
  /* border: 1px dashed #888888; */
  height: 10px;
  width: 33%;
  display: block;
  position: absolute;
  top: 15px;
  z-index: 1;
  background: #9bc4ff;
  background: -moz-linear-gradient(left, #dfebff, #9bc4ff);
  background: -webkit-linear-gradient(left, #dfebff, #9bc4ff);
  background: -o-linear-gradient(left, #dfebff, #9bc4ff);
  background: -ms-linear-gradient(left, #dfebff, #9bc4ff);
  background: linear-gradient(to right, #dfebff, #9bc4ff);
}
.what .content {
  padding: 20px;
  margin-bottom: 5px;
}
.what .content p {
  font-size: 14px;
  color: #535f73;
  text-indent: 2em;
}
.what .content font {
  font-size: 14px;
  color: #535f73;
}
.content-bottom {
  font-size: 11px;
  color: #333333;
  padding-left: 20px;
  margin-bottom: 5px;
}
</style>
