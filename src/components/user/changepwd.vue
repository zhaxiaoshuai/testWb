<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
        <el-breadcrumb-item>设置</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="原密码">
          <el-input v-model="form.oldPwd" type="text" style="width: 240px;" maxlength="6" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="form.newPwd" type="text" style="width: 240px;" maxlength="6" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="form.confirmPwd" type="text" style="width: 240px;" maxlength="6" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script>
import {changePassword} from '@/api/devAssess';
  export default{
    data(){
      return {
        form: {
          oldPwd: '',
          newPwd: '',
          confirmPwd: ''
        }
      }
    },
    methods:{
       

      onSubmit() {
        var user = sessionStorage.getItem('access-user');
         user = JSON.parse(user);

        if (this.form.oldPwd == '') {
          this.$message({message:"请输入原密码",duration:1500});
          return;
        };
        if (this.form.newPwd == '') {
          this.$message({message:"请输入新密码",duration:1500});
          return;
        };
         if (this.form.confirmPwd == '') {
          this.$message({message:"请再输入新密码",duration:1500});
          return;
        };
        if (this.form.oldPwd != user.password) {
            this.$message({message:"原密码输入有误",duration:1500});

          return;
        }

        if (this.form.newPwd != this.form.confirmPwd) {
            
          this.$message({message:"两次密码输入有误",duration:1500});
          return;

        };

  
        var _this = this;

        changePassword(this.getParams(user))
        .then(r => {

            sessionStorage.removeItem('access-user');
            _this.$router.push('/login');
                 
        }).catch(e =>{
                
            this.$message({message:e.message,duration:1500});
        })
        
      },
     
       getParams(user){
        const params = {
          id: user.id,
          password: this.form.confirmPwd
         }

        return params;
      }
    }
  }
</script>
