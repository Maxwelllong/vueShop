<!--loginPage-->
<template>
    <div class='login_con'>
      <div class="login_box">
          <!-- 头像区域 -->
          <div class="avater">
              <img src="../assets/logo.png" alt="">
          </div>
          <!-- 表单区域 -->
            <el-form  class='form'>
                <el-form  label-width="80px">
                    <el-form-item label="活动名称">
                        <el-input ></el-input>
                    </el-form-item>
                     <el-form-item class="btns">
                    <el-button type="primary">登录</el-button>
                    <el-button type="primary">重置</el-button>
                </el-form-item>
                </el-form>
                
               
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
.form{
    position: absolute;
    bottom:0;
    width: 100%;
    padding:10px;
    box-sizing: border-box;
    
}
.btns{
    display: flex;
    justify-content:flex-end;
}


</style>