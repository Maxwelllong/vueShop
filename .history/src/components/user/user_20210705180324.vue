<!--userpage-->
<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <div>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-input placeholder="请输入内容" clearable  @clear="getUserlist" v-model='queryList.query' class="input-with-select">
                            <el-button slot="append" @click="getUserlist" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="dialogVisible = true" >添加用户</el-button>
                    </el-col>
                </el-row>
                <!-- 表格区域 -->
                <el-table :data="userList" stripe border>
                    <el-table-column type='index' ></el-table-column>
                    <el-table-column label="用户名" prop="username"></el-table-column>
                    <el-table-column label="邮箱" prop="email"></el-table-column>
                    <el-table-column label="电话" prop="mobile"></el-table-column>
                    <el-table-column label="角色" prop="role_name"></el-table-column>
                    <el-table-column label="状态" >
                        <template slot-scope="scope">
                            <el-switch @change="userchanged(scope.row)"
                            v-model="scope.row.mg_state"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" > 
                        <template slot-scope="scope" >
                            <!-- 修改按钮 -->
                            <el-tooltip  content="修改" placement="top" :enterable='false'>
                                <el-button size='mini' type="warning" icon='el-icon-edit' @click="editDialog(scope.row.id)"></el-button>
                            </el-tooltip>
                            <!-- 删除按钮 -->
                            <el-tooltip  content="删除" placement="top" :enterable='false' >
                                <el-button size='mini' type="danger" icon='el-icon-delete' @click="deleteUser(scope.row.id)"></el-button>
                            </el-tooltip>
                            <!-- 分配角色按钮 -->
                            <el-tooltip  content="分配角色" placement="top" :enterable='false'>
                                <el-button size='mini'  type="primary" icon='el-icon-setting'></el-button>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                 </el-table> 
            </div>
        </el-card>
        <!-- 底部分页功能 -->
        <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryList.pagenum"
            :page-sizes="[1, 2, 5, 10, 20]"
            :page-size="queryList.pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
        <!-- dialog添加用户对话框 -->
        <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible" 
        width="70%"  @close='closeForm' >
            <!-- 表单区域 -->
            <el-form :model="addForm" :rules="addForm_rules" ref="addForm_ref" label-width="100px">
                <el-form-item label="用户名称" prop="username">
                    <el-input v-model="addForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="addForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" prop="email">
                    <el-input v-model="addForm.email"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="addForm.mobile"></el-input>
                </el-form-item>
            </el-form>
            <!-- button区域 -->
            <span slot="footer" class="dialog-footer" >
                <el-button @click="dialogVisible = false" >取 消</el-button>
                <el-button type="primary" @click="addUser" >确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改用户区域 -->
        <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="70%" @close='editDialogclosed'>
            <el-form :model="editForm" :rules="editForm_rules" ref="editForm_ref" label-width="100px">
                <el-form-item label="用户名" >
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" >
                    <el-input v-model="editForm.email" ></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile"  >
                    <el-input v-model="editForm.mobile" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" >
                <el-button @click="editDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="checkEditForm">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
    data() {
        var checkmobile=(rule,value,cb)=>{
            const regmobile = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/ ;
            if(regmobile.test(value)){
                return cb()
            }
            cb(new Error('请输入合法手机号'))
        };
        var checkEmail = (rule,value,cb)=>{
            const regEmail = /\w+@[a-z0-9]+\.[a-z]{2,4}/;
            if(regEmail.test(value)){
                return cb()
            }
            cb(new Error('请输入合法邮箱地址'))
        };
        return{
            queryList:{
                query:'',
                pagenum:1,
                pagesize:10
            },
            userList:[],
            total:0,
            pagenum:1,
            dialogVisible:false,
            editDialogVisible:false,
            addForm:{
                username:'',
                password:'',
                email:'',
                mobile:'',
            },
            editForm:{
            },
            addForm_rules:{
                username:[
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 2, max: 5, message: '长度在 2 到 5 个字符或 数字', trigger: 'blur' }
                ],
                password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' } 
                ],
                email:[
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                mobile:[
                { required: true, message: '请输入手机号码', trigger: 'blur' },
                { validator: checkmobile,trigger:'blur'}
                ],

            },
            editForm_rules:{
                email:[
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { validator:checkEmail,trigger:'blur'}
                ],
                mobile:[
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                    { validator: checkmobile,trigger:'blur'}
                ]
            }

        }
    },
    created(){
        this.getUserlist()
    },
    methods:{
        async getUserlist(){
            const {data:res} = await this.$http.get(`users`, {params: this.queryList,})
            if(res.meta.status !== 200) return this.$message.error('获取用户数据失败');
            this.userList = res.data.users,
            this.total = res.data.total,
            this.pagenum = res.data.pagenum
            // console.log(res);
        },
        // 监听switch开关状态
        async userchanged(userInfo){
            const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
            if( res.meta.status !== 200){
                userInfo.mg_state = !userInfo.mg_state;
                return this.$message.error('获取用户状态失败');
            }
            this.$message.success('更新用户状态成功')
        },
        // 页面改变事件
        handleSizeChange(pagesize){
            // console.log(pagesize);
            this.queryList.pagesize = pagesize;
            this.getUserlist();
        },
        handleCurrentChange(newPagenum){
            this.queryList.pagenum = newPagenum;
            this.getUserlist()
        },
        // 监听对话框关闭事件
        closeForm(){
            this.$refs.addForm_ref.resetFields()
        },
        editDialogclosed(){
            this.$refs.editForm_ref.resetFields()
        },
        addUser(){
            this.$refs.addForm_ref.validate(async valid =>{
                // console.log(valid);
                if(!valid) return ;
                const { data: res } = await this.$http.post(`users`, this.addForm );
                if(res.meta.status !== 201) return this.$message.error('添加用户失败');
                this.$message.success('获取用户成功！') 
                 this.dialogVisible = false;
                //  重新获取用户列表数据
                this.getUserlist();

            })
        },
        // 修改用户
        async editDialog(id){
            this.editDialogVisible = true;
            // console.log(this.editDialogVisible);
            // console.log(id);
            const {data:res} = await this.$http.get(`users/+${id}`)
            // console.log(res);
            if(res.meta.status !== 200) return this.$message.error('获取用户数据失败！');
            this.editForm = res.data
            // console.log(res.data);
        },
        // 修改用于信息并提交
        checkEditForm(id){
            this.$refs.editForm_ref.validate(async valid =>{
                if(!valid) return ;
                const { data: res } = await this.$http.put(`users/${this.editForm.id}`,
                    {
                        email:this.editForm.email,
                        mobile:this.editForm.mobile
                    }
                )
                if(res.meta.status !== 200) return this.$message.Error('请求用户信息失败')
                // this.editForm = res.data;
                this.editDialogVisible = false;
                this.getUserlist()
                this.$message.success('修改成功')
            })
        },
        // 删除用户
        async deleteUser(id){
            const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).catch(err => err)
            if(confirmResult !== confirm) return this.$message.info('已取消删除')
            // if()
        }

    }
}
</script>
<style lang='less' scoped>
.box-card {
    width: 100%;
    height:100%;
    margin-top: 15px;
    box-shadow: none;
  }
.block{
    position: absolute;
    bottom:20px;
}

</style>