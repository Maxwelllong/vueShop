<!--商品列表-->
<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索框&添加商品按钮 -->
        <el-card class='card'>
            <el-row>
                <el-col :span="8" >
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear='clearInfo'>
                        <el-button slot="append" icon="el-icon-search" @click="search" ></el-button>
                    </el-input>
                </el-col>
                <el-button type="primary" class='addgoods'>添加商品</el-button>
                <!-- 表格区域 -->
                <el-table :data="tabList.goods" style="width: 100%">
                    <el-table-column type='index'  width="50"></el-table-column>
                    <el-table-column prop="goods_name" label="商品名称" ></el-table-column>
                    <el-table-column prop="goods_price" label="商品价格(元)" width="130" ></el-table-column>
                    <el-table-column prop="goods_weight" label="商品重量(kg)" width="130"></el-table-column>
                    <el-table-column prop="add_time" label="创建时间" width="200">
                        <template slot-scope="scope">
                            {{scope.row.add_time | dateFormat }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" icon='el-icon-edit'></el-button>
                            <el-button type="success" size="mini" icon='el-icon-delete' @click="removeGoods(scope.row.goods_id)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-card>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[ 8,10, 12, 16,]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    </div>
</template>
<script>
export default {
    data() {
        return{
            searchInput:'',
            queryInfo:{
                query:'',
                pagenum: 1 ,
                pagesize:8,
               
            },
            tabList:{},
            total : 0,
        }
    },
    created(){
        this.getGoodslist()
    },
    methods:{
        async getGoodslist(){
            const { data: res } = await this.$http.get(`goods`,{params:this.queryInfo})
            if(res.meta.status !== 200) return this.$message.warning('获取商品信息失败！请刷新重试')
            this.tabList = res.data 
            this.total = res.data.total
            this.queryInfo.pagenum = Number( res.data.pagenum )
            // console.log(res.data);
            
        },
        handleSizeChange(val){
            this.queryInfo.pagesize = val;
            this.getGoodslist();
        },
        handleCurrentChange(vals){
            this.queryInfo.pagenum = vals ;
            this.getGoodslist();
        },
        search(){
            this.getGoodslist();
        },
        clearInfo(){
            this.getGoodslist()
        },
        async removeGoods(id){
            const confirm = await this.$confirm('此操作将删除次信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
                });          
            });
            if(confirm === 'confirm '){
                console.log(confirm);
                const { data: res } = await this.$http.delete(`goods/${id}`)
                if(res.meta.status !== 200 ) return this.$message.warning('删除失败')
                this.$message.success('删除成功')
                this.getGoodslist();
            }
        }
    }        
}

</script>
<style lang='less' scoped>
.card{
    margin:10px;
}
.addgoods{
    margin-left:20px
}
</style>