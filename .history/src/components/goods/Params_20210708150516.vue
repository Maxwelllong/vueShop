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
            <p>选择商品分类： 
            <el-cascader
              v-model="selectedOption"
              :options="lists"
              :props="paramsProps"
              
              @change="handleChange"></el-cascader>
            </p>
        </div>
    </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return{
            lists:[],
            selectedOption:[],
            paramsProps:{
                value:'cat_id',
                label:'cat_name',
                children:'children',
                expandTrigger:'hover'

            }
        }
    },
    created(){
        this.getlist()
    },
    methods:{
        async getlist(){
            const { data: res } = await this.$http.get(`categories`)
            if(res.meta.status !== 200 ) return this.$message.warning('获取列表数据失败')
            this.lists = res.data
            console.log(res);
        },
        handleChange(){
            console.log(this.selectedOption);
        }
    }
}
</script>
<style lang='less' scoped>
.el-cascader{
    width: 300px;
}
</style>