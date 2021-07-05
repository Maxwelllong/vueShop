<!--homepage-->
<template>
   <el-container class='con'>
    <el-header class='header'>
        <div class='logo'>
            <img src="../assets/logo.png" >
            <span>电商管理平台</span>
        </div>
        <!-- <button class="logout" @click="logout">退出</button> -->
        <div>
            <el-button type="primary" @click="logout">退出</el-button>
        </div>
    </el-header>
    <el-container>
        <el-aside width="200px">
            <div class="targetStyle" @click="target">|||</div>
            <el-menu background-color="#545c64"  text-color="#fff" active-text-color="#409BFF" unique-opened :collapse='targetStyle' :collapse-transition="false"
                <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">
                    <template slot="title">
                        <i :class="iconsList[item.id]"></i>
                        <span>{{item.authName}}</span>
                    </template>
                        <el-menu-item :index="items.id+''" v-for="items in item.children" :key="items.id">
                            <template>
                                <i class="el-icon-menu"></i>
                                <span>{{items.authName}}</span>
                            </template>
                        </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main>Main</el-main>
    </el-container> 
    </el-container>
</template>
<script>
export default {
    data() {
        return{
            menuList:[],
            iconsList:{
                '125':'iconfont icon-user',
                '103':'iconfont icon-tijikongjian',
                '101':"iconfont icon-shangpin",
                '102':'iconfont icon-danju',
                '145':'iconfont icon-baobiao'
            },
            targetStyle:false
        }
    },
    created(){
        this.getMenulist()
    },
    methods:{
        logout(){
            window.sessionStorage.clear();
            this.$router.push('/login');
            this.$message.error('退出成功')
        },
        async getMenulist(){
            const {data : res}= await this.$http.get(`menus`)
            // console.log(data);
            if(res.meta.status !== 200) return this.$message.error(res.meta.msg);
            this.menuList = res.data
            console.log(this.menuList);
        },
        target(){
            this.targetStyle = !this.targetStyle
        }
    },
    
}
</script>
<style lang='less' scoped>
.con{
    height:100%;
    width: 100%;
}
.el-header{
    background: gray;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.el-aside{
    height:100%;
    background-color: #333744;
}
el-main{
    background-color: #eee;
}
.logo{
    width: 200px;
    height: 50px;
    // background-color: aqua;
    font-size: 20px;
    color:#fff;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 50px;
        height: 50px;
    }
}
.iconfont {
    font-size:20px;
    margin-right: 10px;
}
.el-menu{
    border-right:0;
}
.targetStyle{
    display: flex;
    justify-content: center;
    align-items: center;
    height:35px;
    line-height: 35px;
    color:white;
    letter-spacing: .1em;
    cursor: pointer;
}
</style>