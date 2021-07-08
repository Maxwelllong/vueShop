<!--商品分类-->
<template>
    <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
        <!-- 添加分类按钮 -->
        <el-button type="primary" >添加分类</el-button>
        <!-- 表格区域 -->
        <tree-table :data = 'tableList' :columns="columns">

        </tree-table>
    </el-card>
    <!-- 底部分页功能 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.pagenum"
      :page-sizes="[5, 8, 10, 15]"
      :page-size="this.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total">
    </el-pagination>
    </div>
</template>
<script>
export default {
    data() {
        return{
            tableList:[],
            queryInfo:{
                pagenum:1,
                pagesize:10,
            },
            total:0
        }
    },
    methods:{
        async getTablelist(){
            const { data: res } = await this.$http.get(`categories`,{params:this.queryInfo})
            if(res.meta.status !== 200) return this.$message.info('获取列表信息失败，请刷新重试')
            console.log(res);
            this.tableList = res.data.result;
            this.total = res.data.total;
        },
        columns:[
            {
                label: '分类名称',
                prop: 'cat_name',
                width: '400px',
            },
        ],
        handleSizeChange(){},
        handleCurrentChange(){},
    },
    mounted(){
        this.getTablelist()
    }
}
</script>
<style lang='less' scoped>
.pagination{
    position: absolute;
    bottom:10px;
}
</style>