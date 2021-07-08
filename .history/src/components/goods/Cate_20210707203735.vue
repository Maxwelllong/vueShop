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
        <tree-table :data = 'tabList'>

        </tree-table>
    </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return{
            tableList:[],
            props: {
                stripe: false,
                border: false,
                showHeader: true,
                showSummary: false,
                showRowHover: true,
                showIndex: false,
                treeType: true,
                isFold: true,
                expandType: false,
                selectionType: false,
            },
        }
    },
    methods:{
        async getTablelist(){
            const { data: res } = await this.$http.get(`categories`)
            if(res.meta.status !== 200) return this.$message.info('获取列表信息失败，请刷新重试')
            console.log(res);
        }
    },
    mounted(){
        this.getTablelist()
    }
}
</script>
<style lang='less' scoped>

</style>