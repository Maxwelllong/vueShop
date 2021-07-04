<!--homepage-->
<template>
    <div>
      <el-button type="primary" @click="logout">退出</el-button>
    </div>
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