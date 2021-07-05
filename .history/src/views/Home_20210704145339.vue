<!--homepage-->
<template>
   <el-container class='con'>
    <el-header>
        <div class='logo'>
            <img src="../assets/logo.png" alt="">
            <span>电商管理平台</span>
        </div>
        <el-button type="primary" 浅色 样式(圆角) @click="logout">退出</el-button>
    </el-header>
    <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
    </el-container> 
    </el-container>
</template>
<script>
export default {
    data() {
        return{}
    },
    methods:{
        logout(){
            window.sessionStorage.clear();
            this.$router.push('/login');
            this.$message.error('退出成功')
        }
    }
}
</script>
<style lang='less' scoped>
.con{
    height:100%;
    width: 100%;
}
.el-header{
    background: gray;
    display: flex;
    align-content: space-between;
}
.el-aside{
    height:100%;
    background-color: #333744;
}
el-main{
    background-color: #eee;
}
.logo{
    width: 50px;
    height: 50px;
    background-color: aqua;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>