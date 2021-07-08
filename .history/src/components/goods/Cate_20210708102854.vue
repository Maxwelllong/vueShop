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
                <el-button type="primary" icon="el-icon-edit" @click="editTableItem(scope.row)" >编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" >删除</el-button>
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
                <el-input v-model="addCateForm.cat_name"></el-input>
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
    <!-- 编辑dialog -->
    <el-dialog title="修改分类名称" :visible.sync="editDialog"  width="50%">
       <el-input v-model="editCateName"  clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="editDialog = false">确 定</el-button>
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
                cat_name:'',
                cat_pid:'',
                cat_level:'',
            },
            addCateFormRules:{
                cat_name : [
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
            parentCatelist:[],
            editDialog:false,
            editCateName:''
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
            // console.log(res);
            this.parentCatelist = res.data;
            this.addCateDialog = true;
        },
        closedDialog(){
            this.$refs.addCateFormRef.resetFields();
            // this.$refs.addCateFormRef.resetFields();
            this.selectedOption = [];
            this.addCateForm.cat_name = '';
            this.addCateForm.cat_pid= 0,
            this.addCateForm.cat_level= 0
        },
        handleChange(){
            // console.log(this.selectedOption);
            if(this.selectedOption.length > 0 ){
                this.addCateForm.cat_pid = this.selectedOption[this.selectedOption.length -1]
                this.addCateForm.cat_level = this.selectedOption.length;
                // console.log(this.cat_level);
                // console.log(this.cat_pid);
            }else{  
                
            return this.$message.warning('请选择对应的父节点');
            
            }
            
        },
        updataCateDialog(){
            this.$refs.addCateFormRef.validate(async(valid)=>{
                if(valid){
                    const { data: res } = await this.$http.post(`categories`, this.addCateForm)
                    // console.log(res);
                    if(res.meta.status !== 201 ) return this.$message.warning('添加商品分类失败')
                    this.$message.success('添加商品分类成功')
                    this.getTablelist();
                    this.addCateDialog = false ;
                }else{
                    return this.$message.warning('请重新确认表单内容')
                }
            })
        },
        // 编辑按钮
        async editTableItem(item){
            
            const { data: res } = await this.$http.get(`categories/${item.cat_id}`)
            if(res.meta.status !== 200) return this.$message.warning('获取当前信息失败！请重新刷新')
            console.log(res);
            this.editCateName = res.cat_name;
            this.editDialog = true;
        }

        
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