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
        <!-- tabs页签 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="动态参数" name="many" >
                <el-button type="primary" :disabled='isDisable'>添加参数</el-button>
                <el-table :data="manyParamsList" >
                    <el-table-column type='index' label="序号" width="80" > </el-table-column>
                    <el-table-column prop="attr_name" label="参数名称" > </el-table-column>
                    <el-table-column label="操作" > 
                         
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="only" >
                <el-button type="primary" :disabled='isDisable'>添加属性</el-button>
            </el-tab-pane>
        </el-tabs>
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
            },
            activeName:"many",
            manyParamsList:[],
            onlyParamsList:[],
        }
    },
    created(){
        this.getlist()
    },
    computed:{
        isDisable(){
            if(this.selectedOption.length !== 3){
                return  true ;
            }else{
                return false
            }
        }
    },
    methods:{
        async getlist(){
            const { data: res } = await this.$http.get(`categories`)
            if(res.meta.status !== 200 ) return this.$message.warning('获取列表数据失败')
            this.lists = res.data
            // console.log(res);
        },
        handleChange(){
            // console.log(this.selectedOption);
            this.getParamsList(this.selectedOption[2],this.activeName)
        },
        handleClick(){
            this.getParamsList(this.selectedOption[2],this.activeName)
        },
        // 获取列表参数数据
        async getParamsList(id,sel){  
            const { data: res } = await this.$http.get(`categories/${id}/attributes`, {
              params: {"sel":sel}
            })
            if(res.meta.status !== 200 ) return this.$message.warning('获取列表参数失败') ;
            if(this.activeName === 'many'){
                this.manyParamsList = res.data;
            }else{
                this.onlyParamsList = res.data;
            }
        }
    }
}
</script>
<style lang='less' scoped>
.el-cascader{
    width: 300px;
}
</style>