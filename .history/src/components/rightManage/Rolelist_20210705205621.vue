<!--角色列表-->
<template>
    <div>
       <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- card区域 -->
        <el-card>
            <el-row>
                <el-col>
                    <el-button type="primary" >添加角色</el-button>
                </el-col>
            </el-row>
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
.el-card{
    margin-top:20px;
}

</style>