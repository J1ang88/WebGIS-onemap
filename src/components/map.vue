<template>
    <div id="map">
        <el-container class="app-out-pannel">
            <el-header class="sys-header">WebGIS一张图项目系统</el-header>
            <el-container class="app-content-pannel">
                <el-aside class="sys-menu">
                    <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleMenuSelect" :collapse="true"
                        background-color="#606266">
                        <el-menu-item index="1">
                            <i class="el-icon-monitor"></i>
                            <span slot="title">首页信息</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <i class="el-icon-picture-outline"></i>
                            <span slot="title">一张图</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-map-location"></i>
                            <span slot="title">三维展示</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">后台管理</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main class="sys-content">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  
<script>
export default {
    name: 'map',
    methods: {
        handleMenuSelect(index) {
            // console.log(index);
            if (index === '1') {
                //跳转到首页大屏
                this.$router.push('/map');
            } else if (index === '2') {
                //跳转到一张图
                this.$router.push('/map/onemap');
            } else if (index === '3') {
                //跳转到三维展示
                this.$router.push('/map/Tileset');
            } else if (index === '4') {
                //跳转到后台管理
                this.$router.push('/map/user_data');
            }
        },
    },
};
</script> 
  
<style lang="less">
#map {
    // position: relative;
    height: 100%;
    width: 100%;

    .app-out-pannel,
    .app-content-pannel {
        height: 100%;
    }

    .app-content-pannel {
        position: relative;
    }

    .sys-header {
        background-color: #303133;
        line-height: 60px;
        height: 60px;
        color: #fff;
        font-size: 600;
    }

    .sys-menu {
        background-color: #606266;
        width: 60px !important;
        overflow: hidden;
    }

    .sys-content {
        padding: 5px;
    }
}
</style>