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
      <div class="slogan" style="top:20%;left:10%; animation: updown 3s linear 0s infinite normal none;">Make Coding Easy</div>
      <div class="slogan" style="top:60%;left:15%; animation: updown2 4s linear 0s infinite normal none;">All-Ages Friendly</div>
      <div class="slogan" style="top:40%; left:58%; animation: updown3 6s linear 0s infinite normal none;">solve mazes using programming</div>
      <img class="inner_label login_logo" src="../assets/game_logo.png">
    </div>
    <div class="back1">
      <img style= "height: 100%; width:100%;" src="../assets/login_bg1.png">
    </div>
    <div class="back2">
      <img style="width: 100%; height: 100%; top:0;" src="../assets/login_bg2.png">
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
  .back1 {
    position: absolute;
    top: 45%;
    right: 0;
    height: 75%;
    width: 35%;
    z-index: 0;
    background: no-repeat;
  }
  .back2 {
    position: absolute;
    top: 75%;
    left: 0;
    height: 35%;
    width: 40%;
    z-index: 0;
    background: no-repeat;
  }
  .login_logo {
    height: 100%;
  }
  .outer_label {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 200px;
    /*background: #ffffff; /* 标准的语法 */
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
  .slogan {
   position: absolute;
   text-align: center;
   font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
   font-size: 35px;
   color: rgb(187, 55, 15);
   border: 5px solid rgb(187, 55, 15);
   border-radius: 5px;
   margin:2px;
   background-color: none;
 }
  @keyframes updown {
   0%  {top:20%;}
   25% {top:15%;}
   50% {top: 20%;}
   75% {top: 25%;}
   100% {top: 20%;}
 }

  @-o-keyframes updown {
   0%  {top:20%;}
   25% {top:15%;}
   50% {top: 20%;}
   75% {top: 25%;}
   100% {top: 20%;}
 }

  @-moz-keyframes updown {
   0%  {top:20%;}
   25% {top:15%;}
   50% {top: 20%;}
   75% {top: 25%;}
   100% {top: 20%;}
 }

  @-webkit-keyframes updown {
   0%  {top:20%;}
   25% {top:15%;}
   50% {top: 20%;}
   75% {top: 25%;}
   100% {top: 20%;}
 }

  @keyframes updown2 {
   0%  {top:60%;}
   25% {top:55%;}
   50% {top: 60%;}
   75% {top: 65%;}
   100% {top: 60%;}
 }

  @-o-keyframes updown2 {
   0%  {top:60%;}
   25% {top:55%;}
   50% {top: 60%;}
   75% {top: 65%;}
   100% {top: 60%;}
 }

  @-moz-keyframes updown2 {
   0%  {top:60%;}
   25% {top:55%;}
   50% {top: 60%;}
   75% {top: 65%;}
   100% {top: 60%;}
 }

  @-webkit-keyframes updown2 {
   0%  {top:60%;}
   25% {top:55%;}
   50% {top: 60%;}
   75% {top: 65%;}
   100% {top: 60%;}
 }

 @keyframes updown3 {
   0%  {top:40%; left:58%;}
   25% {top:35%; left:60%;}
   50% {top:40%; left:58%;}
   75% {top:45%;left:59%;}
   100% {top:40%;left:58%;}
 }

 @-o-keyframes updown3 {
   0%  {top:40%; left:58%;}
   25% {top:35%; left:60%;}
   50% {top:40%; left:58%;}
   75% {top:45%;left:59%;}
   100% {top:40%;left:58%;}
 }

 @-moz-keyframes updown3 {
   0%  {top:40%; left:58%;}
   25% {top:35%; left:60%;}
   50% {top:40%; left:58%;}
   75% {top:45%;left:59%;}
   100% {top:40%;left:58%;}
 }

 @-webkit-keyframes updown3 {
  0%  {top:40%; left:58%;}
   25% {top:35%; left:60%;}
   50% {top:40%; left:58%;}
   75% {top:45%;left:59%;}
   100% {top:40%;left:58%;}
 }
</style>
