<!--homepage-->
<template>
   <el-container class='con'>
    <el-header>
        <div>
            <img src="../assets/logo.png" alt="">
        </div>
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
}
.el-header{
    background: gray;
}
.el-aside{
    height:100%;
    background-color: #333744;
}
el-main{
    background-color: #eee;
}
</style>