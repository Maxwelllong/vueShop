<!--商品参数-->
<template>
    <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
        <!-- 警告栏 -->
        <el-row>
            <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon></el-alert>
        </el-row>
        <!-- 分类选择框 -->
        <div>
            <p>选择商品分类： <el-cascader
              v-model="绑定一个空数组"
              :options="渲染成级联的数据对象"
              可清空
              仅显示最后一级
              配置级联选择框
              hover选中
              @change="handleChange"></el-cascader></p>
        </div>
    </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return{
            lists:[]
        }
    },
    created(){
        this.getlist()
    },
    methods:{
        getlist(){
            const { data: res } = await this.$http.get(`categories/:id/attributes`, {
              params: {}
            })
        }
    }
}
</script>
<style lang='less' scoped>

</style>