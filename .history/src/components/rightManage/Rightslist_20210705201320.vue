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
            <el-table :data="Rightlst" border stripe="">
                <el-table-column style='index' width="180"></el-table-column>
                <el-table-column prop="date" label="权限名称" width="180"></el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return{
            Rightlst:[]
        }
    },
    mounted(){
        getRightList()
    },
    methods:{
        getRightList(){
            this.$http.get(`rights/list`, {
              params: {}
            })
        }
    }
}
</script>
<style lang='less' scoped>
.box-card{
    margin-top:20px;
    width: 100%;
    height: 100%;
    box-shadow: none;
}
</style>