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
                
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                
        </el-aside>
        <el-main>Main</el-main>
    </el-container> 
    </el-container>
</template>
<script>
export default {
    data() {
        return{}
    },
    methods:{
        logout(){
            window.sessionStorage.clear();
            this.$router.push('/login');
            this.$message.error('退出成功')
        }
    }
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

</style>