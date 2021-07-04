<!--loginPage-->
<template>
    <div class='login_con'>
      <div class="login_box">
          <!-- 头像区域 -->
          <div class="avater">
              <img src="../assets/logo.png" alt="">
          </div>
          <!-- 表单区域 -->
            <el-form >
                <el-form-item >
                    <el-input placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-input placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
      </div>
    </div>
</template>
<script>
export default {
    data() {
        return{}
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
        border-radius: 10px;
        background-color:#fff;
    }
}

</style>