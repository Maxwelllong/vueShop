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
                <el-button type="primary" :disabled='isDisable' @click="addCate">添加参数</el-button>
                <el-table :data="manyParamsList" >
                    <el-table-column type='expand' width="80" > </el-table-column>
                    <el-table-column type='index' label="序号" width="80" > </el-table-column>
                    <el-table-column prop="attr_name" label="参数名称" > </el-table-column>
                    <el-table-column label="操作" > 
                        <template slot-scope="scope">
                            <el-button type="primary" size='mini' icon="el-icon-edit">编辑</el-button>
                            <el-button type="danger"  size='mini' icon="el-icon-delete">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="only" >
                <el-button type="primary" :disabled='isDisable'>添加属性</el-button>
                <el-table :data="onlyParamsList" >
                    <el-table-column type='expang' width="80" > </el-table-column>
                    <el-table-column type='index' label="序号" width="80" > </el-table-column>
                    <el-table-column prop="attr_name" label="参数名称" > </el-table-column>
                    <el-table-column label="操作" > 
                        <template slot-scope="scope">
                            <el-button type="primary" size='mini' icon="el-icon-edit">编辑</el-button>
                            <el-button type="danger"  size='mini' icon="el-icon-delete">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <!-- 添加参数dialog -->
        <el-dialog title="添加参数" :visible.sync="addDialog" width="50%">
            <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px" >
                <el-form-item label="动态参数" prop="cat_name">
                    <el-input v-model="addCateForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer"
                    class="dialog-footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary"
                        @click="addDialog = false">确 定</el-button>
            </span>
        </el-dialog>
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
            addDialog:false,
            addCateForm:{
                attr_name:'',
                attr_id : '',
                attr_sel: '',
            },
            addCateFormRules:{
            cateName: [
                { required: true, message: '请输入参数名称', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            }
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
        },
        // 添加参数
        addCate(){
            this.addDialog = true;
        }
    }
}
</script>
<style lang='less' scoped>
.el-cascader{
    width: 300px;
}
</style>