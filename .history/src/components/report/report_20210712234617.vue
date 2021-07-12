<!--report model-->
<template>
    <div>
      <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
        <!-- 2.划定echarts绘图区域 -->
        <div id='main' style='width:600px ;height:400px'>
           
        </div>
    </el-card>
    </div>
</template>
<script>
// 1.导入echarts
import echarts from 'echarts'
import _ from 'lodash'
export default {
    data() {
        return{}
    },
    async mounted(){
        // 3.基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        const { data: res } = await this.$http.get(`reports/type/1`)
        if(res.meta.status !== 200 ) return this.$message.warning('获取数据失败')
        _.merge(this.option , res.data)
        // 4.指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
         // 5.使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
    },
    methods:{
        
       
    }
}
</script>
<style lang='less' scoped>
.el-card{
    margin-top:20px;
}
</style>