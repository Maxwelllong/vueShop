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
        <tree-table :data = 'tableList' :columns="columns" stripe :selection-type="false"
        show-index index-text='序号' :expand-type='false' border>
            <template  slot-scope="scope" slot='toDelete'>
                    <el-icon class='el-icon-success' v-if='scope.row.cat_deleted === false ' style='color:green'></el-icon>
                    <el-icon class='el-icon-error' v-else style='color:yellow '></el-icon>
            </template>
            <template slot-scope="scope" slot='toOrder'>
                <el-tag type='success' v-if='scope.row.cat_level === 0 '>一级</el-tag>
                <el-tag type='warning' v-else-if="scope.row.cat_level === 1">二级</el-tag>
                <el-tag type='danger' v-else-if="scope.row.cat_level === 2">三级</el-tag>
            </template>
            <template slot-scope="scope" slot='toManufact'>
                <el-button type="primary" icon="el-icon-edit" >编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" >编辑</el-button>
                
            </template>
        </tree-table>
    </el-card>
    <!-- 底部分页功能 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.queryInfo.pagenum"
      :page-sizes="[5, 8, 10, 15]"
      :page-size="this.queryInfo.pagesize"
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
            total:0,
            columns:[
                {
                    label: '分类名称',
                    prop: 'cat_name',
                },{
                    label: '是否有效',
                    type:'template',
                    template:'toDelete'
                },{
                    label: '排序',
                    type:'template',
                    template:'toOrder'
                },{
                    label: '操作',
                    type:'template',
                    template:'toManufact'
                },
            ],
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
        
        handleSizeChange(num){
            // console.log(num);
            this.queryInfo.pagesize = num ;
            this.getTablelist();
        },
        handleCurrentChange(num){
            // console.log(num);
            this.queryInfo.pagesize = num ;
            this.getTablelist();
        },
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