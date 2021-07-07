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
            <el-table :data="Rightlist" border stripe>
                <el-table-column type='index' width="40"></el-table-column>
                <el-table-column prop="authName" label="权限名称" ></el-table-column>
                <el-table-column prop="path" label="路径" ></el-table-column>
                <el-table-column prop="level" label="等级" >
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.level == 0">等级一</el-tag>
                        <el-tag type="success" v-else-if="scope.row.level == 1">等级二</el-tag>
                        <el-tag type="info" v-else>等级三</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return{
            Rightlist:[]
        }
    },
    mounted(){
        this.getRightList()
    },
    methods:{
        async getRightList(){
            const {data:res} = await this.$http.get(`rights/list`)
            if(res.meta.status !== 200) return this.$message.error('请求数据失败！')
            this.Rightlist = res.data
        },
        handleSizeChange(newpage){
            // this.
        },
        handleCurrentChange(){}
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
.el-tag{
    margin-left: 10px;
}
</style>