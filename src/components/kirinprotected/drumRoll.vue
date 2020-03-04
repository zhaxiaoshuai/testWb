<template>
  <div class="problem">
    <h1>鼓包位置照片</h1>
    <div class="content">
      <p>轮胎在充气状态下（需要带有轮辋），做好鼓包位置标识，要求：轮胎鼓包位置清晰可见，照片示例如下：</p>
      <img src="../../assets/images/img_one.png" alt />
    </div>

    <h1>胎侧整体照片</h1>
    <div class="content">
      <p>轮胎在充气或者非充气状态下均可，在胎侧鼓包处做好明显标识（与鼓包照片标识需要一致），拍一张整体的清晰照片（规格、花纹、DOT信息必须清楚可见），照片示例如下：</p>
      <img src="../../assets/images/img_two.png" alt />
    </div>

    <h1>带有年周号的DOT照片</h1>
    <div class="content">
      <p>请将轮胎胎侧的DOT号+年周号标识拍摄清晰，照片示例如下：</p>
      <img src="../../assets/images/img_three.png" alt />
    </div>

    <h1>趾口条形码照片</h1>
    <div class="content">
      <p>轮辋卸下后，在轮胎的趾口处找到条码位置拍摄照片（条码码是否磨损不影响最终鉴定结果）人为损坏条形码，不予理赔。照片示例如下：</p>
      <img src="../../assets/images/img_four.png" alt />
    </div>
    <!-- <h1>鼓包位置照片</h1>
    <div class="content">
      <p>这里是段落，我做了首行缩进，一段一个p标签就行。</p>
      <font>首行不用缩进的，用这个标签，如果内容是后台传过来的把这两个标签以及后面的css样式删除就好了。</font>
    </div>-->
  </div>
</template>

<script>
export default {
  mounted() {
    document.title = "鼓包示例";
  }
};
</script>


<style scoped>
* {
  padding: 0;
  margin: 0;
}
.problem {
  border-top: 10px solid #e2e2e2;
  padding-top: 10px;
}
.problem h1 {
  font-size: 15px;
  color: #3d8eff;
  padding-top: 10px;
  padding-left: 15px;
  font-weight: 600;
}
.problem .content {
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  margin-bottom: 5px;
}
.problem .content p {
  font-size: 13px;
  color: #535f73;
}
.problem .content font {
  font-size: 13px;
  color: #535f73;
}
.problem .content img {
  width: 100%;
  margin-bottom: -3px;
  /* border: 1px dashed #888888; */
  margin-top: 10px;
}
</style>