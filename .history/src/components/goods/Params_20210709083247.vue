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
                <el-button type="primary" :disabled='isDisable' @click="addDialog=true">添加参数</el-button>
                <el-table :data="manyParamsList" >
                    <el-table-column type='expand' width="80" > </el-table-column>
                    <el-table-column type='index' label="序号" width="80" > </el-table-column>
                    <el-table-column prop="attr_name" label="参数名称" > </el-table-column>
                    <el-table-column label="操作" > 
                        <template slot-scope="scope" class='deleAndeditBtn'>
                            <el-button type="primary" size='mini' icon="el-icon-edit" @click="showEditDialog(scope.row)">编辑</el-button>
                            <el-button type="danger"  size='mini' icon="el-icon-delete" >删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="only" >
                <el-button type="primary" :disabled='isDisable' @click="addDialog=true">添加属性</el-button>
                <el-table :data="onlyParamsList" >
                    <el-table-column type='expang' width="80" > </el-table-column>
                    <el-table-column type='index' label="序号" width="80" > </el-table-column>
                    <el-table-column prop="attr_name" label="参数名称" > </el-table-column>
                    <el-table-column label="操作" > 
                        <template slot-scope="scope">
                            <el-button type="primary" size='mini' icon="el-icon-edit" @click="showEditDialog(scope.row.attr_id)">编辑</el-button>
                            <el-button type="danger"  size='mini' icon="el-icon-delete">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <!-- 添加参数dialog -->
        <el-dialog :title="'添加' + titleText" :visible.sync="addDialog" width="50%" @close = 'addFormClosed'>
            <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px" >
                <el-form-item :label="titleText" prop="attr_name">
                    <el-input v-model="addCateForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="addDialog = false">取 消</el-button>
                <el-button type="primary" @click="updataAddCate">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改按钮 -->
        <el-dialog :title="'修改'+titleText" :visible.sync="editDialog" width="50%" @close = 'editFormClosed'>
            <el-form :model="editCateForm" :rules="editCateFormRules" ref="editCateFormRef" label-width="100px" >
                <el-form-item :label="titleText" prop="attr_name">
                    <el-input v-model="editCateForm.attr_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="editDialog = false">取 消</el-button>
                <el-button type="primary" @click="updataAddCate">确 定</el-button>
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
            editDialog:false,
            addCateForm:{
                attr_name:'',
                cat_id  : 0,
                attr_sel: ''

            },
            editCateForm:{
                attr_name:''
            },
            addCateFormRules:{
            attr_name: [
                { required: true, message: '请输入参数名称', trigger: 'blur' },
                { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
            ]
            },
            editCateFormRules:{
                attr_name: [
                    { required: true, message: '请输入参数名称', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ]
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
        },
        titleText(){
            if(this.activeName === 'many'){
                return '动态参数'
            }else{
                return '静态属性'
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
                this.addCateForm.cat_id = res.data.cat_id
                this.addCateForm.attr_sel = this.activeName
            }else{
                this.onlyParamsList = res.data;
                 this.addCateForm.cat_id = res.data.cat_id
                this.addCateForm.attr_sel = this.activeName
            }
        },
        addFormClosed(){
            this.$refs.addCateFormRef.resetFields();
        },
        // 添加参数
        addCate(){
            this.addDialog = true;
        },
        // 提交参数
        updataAddCate(){
            this.$refs.addCateFormRef.validate(async(valid)=>{
                if(!valid) return 
                const { data:res } =await this.$http.post(`categories/${this.selectedOption[2]}/attributes`, {
                    attr_name : this.addCateForm.attr_name ,
                    attr_sel  : this.activeName 
                    });
                if(res.meta.status !== 201 ) return this.$message.warning('提交参数失败！') ;
                this.$message.success('提交参数成功')
                 this.handleChange()
                this.addDialog = false ;
                
            });
            
        },
        editFormClosed(){
            this.$refs.editCateFormRef.resetFields();
        },
        async showEditDialog(item){
            // console.log(item);
            const { data: res } = await this.$http.get(`categories/${item.cat_id}/attributes/${item.attr_id}`, {
                params:{attr_sel : this.activeName}
            })
            if(res.meta.status !== 200 ) return this.$message.warning('获取用户信息失败') 
            this.editCateForm = res.data
            console.log(res.data);
            this.editDialog = true
        },
         updataAddCate(){
            this.$refs.editCateFormRef.validate( async( valid )=> {
                if(!valid) return this.$message.warning('请重新确认表单内容是否正确')
                const { data: res } = await this.$http.put(`categories/${this.editCateForm.cat_id}/attributes/${this.editCateForm.attr_id}`, {
                    params:{ attr_name : this.editCateForm.attr_name , attr_sel :this.activeName}
                })
                if(res.meta.status !== 200 ) return this.$message.warning('提交信息失败，请重新提交修改')
                this.$message.success("提交修改成功");
                this.editDialog = false ;
            })
        }
         
    }
}
</script>
<style lang='less' scoped>
.el-cascader{
    width: 300px;
}
.deleAndeditBtn{
    position: absolute;
    margin-right:20px;
}
</style>