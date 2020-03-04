<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>用户图表</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="12"></el-col>
    <el-col :span="12">
        <el-form :inline="true">
            <el-form-item>
             <el-select filterable placeholder="请选择列名" v-model="contentExcellHeaderValue">
                    <el-option v-for="(golumnHeader,key) in golumnHeaderSelectList"  :label="golumnHeader.columnHeaderValue" :value="golumnHeader.columnHeaderValue" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="_lookUpColumnOfContentExcel()">查看</el-button>
            </el-form-item>
          </el-form>

  </el-col>
    <el-col :span="24" class="warp-main">
      <section class="chart-container">
        <el-row>
 
          <el-col :span="24">
            <div id="chartColumn" style="width:100%; height:400px;"></div>
          </el-col>
         <!--  <el-col :span="12">
            <div id="chartBar" style="width:100%; height:400px;"></div>
          </el-col>
          <el-col :span="12">
            <div id="chartLine" style="width:100%; height:400px;"></div>
          </el-col> -->
          <el-col :span="24">
            <div id="chartPie" style="width:100%; height:400px;"></div>
          </el-col>

          <!-- <el-col :span="24">
            <a href="http://echarts.baidu.com/examples.html" target="_blank" style="float: right;">more>></a>
          </el-col> -->
        </el-row>
      </section>

    </el-col>
  </el-row>
</template>
<style>
  .warp-breadcrum{border-bottom: none;}
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .chart-container {
    width: 100%;
  }
  .chart-container .el-col {
    padding: 30px 20px;
  }
</style>

<script>
  import axios from "axios";
  import {lookUpColumnOfContentExcel} from '@/api/devAssess';

  import echarts from 'echarts'

  export default {
    data() {
      return {
        golumnHeaderList: [],
        golumnHeaderSelectList: [],
        contentExcellHeaderValue: '',
        contentExcellHeaderInputValue: 0,
        currentDate: new Date(),
        chartColumn: null,
        chartBar: null,
        chartLine: null,
        chartPie: null,
        chartColumnXAxisData:[],
        chartColumnYAxisData:[],
        chartColumnOption:{},
        chartPieLegendData:[],
        chartPieseriesData:[],
        chartPieOption:{},
      };
    },
    methods: {
       _updateValueParams(){
        const regParams = {
          columnHeaderKey:'',
        }
       
        return regParams;
       },
        _lookUpColumnOfContentExcel(){
          const params = this._updateValueParams();
            for (var i = 0;i < this.golumnHeaderList.length; i++) {
            var golumnHeader =  this.golumnHeaderList[i];
/*          alert(golumnHeader.columnHeaderValue+'   '+this.contentExcellHeaderValue);
*/          
             if (golumnHeader.columnHeaderValue == this.contentExcellHeaderValue) {
               params.columnHeaderKey = golumnHeader.columnHeaderKey;
              break;

             };
           };

/*        params.columnHeaderValue = this.contentExcellHeaderInputValue;
*/       
          lookUpColumnOfContentExcel(params)
          .then(r => {
              var resultList = r.resultList;
  
              this.chartColumnXAxisData.splice(0,this.chartColumnXAxisData.length);
              this.chartPieLegendData.splice(0,this.chartPieLegendData.length);
              this.chartColumnYAxisData.splice(0,this.chartColumnYAxisData.length);
              this.chartPieseriesData.splice(0,this.chartPieseriesData.length);

              for (var i = 0;i < resultList.length;i++) { 
                  var temp  = resultList[i];
                  this.chartColumnXAxisData.push(temp.yuangong);
                  this.chartPieLegendData.push(temp.yuangong);

                  this.chartColumnYAxisData.push(temp[params.columnHeaderKey]);
                  
                  this.chartPieseriesData.push({ value: temp[params.columnHeaderKey], name: temp.yuangong });

              };
            //柱状图
             this.chartColumn.setOption(this.chartColumnOption);
            //饼状图
             this.chartPie.setOption(this.chartPieOption);


         /*    chartColumnXAxisData

              chartColumnXAxisData*/
           }).catch(e =>{
              this.$message({message:e.message,duration:1500});
          })
      },
    
    },
    mounted () {

      var _this = this;
      //基于准备好的dom，初始化echarts实例
      this.chartColumn = echarts.init(document.getElementById('chartColumn'));
      this.chartPie = echarts.init(document.getElementById('chartPie'));

     this.chartColumnOption = {
        title: { text: '柱状图' },
        tooltip: {},
        xAxis: {
          data: this.chartColumnXAxisData
        },
        yAxis: {},
        dataZoom: [
          {
              show: true,
              realtime: true,
              start: 0,
              end: 50
          },
          {
              type: 'inside',
              realtime: true,
              start: 0,
              end: 50
          }
        ],
        series: [{
          name: '数量',
          type: 'bar',
          data: this.chartColumnYAxisData
        }]
      };


      this.chartPieOption = {
        title: {
          text: '饼状图',
          subtext: '',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.chartPieLegendData
        },
        series: [
          {
            name: '数量',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.chartPieseriesData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      var user = sessionStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        if(user.id == 10000 || user.id == 10001){
            this.clear = true;
            this.compile = true;

        }
         this.golumnHeaderList = user.golumnHeaderList;
        
         this.contentExcellUsernameValue = user.username;
        /* this._getUserList(1);*/
         for (var i = 1; i < this.golumnHeaderList.length; i++) {
           var golumnHeader = user.golumnHeaderList[i];
           if (golumnHeader.columnHeaderKey != 'yuangong1') {
              this.golumnHeaderSelectList.push(golumnHeader);

           };
           console.log(this.golumnHeaderSelectList)
         }
/*        this.sysUserName = user.name || '';
*/      }


    },
  }
</script>
