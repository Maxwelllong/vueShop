<!--addgoods-->
<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <el-row>
                <el-col>
                    <!-- 警告信息 -->
                    <el-alert title="添加商品信息" center type="info" show-icon></el-alert>
                </el-col>
            </el-row>
            <!-- 水平步骤条 -->
            <el-steps :active="active" finish-status="success" >
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="商品完成"></el-step>
            </el-steps>
            <!-- 垂直步骤条 -->
            <el-tabs v-model="active" @tab-click="handleClick" tab-position="left">
                <el-tab-pane label="基本信息" name="first">用户管理</el-tab-pane>
                <el-tab-pane label="商品参数" name="second">配置管理</el-tab-pane>
                <el-tab-pane label="商品属性" name="third">角色管理</el-tab-pane>
                <el-tab-pane label="商品图片" name="fourth">定时任务补偿</el-tab-pane>
                <el-tab-pane label="商品图片" name="fourth">定时商品内容任务补偿</el-tab-pane>
                <el-tab-pane label="商品内容">商品内容</el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return{
            active:1,
            tabPosition:left,
        }
    },
    methods:{}
}
</script>
<style lang='less' scoped>
.el-card {
    margin-top:20px;
}
.el-steps{
    margin-top:20px;
}
</style>