<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">

      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>审核管理</el-breadcrumb-item>
        <el-breadcrumb-item>审核分类</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../../assets/qi.png" style="width:300px;margin-top: 5px;"></a>
      </div>
      <h2>
       任务内容：



      </h2>

    </el-col>
  </el-row>

</template>
<script>
  import echarts from 'echarts'

  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
