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
                        <el-input placeholder="请输入内容" v-model='queryList.query' class="input-with-select">
                            <el-button slot="append" @click="getUserlist" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" >添加用户</el-button>
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
                        <template slot-scope="scope">
                            <!-- 修改按钮 -->
                            <el-tooltip  content="修改" placement="top" :enterable='false'>
                                <el-button size='mini' type="warning" icon='el-icon-edit'></el-button>
                            </el-tooltip>
                            <el-tooltip  content="删除" placement="top" :enterable='false'>
                                <el-button size='mini' type="danger" icon='el-icon-delete'></el-button>
                            </el-tooltip>
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
    </div>
</template>
<script>
export default {
    data() {
        return{
            queryList:{
                query:'',
                pagenum:1,
                pagesize:10
            },
            userList:[],
            total:0,
            pagenum:1,

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
            this.pagenum = res.data.pagenum,
            console.log(res);
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
        }
    }
}
</script>
<style lang='less' scoped>
.box-card {
    width: 100%;
    margin-top: 15px;
  }
.block{
    position: absolute;
    bottom:20px;
}
</style>