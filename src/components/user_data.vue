<template>
    <div id="userData">
        <el-table :data="tableData" height="100%" border style="width: 100%">
            <el-table-column prop="id" label="ID" width="180">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="180">
            </el-table-column>
            <el-table-column prop="password" label="密码">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { reactive, readonly } from 'vue';

export default {
    data() {
        return {
            tableData: [],
        }
    },
    methods: {
        load() {
            this.axios({
                method: 'post',
                url: 'http://127.0.0.1:3002/api/user/user_data',
                data: this.tableData
            }).then(res => {
                if (res.data.status === '0') {
                    console.log(res.data.tableData)//数据库数据
                    const resData = res.data.tableData;
                    resData.forEach(Element => {
                        this.tableData.push({ id: Element.id, username: Element.uname, password: Element.upwd });
                    })
                    // console.log(this.tableData);
                }
            }).catch(error => {
                console.log(error);
            })
        }
    },
    mounted() {
        this.load();
    }
}
</script>
<style lang="less">
#userData {
    width: 100%;
    height: 100%;
}
</style>