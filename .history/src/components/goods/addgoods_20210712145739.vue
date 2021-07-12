<!--addgoods-->
<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片区域 -->
        <el-card>
            <el-row>
                <el-col>
                    <!-- 警告信息 -->
                    <el-alert title="添加商品信息" center type="info" show-icon></el-alert>
                </el-col>
            </el-row>
            <!-- 水平步骤条 -->
            <el-steps :active="active - 0 " finish-status="success" >
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="商品完成"></el-step>
            </el-steps>
            <!-- 垂直步骤条 -->
            <el-form :model="goodsForm" :rules="goodsFormRules" ref="goodsFormRef" label-width="100px" >
                <el-tabs v-model="active"  tab-position="left" :before-leave="beforeLeave" @tab-click='tabchange'>
                    <el-tab-pane label="基本信息" :name="'0'">
                        <el-form-item label="商品名称" prop="goods_name">
                            <el-input v-model="goodsForm.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goods_price">
                            <el-input v-model="goodsForm.goods_price"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goods_weight">
                            <el-input v-model="goodsForm.goods_weight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goods_number">
                            <el-input v-model="goodsForm.goods_number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" prop="goods_cat" >
                            <el-cascader v-model="goodsForm.goods_cat" :options="goodsOptions" @change="handleChange" :props='props'></el-cascader>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" :name="'1'">
                        <el-form-item :label="item.attr_name" v-for="item in tags" :key="item.attr_id">
                            <el-checkbox-group v-model="item.attr_vals">
                              <el-checkbox border :label="tag" v-for="(tag,index) in item.attr_vals" :key="index">
                              </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品属性" :name="'2'">
                        <el-form-item :label='item.attr_name' v-for="item in onlyData" :key='item.attr_id'>
                            <el-input v-model="item.attr_vals"  clearable ></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" :name="'3'">
                        <el-upload
                            action="http://127.0.0.1:8888/api/private/v1/upload"
                            :on-preview="handlePreview" :on-success="handleSuccess"
                            :on-remove="handleRemove" :headers='headerInfo'
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" :name="'4'">
                        <quill-editor v-model="goodsForm.quillText"></quill-editor>
                        <el-button type="primary" class='addBtn' @click="updateData"> 添加信息 </el-button>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
        <el-dialog title="预览图片"
                   :visible.sync="showDialogVisible"
                   width="30%">
            <img :src="previewpath" class='previewPic'>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return{
            active:0 ,
            goodsForm:{
                goods_name:'',
                goods_price:null,
                goods_weight:null,
                goods_number:null,
                goods_cat:[],
                pics:[],
                quillText:'',
            },
            goodsOptions:[],
            tags:[],
            onlyData:[],
            previewpath:'',
            
            goodsFormRules:{
                goods_name:[
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                goods_price:[
                    { required: true, message: '请输入商品价格(单位：元)', trigger: 'blur' },
                    { type: 'Number', trigger: 'blur' },
                ],
                goods_weight:[
                    { required: true, message: '请输入商品重量(单位：kg)', trigger: 'blur' },
                    { type: 'number', trigger: 'blur' },
                ],
                goods_number:[
                    { required: true, message: '请输入商品重量', trigger: 'blur' },
                     { type: 'number', required: true, message: '填写数字', trigger: 'blur' }
                ],
                goods_cat:[
                    { required: true, message: '请选择商品分类', trigger: 'blur' },
                ],
               
            },
            props:{
                label:'cat_name',
                value:'cat_id',
                children:'children',
                expandTrigger:'Hover'
            },
            headerInfo:{
                Authorization:window.sessionStorage.getItem('token')
            },
            showDialogVisible:false,
        }
    },
    created(){
        this.getgoodsList()
    },
    methods:{
        async getgoodsList(){
            const { data: res } = await this.$http.get(`categories`)
            if(res.meta.status !== 200 ) return this.$message.warning('获取分类数据失败！')
            this.goodsOptions = res.data
        },
        handleChange(){
            if(this.goodsForm.goods_cat.length !== 3){
                this.goodsForm.goods_cat = [] ;
            }
        },
        beforeLeave(activeName, oldActiveName){
            if(oldActiveName === '0' && this.goodsForm.goods_cat.length !== 3){
                this.$message.error('请填写相关商品信息')
                return false
            }
        },
        async tabchange(){
            if(this.active === '1'){
                const { data: res } = await this.$http.get(`categories/${this.goodsForm.goods_cat[2]}/attributes`, {
                  params: {sel:'many'}
                })
                res.data.forEach(item =>{
                   item.attr_vals =  item.attr_vals.length === 0 ? []:item.attr_vals.split(',')
                    
                })
                this.tags = res.data
                // console.log(this.tags);
            }else if(this.active === '2'){
                const { data: res } = await this.$http.get(`categories/${this.goodsForm.goods_cat[2]}/attributes`, {
                  params: {sel:'only'}
                })
                if(res.meta.status !== 200) return this.$message.warning('获取静态属性失败！')
                this.onlyData = res.data
            }

        },
        handlePreview(file){
            console.log(file);
            this.previewpath = file.response.data.url
            this.showDialogVisible = true
        },
        handleRemove(file){
            const filePath = file.response.data.tmp_path
            // console.log(filePath);
            const i = this.goodsForm.pics.findIndex( x => {
                x.pic === filePath
            })
            this.goodsForm.pics.splice(i,1)
            // console.log(this.addForm);
        },
        handleSuccess(response){
            const file = response.data.tmp_path
            this.goodsForm.pics.push(file)
            console.log(this.goodsForm.pics);
        },
       updateData(){
            this.$refs.goodsFormRef.validate( async (valid)=>{
                if(!valid){
                    return this.$message.error('请填写完整表单内容')
                }
                const newform =  _.cloneDeep(this.goodsForm)
                newform.goods_cat = newform.goods_cat.join(',')
                console.log(newform);
                const { data: res } = await this.$http.post(`goods`, {})
            })
        }
        
    }
}
</script>
<style lang='less' scoped>
.el-card {
    margin-top:20px;
}
.el-steps{
    margin-top:20px;
}
.el-tabs{
    margin-top:20px;
}
.el-tag{
    margin-left: 20px;
}
.el-label{
    width: 300px;
}
.el-form-item__label{
    width: 300px;
}
.previewPic{
    width: 100%;
}
.el-button{
    margin-top:10px;
}
</style>