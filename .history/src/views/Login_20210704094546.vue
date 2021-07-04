<!--loginPage-->
<template>
    <div class='login_con'>
      <div class="login_box">
          <!-- 头像区域 -->
          <div class="avater">
              <img src="../assets/logo.png" alt="">
          </div>
          <!-- 表单区域 -->
            <el-form class='form' :model="Form" :rules="formRules">
                <el-form-item prop="username">
                    <el-input v-model="Form.username" prefix-icon='iconfont icon-user' placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="Form.password" type='password' prefix-icon='iconfont icon-3702mima' placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary">登录</el-button>
                    <el-button type="primary">重置</el-button>
                </el-form-item>
            </el-form>
      </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
            Form:{
                username:"",
                password:""
            },
            formRules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 15, message: '长度在 5 到 15 个字符,数字或_', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{}
}
</script>
<style lang='less' scoped>
.login_con{
    width: 100%;
    height:100%;
    background-color: #2b4b6b;
}
.login_box{
    width: 450px;
    height:300px;
    border-radius: 3px;
    background: #eee;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
}
.avater{
    width: 130px;
    height: 130px;
    background: #fff;
    border-radius: 50%;
    padding:10px;
    overflow: hidden;
    position: absolute;
    left:50%;
    transform: translate(-50%,-50%);
    box-shadow: 0 0 10px #2b4b6b;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color:#fff;
    }
}
.form{
    position: absolute;
    bottom:0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns{
    margin-right: 0%;
    display: flex;
    justify-content:flex-end;
}


</style>