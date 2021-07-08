<!--商品分类-->
<template>
    <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
        <!-- 添加分类按钮 -->
        <el-button type="primary" >添加分类</el-button>
        <!-- 表格区域 -->
        <el-table :data="tableList"
                  style="width: 100%">
          <el-table-column type="设置类型"> 
          </el-table-column>
          <el-table-column prop="渲染绑定的表数据tableDate中的哪个数据"
                           label="显示名字"
                           width="180">
          </el-table-column>
        </el-table>
    </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return{
            tableList:[],
        }
    },
    methods:{}
}
</script>
<style lang='less' scoped>

</style>