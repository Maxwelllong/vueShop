<!--商品列表-->
<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框&添加商品按钮 -->
        <el-card class='card'>
            <el-row>
                <el-col :span="8" >
                    <el-input placeholder="请输入内容" v-model="input3" >
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-button type="primary" >添加商品</el-button>

            </el-row>
        </el-card>

    </div>
</template>
<script>
export default {
    data() {
        return{
            searchInput:'',
        }
    },
    methods:{}
}
</script>
<style lang='less' scoped>
.card{
    margin:10px;
}
</style>