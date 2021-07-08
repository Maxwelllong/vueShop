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
    <el-card style='margin-top:10px ; height:100%;'>
        <!-- 添加分类按钮 -->
        <el-row style='margin-bottom:10px'>
            <el-col >
                <el-button type="primary" @click="addCate" >添加分类</el-button>
            </el-col>
        </el-row>
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
    <el-pagination class='pagination'
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.queryInfo.pagenum"
      :page-sizes="[5, 8, 10, 12]"
      :page-size="this.queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.total">
    </el-pagination>
    <!-- 添加分类功能 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialog" width="50%" @close='closedDialog'>
        <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px" >
            <el-form-item label="分类名称" prop="addCateName">
                <el-input v-model="addCateForm.addCateName"></el-input>
            </el-form-item>
            <!-- 添加商品父分类 -->
            <el-form-item label="父级名称">
                <el-cascader label='父级分类' v-model="selectedOption" clearable 
                    :options="parentCatelist"  size='medium' 
                    :props="selectCatecader"
                    @change="handleChange" >
                </el-cascader>

            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addCateDialog = false">取 消</el-button>
            <el-button type="primary" @click="updataCateDialog">确 定</el-button>
        </span>
    </el-dialog>
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
            addCateDialog:false,
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
            addCateForm:{
                addCaetName:'',
            },
            addCateFormRules:{
                addCateName : [
                        { required: true, message: '请输入分类名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]
            },
            // 添加商品分类源
            selectCatecader:{
                value: 'cat_id',
                label: 'cat_name',
                children: 'children',
                expandTrigger: 'hover',
                checkStrictly :true,            
            },
            selectedOption:[],
            parentCatelist:[]
        }
    },
    methods:{
        async getTablelist(){
            const { data: res } = await this.$http.get(`categories`,{params:this.queryInfo})
            if(res.meta.status !== 200) return this.$message.info('获取列表信息失败，请刷新重试')
            // console.log(res);
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
            this.queryInfo.pagenum = num ;
            this.getTablelist();
        },
        async addCate(){
            const { data: res } = await this.$http.get(`categories`, {
              params: { type:2}
            })
            if(res.meta.status !== 200 ) return this.$message.warning('获取商品信息失败！')
            console.log(res);
            this.parentCatelist = res.data;
            this.addCateDialog = true;
        },
        closedDialog(){
            this.$refs.addCateFormRef.resetFields()
        },
        handleChange(){

        },
        updataCateDialog(){
        this.$refs.addCateFormRef.validate(async(valid) => {
            if (valid) {
                    const { data: res } = await this.$http.post(`categories`, this.selectedOption)
                }else{
                    return this.$message.warning('请重新确认表单是否填写正确')
                } 
            }
        )
    },
    mounted(){
        this.getTablelist()
    }
}
</script>
<style lang='less' scoped>
.pagination{
    // position: absolute;
    bottom:10px;
}
</style>