<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
       <!--  <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item> -->
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
        <!--工具条-->
        <!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-input v-model="filters.name" placeholder="姓名" style="min-width: 240px;"></el-input>
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="searchBtn()">查询</el-button>
            </el-form-item>
           
          </el-form>
        </el-col> -->
       

        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <!--  <el-select filterable placeholder="请选择姓名" v-model="contentExcellUsernameValue">
                    <el-option v-for="(user,key) in users" :label="user.username" :value="user.username" ></el-option>
                </el-select>  -->
               <el-select filterable placeholder="请选择姓名" v-model="contentExcellUsernameValue">
                    <el-option v-for="(user,key) in contentExcelList" :label="user.yuangong" :value="user.yuangong" ></el-option>
                </el-select> 

                
            </el-form-item>
            <el-form-item>
                <el-select filterable placeholder="请选择列名" v-model="contentExcellHeaderValue">
                    <el-option v-for="(golumnHeader,key) in golumnHeaderSelectList" :label="golumnHeader.columnHeaderValue" :value="golumnHeader.columnHeaderValue" ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item >
             <el-input type = "text"v-model="contentExcellHeaderInputValue" placeholder="请输入列名值" maxlength="6" style="min-width: 200px;"></el-input>
             
            </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="Update()">更新</el-button>
            </el-form-item>
             <el-form-item >
              <el-button type="primary" @click="exportExcel()">导出</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="centerDialogVisible  = true" v-if="compile" style="background: #D0770B; border: none;">编辑</el-button>
          </el-form-item>
            <el-form-item >
              <el-button type="primary" @click="clearContentExcel()" v-if="clear" style="background: #8B0016; border: none;">清空</el-button>
            </el-form-item>

            <el-dialog title="编辑列表" :visible.sync="centerDialogVisible" :center="true">
                <el-form>
                        <el-form-item label="员工：">
                            <el-input type="text" style="width: 200px;" maxlength="6" placeholder="请输入员工" v-model="addEmployeeName"></el-input>
                        </el-form-item>
                       <el-button type="primary" @click="addEmployee()">添加</el-button>
                    <br>
                       <el-form-item label="列名："> 
                         <el-select style="width: 150px;" filterable placeholder="请选择列名" v-model="contentExcellBodyValue">
                               <el-option v-for="(golumnHeader,key) in golumnHeaderSelectList" :label="golumnHeader.columnHeaderValue" :value="golumnHeader.columnHeaderValue" ></el-option>
                             </el-select> 
                          <el-input type="text" style="width: 150px;" placeholder="请输入列名Key" v-model="columnNameKey"></el-input>
                         <el-input type="text" style="width: 150px;"  placeholder="请输入列名值" v-model="columnNameValue"></el-input>
                       </el-form-item>  
                       <el-button type="primary" @click="addColumnName()">添加</el-button>
                    <br>
                         <el-form-item label="员工：">
                             <el-select style="width: 200px;" filterable placeholder="请选择姓名" v-model="deleteEmployeeName">
                                <el-option v-for="(user,key) in contentExcelList" :label="user.yuangong" :value="user.yuangong" ></el-option>
                             </el-select> 
                        </el-form-item>
                         <el-button type="primary" @click="deleteEmployee()" v-if="clear" style="background: #8B0016; border: none;">删除</el-button>


                         <el-form-item label="列名：">
                            <el-select style="width: 200px;" filterable placeholder="请选择列名" v-model="deleteContentExcellBodyValue">
                               <el-option v-for="(golumnHeader,key) in golumnHeaderSelectList" :label="golumnHeader.columnHeaderValue" :value="golumnHeader.columnHeaderValue" ></el-option>
                             </el-select>
                           <el-button type="primary" @click="deleteColumnName()"  v-if="clear" style="background: #8B0016; border: none; margin-left:10px">删除</el-button>

                        </el-form-item>
                      <br>
                      <el-form-item label="列名："> 
                         <el-select style="width: 150px;" filterable placeholder="请选择列名" v-model="oldColumnNameKey">
                               <el-option v-for="(golumnHeader,key) in golumnHeaderSelectList" :label="golumnHeader.columnHeaderValue" :value="golumnHeader.columnHeaderValue" ></el-option>
                             </el-select> 
                          <el-input v-model="newColumnNameKey" type="text" style="width: 150px;" maxlength="6" placeholder="请输入列名Key"></el-input>
                         <el-input v-model="newColumnNameValue" type="text" style="width: 150px;" maxlength="6" placeholder="请输入列名值"></el-input>
                       </el-form-item>  
                       <el-button type="primary" @click="modifyTheColumnName()" style="background: #D0770B; border: none;">更新</el-button>
                 
                </el-form>
                <div slot="footer" class="dialog-footer">
                </div>
              </el-dialog>

          </el-form>
        </el-col>

      <form name="fm" method="post">
            <!-- <input type="hidden" name="userId" :value="userIdValue"> -->
            <input type="hidden" name="username" :value="usernameValue">
           <!--  <input  type="hidden" name="password" :value="passwordValue">
            <input type="hidden" name="createTime" :value="id"> -->
      </form>
      <el-table :data="contentExcelList" height="500"  border highlight-current-row style="background: #fff; margin-top: 50px; width: 100%;">
         
           <!--  <el-table-column  fixed="left" :label="golumnHeader.columnHeaderValue" align="center" :prop="golumnHeader.columnHeaderKey" v-for="(golumnHeader,index) in golumnHeaderList" v-if="index ==0" width="105">
            </el-table-column> -->
            <el-table-column  fixed="left" prop="yuangong" label="员工" align="center"></el-table-column>
          
            <el-table-column :label="golumnHeader.columnHeaderValue" align="center" :prop="golumnHeader.columnHeaderKey" v-for="golumnHeader in golumnHeaderShowList" >
            </el-table-column>
            <!-- <el-table-column  prop="username" label="姓名" align="center"></el-table-column>
            <el-table-column prop="password" label="密码" align="center"></el-table-column>
            <el-table-column prop="create_time" label="创建时间" align="center"></el-table-column> -->
      
      </el-table>
        <div>
          <el-pagination
              layout="total, prev, pager, next, jumper"
              :total="page.recordsTotal" :page-size="page.pageSize" :current-page="page.currentPage" @current-change="_getContentExcelList" v-show="pagination">
            </el-pagination>
        </div>  
    </el-col>
  </el-row>
</template>

<script>
  import axios from "axios";
  import {getProjectById,getUserList,getContentExcelList,updateUpdateTheColumnValueForContentExcelList,clearContentExcel,addEmployee,deleteEmployee,addColumnName,deleteColumnName,modifyTheColumnName} from '@/api/devAssess';
/*  import WebSocket from '../../api/webSocket';
*/
   var PAGESIZE = 100;
  const params = params;
  

  export default {
    data() {
      return {
        centerDialogVisible: false,
        filters: {
          name: ''
        },
        loading: false,
        user:'',
        users: [],
        userIdValue:'',
        usernameValue:'',
        passwordValue:'',
        createTimeValue:'',
        tableHeight: 448,
        golumnHeaderList: [],
        golumnHeaderSelectList: [],
        golumnHeaderShowList: [],
        contentExcelList: [],
        contentExcellUsernameValue: '',
        contentExcellHeaderValue: '',
        contentExcellHeaderInputValue: 0,
        addEmployeeName: '',
        deleteEmployeeName: '',
        contentExcellBodyValue:'',  //添加列表绑定值
        deleteContentExcellBodyValue:'', //删除列名绑定值
        contentExcellFooterValue: '',
        newColumnNameKey: '',
        newColumnNameValue:'',
        oldColumnNameKey:'',
        page: {
          recordsTotal: 100,
          pageSize: 10,
          currentPage:1
/*          currentPage: parseInt(this.$route.query.currPage)
*/        },
        pagination: false,
        visible2: false,
        clear: false,
        compile: false,
        formLabelWidth: '100px'
      }

    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //性别显示转换
      formatSex: function (row, column) {
        return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
      },
      //获取用户列表
      getUser: function () {
        let para = {
          name: this.filters.name
        };
        this.loading = true;
        NProgress.start();
        reqGetUserList(para).then((res) => {
          this.users = res.data.users;
          this.loading = false;
          NProgress.done();
        });
  
        
      },

    
        //搜索条件及校验
       _validate(p){
        const regParams = this.getParams(p);
        return regParams;
      },

      getParams(p){ 
        const params = {
          username:this.filters.name
        }

        if(p){
          params.currPage = p;
         }else{
          params.currPage = this.page.currentPage;
        }

        params.pageSize = PAGESIZE;
        this.usernameValue = this.filters.name;

        return params;
      },
      
      _getUserList(p){
        const page = p || 1;
        const params = this._validate(page);
        getUserList(params)
        .then(r => {
            this.page.recordsTotal = r.page.recordsTotal;
            this.page.pageSize = r.page.pageSize;
            this.page.currentPage = r.page.currentPage;
            this.pagination = true;
            this.users = r.resultList;
            PAGESIZE = r.page.pageSize;

        }).catch(e =>{
                this.$message({message:e.message,duration:1500});
        })
      },
      _getContentExcelList(p){
        const page = p || 1;
        const params = this._validate(page);
        getContentExcelList(params)
        .then(r => {
            this.page.recordsTotal = r.page.recordsTotal;
            this.page.pageSize = r.page.pageSize;
            this.page.currentPage = r.page.currentPage;
            this.pagination = true;
            this.contentExcelList = r.resultList;
            PAGESIZE = r.page.pageSize;

        }).catch(e =>{
                this.$message({message:e.message,duration:1500});
        })
      },
        //updateValueParams    这个接口updateUpdateTheColumnValueForContentExcelList需要的参数
        _updateValueParams(){
        const regParams = {
          username:this.contentExcellUsernameValue,
          columnHeaderKey:'',
          columnHeaderValue:0,
          columnHeaderName:'',
          operationUsername:''
        }
       
        return regParams;
      },
      _updateUpdateTheColumnValueForContentExcelList(){

        const params = this._updateValueParams();
         for (var i = 0;i < this.golumnHeaderList.length; i++) {
          var golumnHeader =  this.golumnHeaderList[i];         
          if (golumnHeader.columnHeaderValue == this.contentExcellHeaderValue) {
            params.columnHeaderKey = golumnHeader.columnHeaderKey;
            params.columnHeaderName = golumnHeader.columnHeaderValue;
            break;

          };
        };

        params.columnHeaderValue = this.contentExcellHeaderInputValue;

        params.operationUsername = this.user.username;
        updateUpdateTheColumnValueForContentExcelList(params)
        .then(r => {
            console.log(r.columnHeaderKey)
                    
            this._getContentExcelList(1);


        }).catch(e =>{
                this.$message({message:e.message,duration:1500});
        })
      },

        _addEmployee(){
        const regParams = {
          employeeName:this.addEmployeeName
        }
       
        return regParams;
      },

      addEmployee(){
        const oParams = this._addEmployee();
        addEmployee(oParams).then(r => {
            this._getContentExcelList(1);
            this.$message({message:"添加成功",duration:1500});

        }).catch(e =>{
            this.$message({message:e.message,duration:1500});
        })

      },
//删除列
      _deleteColumnName(){
        const regParams = {
          deleteColumnNameKey:''
        }
       
        return regParams;
      },

      deleteColumnName(){
          const aParams = this._deleteColumnName();

          for (var i = 0;i < this.golumnHeaderList.length; i++) {
             var golumnHeader =  this.golumnHeaderList[i];         
              if (golumnHeader.columnHeaderValue == this.deleteContentExcellBodyValue) {
                  aParams.deleteColumnNameKey = golumnHeader.columnHeaderKey;
               break;

             };
          };

          deleteColumnName(aParams).then(r => {
/*             this._getContentExcelList(1);
*/             this.$message({message:"删除成功",duration:1500});

          }).catch(e =>{
             this.$message({message:e.message,duration:1500});
          })
  
      },
      _deleteEmployee(){
        const regParams = {
          employeeName:this.deleteEmployeeName
        }
       
        return regParams;
      },

      deleteEmployee(){
        const oParams = this._deleteEmployee();

        for (var i = 0;i < this.golumnHeaderList.length; i++) {
          var golumnHeader =  this.golumnHeaderList[i];         
          if (golumnHeader.columnHeaderValue == this.contentExcellBodyValue) {
            oParams.columnNameAfterKey = golumnHeader.columnHeaderKey;
            break;

          };
        };

        deleteEmployee(oParams).then(r => {
            this._getContentExcelList(1);
            this.$message({message:"删除成功",duration:1500});

        }).catch(e =>{
            this.$message({message:e.message,duration:1500});
        })

      },
    //addColumnName
      _addColumnName(){
        const regParams = {
          columnNameAfterKey: '',
          columnNameKey:this.columnNameKey,
          columnNameValue: this.columnNameValue,
          columnHeaderListId: this.golumnHeaderList.length

        }
       
        return regParams;
      },

      addColumnName(){

        const oParams = this._addColumnName();
        //汉字转英文
        for (var i = 0;i < this.golumnHeaderList.length; i++) {
          var golumnHeader =  this.golumnHeaderList[i];         
          if (golumnHeader.columnHeaderValue == this.contentExcellBodyValue) {
            oParams.columnNameAfterKey = golumnHeader.columnHeaderKey;
            break;

          };
        };
        
        /*alert(oParams.columnNameAfterKey);
        alert(oParams.columnNameKey);
        alert(oParams.columnNameValue);*/

        addColumnName(oParams).then(r => {
            this._getContentExcelList(1);
            this.$message({message:"添加成功",duration:1500});

        }).catch(e =>{
            this.$message({message:e.message,duration:1500});
        })

      },
      _modifyTheColumnName(){
          const regParams = {
             newColumnNameKey: this.newColumnNameKey,
             newColumnNameValue:this.newColumnNameValue,
             oldColumnNameKey: '',
        }
        return regParams;
      },
      modifyTheColumnName(){

        const oParams = this._modifyTheColumnName();
        //汉字转英文
        for (var i = 0;i < this.golumnHeaderList.length; i++) {
          var golumnHeader =  this.golumnHeaderList[i];         
          if (golumnHeader.columnHeaderValue == this.oldColumnNameKey) {
             oParams.oldColumnNameKey = golumnHeader.columnHeaderKey;
            break;

          };
        };
        
       

        modifyTheColumnName(oParams).then(r => {
            this.$message({message:"更新成功",duration:1500});

        }).catch(e =>{
            this.$message({message:e.message,duration:1500});
        })

      },

      exportExcel(){
          fm.action = 'http://127.0.0.1:8888/project/export/contentExcelListExport';
         
          // fm.action = 'http://39.105.156.101:8888/project/export/contentExcelListExport';
          fm.submit();
      },
      clearContentExcel(){
         //清空表格
          var _this = this;
        this.$confirm('确认清空表格吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          //确定后调用接口  这里直接调用不封装了
               clearContentExcel()
               .then(r => {
                  this.$message({message:"清空完成",duration:1500});
                   this._getContentExcelList(1);
                }).catch(e =>{
                
                 this.$message({message:e.message,duration:1500});
               })

        }).catch(() => {

        });


      },
  
      
      //搜索按钮查询
      searchBtn(){
/*        this._getUserList(1);
*/        
/*           this._getContentExcelList(1);
*/
      },
      Update(){
        if(this.contentExcellHeaderValue == "" ){
            this.$message({message:"请选择列名",duration:1500});
            return;
        }

       if(this.contentExcellHeaderInputValue == 0){
            this.$message({message:"请输入列名值",duration:1500});
            return;
        }


          this._updateUpdateTheColumnValueForContentExcelList();  
      
        
      },

    },
    mounted() {

      var user = sessionStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.user = user;
        if(user.id == 10000 || user.id == 10001){
            this.clear = true;
            this.compile = true;

        }
         this.clear = true;
         this.compile = true;
         this.golumnHeaderList = user.golumnHeaderList;
        
         this.contentExcellUsernameValue = user.username;
         this._getContentExcelList(1);
         this._getUserList(1);
         //选择列名数组
         for (var i = 1; i < this.golumnHeaderList.length-6; i++) {
           var golumnHeader = user.golumnHeaderList[i];
           this.golumnHeaderSelectList.push(golumnHeader);
         }
         //显示表头列名数组
        for (var i = 1; i < this.golumnHeaderList.length; i++) {
           var golumnHeader = user.golumnHeaderList[i];
           this.golumnHeaderShowList.push(golumnHeader);
         }

         
/*        this.sysUserName = user.name || '';
*/      }
   

    }
  }
</script>

<style scoped>
  .el-form-item__content{margin-left: 0 !important;}
</style>
