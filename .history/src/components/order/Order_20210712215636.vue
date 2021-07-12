<!--商品列表-->
<template>
    <div>
      <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
        <el-card>
            <el-row >
                <el-col :span="10">
                    <el-input placeholder="请输入订单编号" v-model="queryInfo.query" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search" @click="searchBtn"></el-button>
                    </el-input>
                </el-col>
                <!-- 订单列表 -->
                <el-table :data="tabData" style="width: 100%">
                  <el-table-column type="index"></el-table-column>
                  <el-table-column prop="order_number"  label="订单编号" ></el-table-column>
                  <el-table-column prop="order_price"  label="订单价格" width="100"></el-table-column>
                  <el-table-column prop="order_pay"  label="是否付款" width="100">
                      <template slot-scope="scope" width="300">
                          <el-tag type="danger" v-if="scope.row.order_pay === '0' " >未付款</el-tag>
                          <el-tag type="success" v-else>已付款</el-tag>
                      </template>
                  </el-table-column>
                  <el-table-column prop="is_send"  label="是否发货" width="100"></el-table-column>
                  <el-table-column prop="create_time"  label="下单时间" width="200">
                      <template slot-scope="scope">
                            {{scope.row.create_time | dateFormat }}
                      </template>
                  </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button type="primary" icon='el-icon-edit' @click="editAddres"></el-button>
                        <el-button type="success" icon='el-icon-location-outline'></el-button>
                    </template>
                </el-table-column>
                </el-table>
            </el-row>
            <!-- 分页栏 -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="this.queryInfo.pagenum"
            :page-sizes="[8,10, 13, 15]" :page-size="this.queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="this.total">
            </el-pagination>
        </el-card>
        <!-- 展示修改地址对话框 -->
        <el-dialog title="修改地址"
                   :visible.sync="showDialogBox"
                   width="30%">
            <el-form :model="addressInfo" :rules="addressInfoRules" ref="addressInfoRef" label-width="100px" >
                <el-form-item label="省市区/县" prop="bigAddress">
                    <el-cascader
                      v-model="addressInfo.bigAddress" width:80%
                      :options="citydata" 
                      hover
                      @change="handleChange"></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="smallAddress">
                    <el-input v-model="addressInfo.smallAddress"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer"
                    class="dialog-footer">
                <el-button @click="showDialogBox = false">取 消</el-button>
                <el-button type="primary"
                        @click="showDialogBox = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import citydata from './citydata.js'
export default {
    data() {
        return{
            citydata,
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:10,
            },
            tabData:[],
            total:0,
            showDialogBox:false,
            addressInfo:{
                bigAddress:[],
                smallAddress:''
            },
            tabDataRules:{
                bigAddress:[
                    { required: true, message: '请选择省市区', trigger: 'blur' },
                ],
                smallAddress:[
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                ]
            }
        }
    },
    created(){
        this.gettabList()
    },
    methods:{
        async gettabList(){
            const { data: res } = await this.$http.get(`orders`,{
                params:this.queryInfo
            })
            if(res.meta.status !== 200 ) return this.$message.warning('获取数据失败')
            this.tabData = res.data.goods
            this.total = res.data.total
            // console.log(this.tabData); 
        },
        handleSizeChange(num){
        //    console.log(num);
            this.queryInfo.pagesize = num;
            // console.log(this.queryInfo.pagesize);
            this.gettabList();
        },
        handleCurrentChange(pagenum){
            // console.log(info);
            this.queryInfo.pagenum = pagenum
             this.gettabList();
        },
        searchBtn(){
            this.gettabList()
        },
        editAddres(){
            this.showDialogBox = true;
        }
    }
}
</script>
<style lang='less' scoped>
.el-card{
    margin-top:20px;
}
</style>