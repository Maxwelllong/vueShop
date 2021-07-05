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
                        <el-input placeholder="请输入内容"  class="input-with-select">
                            <el-button slot="append" icon="el-icon-search"></el-button>
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
                            {{scope.row}}
                            <el-switch
                            v-model="scope.row.my_state"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" > <el-button type="success" ></el-button></el-table-column>
                 </el-table>
            </div>
        </el-card>
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
        }
    }
}
</script>
<style lang='less' scoped>
.box-card {
    width: 100%;
    margin-top: 15px;
  }

</style>