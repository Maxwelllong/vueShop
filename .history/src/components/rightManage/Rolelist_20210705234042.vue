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
            <!-- 表格区域 -->
            <el-table :data="userInfo" stripe style="width: 100%">
                <el-table-column type='expand'></el-table-column>
                <el-table-column type='index'></el-table-column>
                <el-table-column prop="roleName" label="角色名称" ></el-table-column>
                <el-table-column prop="roleDesc" label="角色描述" ></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                        <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
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
            userInfo:[]
        }
    },
    mounted(){
        this.getUserInfo();
    },
    methods:{
        async getUserInfo(){
            const {data:res} = await this.$http.get(`roles`)
            this.userInfo = res.data
        }
    }
}
</script>
<style lang='less' scoped>
.el-card{
    margin-top:20px;
    box-shadow: none;  
    border:none;
}

</style>