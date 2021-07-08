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
        <ul class="switch-list">
            <li class="switch-item" v-for="item in tableList" :key="item.cat_id">
                <span>{{ item.cat_name }}: </span>
                <zk-switch v-model="props[item.name]"></zk-switch>
            </li>
        </ul>
    </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return{
            tableList:[],
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