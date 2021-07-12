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
                    <el-input placeholder="请输入内容" v-model="searchInput" >
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-button type="primary" class='addgoods'>添加商品</el-button>
                <!-- 表格区域 -->
                <el-table :data="tabList.goods" style="width: 100%">
                    <el-table-column type='index'  width="50"></el-table-column>
                    <el-table-column prop="goods_name" label="商品名称" ></el-table-column>
                    <el-table-column prop="goods_price" label="商品价格(元)" width="130" ></el-table-column>
                    <el-table-column prop="goods_weight" label="商品重量(kg)" width="130"></el-table-column>
                    <el-table-column prop="add_time" label="创建时间" width="120">
                        <template slot-scope="scope">
                            {{this.times}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="150">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" icon='el-icon-edit'></el-button>
                            <el-button type="success" size="mini" icon='el-icon-delete'></el-button>
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
            searchInput:'',
            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:11,
                times : ''
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
            console.log(res.data);
            res.data.goods.forEach(element => {
                console.log(element.add_time);
                res.data.goods.add_time = this.getTimer(element.add_time)
                // console.log(res.data.goods.add_times);
            });
            this.tabList = res.data
        },
        //获取当前年月日星期几几点几分几秒并打印
        getTimer(originDate){
            var date = new Date(originDate*1000)
            var week = ['星期日', '星期一', '星期二', '星期三', '星	期四', '星期五', '星期六']
            var year = date.getFullYear()
            var month = date.getMonth() + 1
            var datee = date.getDate()
            var day = date.getDay()
            var time = year + '年' + month + '月' + datee + '日 	' + week[day]
            function getTimerr() {
                var time = new Date()
                var hour = time.getHours()
                hour = hour < 10 ? '0' + hour : hour
                var minute = time.getMinutes()
                minute = minute < 10 ? '0' + minute : minute
                var second = time.getSeconds()
                second = second < 10 ? '0' + second : second
                return hour + ':' + minute + ':' + second
            }
            this.times = time + ' ' + getTimerr()
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