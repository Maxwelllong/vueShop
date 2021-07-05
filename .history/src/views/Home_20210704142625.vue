<!--homepage-->
<template>
   <el-container>
    <el-header>Header</el-header>
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

</style>