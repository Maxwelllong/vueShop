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
                        <el-form-item label="商品名称" prop="goodsName">
                            <el-input v-model="goodsForm.goodsName"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格" prop="goodsPrice">
                            <el-input v-model="goodsForm.goodsPrice"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量" prop="goodsWeight">
                            <el-input v-model="goodsForm.goodsWeight"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量" prop="goodsNum">
                            <el-input v-model="goodsForm.goodsNum"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类" prop="goodsCate" >
                            <el-cascader v-model="goodsForm.goodsCate" :options="goodsOptions" @change="handleChange" :props='props'></el-cascader>
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
                        <el-button type="primary">点击上传</el-button>
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="fileList"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="商品内容" :name="'4'">商品内容</el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return{
            active:0 ,
            goodsForm:{
                goodsName:'',
                goodsPrice:null,
                goodsWeight:null,
                goodsNum:null,
                goodsCate:[]
            },
            goodsOptions:[],
            tags:[],
            onlyData:[],
            goodsFormRules:{
                goodsName:[
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                ],
                goodsPrice:[
                    { required: true, message: '请输入商品价格', trigger: 'blur' },
                     { type: 'float', required: true, message: '填写数字', trigger: 'blur' }
                ],
                goodsWeight:[
                    { required: true, message: '请输入商品重量', trigger: 'blur' },
                     { type: 'float', required: true, message: '填写数字', trigger: 'blur' }
                ],
                goodsNum:[
                    { required: true, message: '请输入商品重量', trigger: 'blur' },
                     { type: 'number', required: true, message: '填写数字', trigger: 'blur' }
                ],
                goodsCate:[
                    { required: true, message: '请选择商品分类', trigger: 'blur' },
                ],
               
            },
            props:{
                label:'cat_name',
                value:'cat_id',
                children:'children',
                expandTrigger:'Hover'
            }
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
            if(this.goodsForm.goodsCate.length !== 3){
                this.goodsForm.goodsCate = [] ;
            }
        },
        beforeLeave(activeName, oldActiveName){
            if(oldActiveName === '0' && this.goodsForm.goodsCate.length !== 3){
                this.$message.error('请填写相关商品信息')
                return false
            }
        },
        async tabchange(){
            if(this.active === '1'){
                const { data: res } = await this.$http.get(`categories/${this.goodsForm.goodsCate[2]}/attributes`, {
                  params: {sel:'many'}
                })
                res.data.forEach(item =>{
                   item.attr_vals =  item.attr_vals.length === 0 ? []:item.attr_vals.split(',')
                    
                })
                this.tags = res.data
                // console.log(this.tags);
            }else if(this.active === '2'){
                const { data: res } = await this.$http.get(`categories/${this.goodsForm.goodsCate[2]}/attributes`, {
                  params: {sel:'only'}
                })
                if(res.meta.status !== 200) return this.$message.warning('获取静态属性失败！')
                this.onlyData = res.data
            }

        },
        handlePreview(){
            
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
</style>