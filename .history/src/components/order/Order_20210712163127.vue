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
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <!-- 订单列表 -->
                <el-table :data="tabData" style="width: 100%">
                  <el-table-column type="index"></el-table-column>
                  <el-table-column prop="order_number"  label="订单编号" ></el-table-column>
                  <el-table-column prop="order_price"  label="订单价格" ></el-table-column>
                  <el-table-column prop="order_pay"  label="是否付款" >
                      <template slot-scope="scope">
                          <el-tag type="danger" v-if="scope.row.order_pay === '0' ">未付款</el-tag>
                          <el-tag type="success" v-else>已付款</el-tag>
                      </template>
                  </el-table-column>
                  <el-table-column prop="is_send"  label="是否发货" ></el-table-column>
                  <el-table-column prop="create_time"  label="下单时间" >
                      <template slot-scope="scope">
                            {{scope.row.create_time | dateFormat }}
                      </template>
                  </el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button type="primary" icon='el-icon-edit'></el-button>
                        <el-button type="success" icon='el-icon-location-outline'></el-button>
                    </template>
                </el-table-column>
                </el-table>
            </el-row>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return{
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:10,
            },
            tabData:[],
            total:''
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
            console.log(this.tabData);
        }
    }
}
</script>
<style lang='less' scoped>
.el-card{
    margin-top:20px;
}
</style>