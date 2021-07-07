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
            <el-table :data="userInfo" stripe style="width: 100%" border>
                <el-table-column type='expand'>
                    <template slot-scope="scope">
                        <el-row v-for="(item,index) in scope.row.children" :key="item.id" class='bdStyle'>
                            <el-col :span="5" >
                                <el-tag type='success' closable>{{item.authName}}</el-tag>
                                <el-icon class='el-icon-caret-right'></el-icon>
                            </el-col>
                            <el-col :span="19">
                                <el-row :span="8" v-for="(tags,indexs) in item.children" :key="tags.id" class='class='bdStyle''>
                                    <el-tag type='primary' closable>{{tags.authName}}</el-tag>
                                    <el-icon class='el-icon-caret-right'></el-icon>
                                </el-row>
                            </el-col>
                        </el-row>
                        <pre>
                            {{ scope.row }}
                        </pre>
                    </template>
                </el-table-column>
                <el-table-column type='index' label="序号"></el-table-column>
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
.bdStyle{
    border-top:1px solid #eee;
}
</style>