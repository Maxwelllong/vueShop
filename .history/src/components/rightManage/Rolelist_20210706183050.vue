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
                <!-- expand区域 -->
                <el-table-column type='expand'>
                    <template slot-scope="scope">
                        <el-row v-for="(item,index) in scope.row.children" :key="item.id" class='bdStyle toCenter'  >
                            <el-col :span="5" >
                                <el-tag type='success' closable @close="closeTagbar(scope.row,item.id)">{{item.authName}}</el-tag>  
                                <el-icon class='el-icon-caret-right'></el-icon>
                            </el-col>
                            <el-col :span="19" >
                                <el-row v-for="(tags,indexs) in item.children" :key="tags.id" :class="indexs==0 ? '':'bdStyle'" class='toCenter'>
                                    <el-col :span="6">
                                        <el-tag type='primary' closable @close="closeTagbar(scope.row,tags.id)" >{{tags.authName}}</el-tag>
                                        <el-icon class='el-icon-caret-right'></el-icon>
                                    </el-col>
                                    <el-col :span="11">
                                        <el-tag closable style='margin:10px' effect="dark" v-for="(tag,idx) in tags.children" @close="closeTagbar(scope.row,tag.id)"
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
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="editRolesInfo(scope.row.id)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRoleInfo(scope.row.id)">删除</el-button>
                        <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 添加角色 -->
            <el-dialog title="提示" :visible.sync="showDialogVisible" width="50%" @close="closeAddForm" >
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
            <!-- 修改角色信息 -->
            <el-dialog title="提示" :visible.sync="editRoleDialog" width="50%" @click="closeEditForm" >
                <el-form :model="editRolesForm" :rules="addRolesFormRules" ref="editRolesFormRef" label-width="100px" >
                    <el-form-item label="角色名称" prop="roleName">
                        <el-input v-model="editRolesForm.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input v-model="editRolesForm.roleDesc"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="editRoleDialog = false">取 消</el-button>
                    <el-button type="primary" @click="updataEditForm">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 添加权限 -->
            <el-dialog title="添加"  :visible.sync="setRightDialog" width="50%">
               <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                :props="defaultProps">
                </el-tree>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
            editRoleDialog:false,
            setRightDialog:false,
            addRolesForm:{},
            editRolesForm:{},
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
        closeAddForm(){
            this.$refs.addRolesFormRef.resetFields()
            this.getUserInfo()
        },
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
            this.$refs.addRolesFormRef.validate(async (valid) => {
                    if (valid) {
                        const {data:res} =await this.$http.post(`roles`,this.addRolesForm)
                        // console.log(res);
                        this.showDialogVisible = false;
                        this.getUserInfo()
                    } else {
                        console.log('表单内容有误，请重新填写！');
                        return false;
                    }
                });
            },
        // 修改用户信息
        async editRolesInfo(id){
            this.editRoleDialog=true;
            const {data:res} = await this.$http.get(`roles/${id}`)
            if(res.meta.status !==200) return this.$message.warning('获取用户信息失败')
               this.editRolesForm = res.data
            // console.log(this.editRolesForm);
        },
        // 修改角色信息关闭表单
        closeEditForm(){
            this.$refs.editRolesFormRef.resetFields();
        },
        // 提交修改角色表单
        updataEditForm(){
        this.$refs.editRolesFormRef.validate(async(valid) => {
          if (valid) {
            const { data: res } = await this.$http.put(`roles/${this.editRolesForm.roleId}`, {
                 "roleName" : this.editRolesForm.roleName ,
                 "roleDesc" : this.editRolesForm.roleDesc
            })
            if(res.meta.status !== 200 ) return this.$message.warning('修改用户失败')
            this.editRoleDialog = false;
            this.getUserInfo()
          } else {
            this.$message.message.warning('请重新确认表格填写是否正确！！')
            return false;
          }
        });
        },
        // 删除用户角色信息
        async deleteRoleInfo(id){
            this.$confirm('此操作将永久删除角色, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(error => error);
            const { data: res } = await this.$http.delete(`roles/${id}`)
            if(res.meta.status !== 200 )return this.$message.warning('删除失败')
            this.getUserInfo()
        },
        async closeTagbar(role,rightId){
            // console.log(roleId);
            // console.log(rightId);
            const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
            if(res.meta.status !==200) return this.$message.warning('删除权限失败')
            // console.log(res.data);
            // this.getUserInfo()
            // this.getUserInfo()
            role.children = res.data
        }
        
    },
        
        
        
        
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