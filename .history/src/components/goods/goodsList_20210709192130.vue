<!--goodlist-->
<template>
    <!-- 头部面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row>
        <el-input v-model="input" placeholder="请输入内容" clearable ></el-input>
    </el-row>
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

</style>