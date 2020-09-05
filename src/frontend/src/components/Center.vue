<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" style="background-color: black;">
      <el-row type="flex">
        <el-col :span="2">
          <el-menu-item index="1" @click.native="main" style="color: darksalmon; position: fixed; z-index: 100;">
            <i class="el-icon-s-home"></i>
          </el-menu-item>
        </el-col>
        <el-col :span="20"></el-col>
        <el-col :span="2">
          <el-menu-item index="2">
            {{ userName }}
          </el-menu-item>
        </el-col>
      </el-row>
    </el-menu>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/game_logo.png">
    </div>
    <el-table :data="tableData" class="data_table">
      <el-table-column prop="key" label="">
      </el-table-column>
      <el-table-column prop="value" label=''>
      </el-table-column>
    </el-table>
    <el-button class="main_btn" @click.native="modify" type="primary" round>修改信息</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        loginStatus: false,
        userName: '',
        tableData: [{
          key: '用户名',
          value: ''
        },{
          key: '注册时间',
          value: ''
        },{
          key: '电子邮箱',
          value: ''
        },{
          key: '电话',
          value: ''
        }]
      }
    },
    created () {
      this.$axios({
          methods: "post",
          url: this.HOST + "/user/query/"
        })
        .then((response) => {
          this.userName = response.data[1];
          this.tableData[0].value = response.data[1];
          this.tableData[1].value = response.data[4];
          this.tableData[2].value = response.data[8];
          this.tableData[3].value = response.data[9];
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      main() {
        this.$router.push('/');
      },
      modify() {
        this.$router.push('/center/modify');
      }
    }
  }
</script>
<style scoped>
  .login_logo {
    height: 100%;
  }
  .outer_label {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 200px;
    background: #ffffff; /* 标准的语法 */
    /*background-color: #000099;*/
    text-align: center;
    filter: brightness(1.4);
  }
  .back_label {
    position: absolute;
    top: 200px;
    left: 0;
    width: 100%;
    height: 400px;
    z-index: 0;
    background-image: url("../assets/bg1.jpg");
  }
  .data_table {
    width: 40%;
    margin-left: 30%;
  }
  .main_btn {
    width: 200px;
    font-size: 20px;
    margin-top: 100px;
    background: #d6780d; /* 标准的语法 */
    filter: brightness(1.4);
  }
</style>
