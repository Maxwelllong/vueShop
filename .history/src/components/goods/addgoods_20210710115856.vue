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
                    <el-alert title="添加商品信息" center type="info" show-icon>
                    </el-alert>
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
            <div style="height: 300px;">
                <el-steps direction="vertical" :active="active" left>
                    <el-step title="步骤 1"></el-step>
                    <el-step title="步骤 2"></el-step>
                    <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
                </el-steps>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return{
            active:0,
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