<!--goodlist-->
<template>
    <div>
        <!-- 头部面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    
    <el-card>
        <!-- 搜索框 -->
        <el-row>
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-table :data="goodList" style="width: 100%">
            <el-table-column prop="index"  width="180"></el-table-column>
            <el-table-column prop="date" label="商品名称" width="180"></el-table-column>
        </el-table>
    </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return{
            goodList:{}
        }
    },
    mounted(){

    },
    methods:{},
}
</script>
<style lang='less' scoped>

</style>