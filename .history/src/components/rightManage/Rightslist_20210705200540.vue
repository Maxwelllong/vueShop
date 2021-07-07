<!--rightlist-->
<template>
    <div>
        <!-- 头部面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- card区域 -->
        <el-card class="box-card">
            
        </el-card>
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
.box-card{
    width: 100%;
    height: 100%;
    box-shadow: none;
}
</style>