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
                <el-table :data="queryInfo" style="width: 100%">
                  <el-table-column type="index"></el-table-column>
                  <el-table-column prop="渲染绑定的表数据tableDate中的哪个数据"  label="订单编号" >
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

            }
        }
    },
    created(){
        this.gettabList()
    },
    methods:{
        async gettabList(){
            const { data: res } = await this.$http.get(`orders`,
              this.queryInfo
            )
            if(res.meta.status !== 200 ) return this.$message.warning('获取数据失败')
            console.log(res.data);
        }
    }
}
</script>
<style lang='less' scoped>
.el-card{
    margin-top:20px;
}
</style>