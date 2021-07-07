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
                    <el-button type="primary" @click="addRoles">添加角色</el-button>
                </el-col>
            </el-row>
            <!-- 表格区域 -->
            <el-table :data="userInfo" stripe style="width: 100%" border>
                <el-table-column type='expand'>
                    <template slot-scope="scope">
                        <el-row v-for="(item,index) in scope.row.children" :key="item.id" class='bdStyle toCenter'  >
                            <el-col :span="5" >
                                <el-tag type='success' closable>{{item.authName}}</el-tag>  
                                <el-icon class='el-icon-caret-right'></el-icon>
                            </el-col>
                            <el-col :span="19" >
                                <el-row v-for="(tags,indexs) in item.children" :key="tags.id" :class="indexs==0 ? '':'bdStyle'" class='toCenter'>
                                    <el-col :span="6">
                                        <el-tag type='primary' closable>{{tags.authName}}</el-tag>
                                        <el-icon class='el-icon-caret-right'></el-icon>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-tag closable style='margin:10px' effect="dark" v-for="(tag,idx) in tags.children" @close="closeTagbar(idx)"
                                        :key="tag.id" type="warning">{{tag.authName}}</el-tag>
                                    </el-col>
                                    
                                </el-row>
                                
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
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
            <!-- 添加角色 -->
            <el-dialog title="提示" :visible.sync="showDialogVisible" width="50%" >
                <el-form :model="addRolesForm" :rules="addRolesFormRules" ref="addRolesFormRef" label-width="100px">
                    <el-form-item label="角色名称" prop="roleName" >
                        <el-input v-model="addRolesForm.roleName"  ></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input v-model="addRolesForm.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="showDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateRoles">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>
<script>  
export default {
    data() {
        return{
            userInfo:[],
            // 添加角色
            showDialogVisible:false,
            addRolesForm:{},
            addRolesFormRules:{
            "roleName": [
                { required: true, message: '请输入角色名称', trigger: 'blur' },
                { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ],
            "roleDesc":[
                { required: true, message: '请输入角色描述', trigger: 'blur' },
                { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
            ]
            }
        }
    },
    mounted(){
        this.getUserInfo();
    },
    methods:{
        async getUserInfo(){
            const {data:res} = await this.$http.get(`roles`)
            this.userInfo = res.data ;
        },
        // 添加角色按钮
        async addRoles(){
            this.showDialogVisible = true;
        },
        // 提交角色信息
        updateRoles(){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
        },
        },
        // 关闭标签触发事件
        closeTagbar(){}
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
.btm{
    botder-bottom:1px solid #eee;
}
.toCenter{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>