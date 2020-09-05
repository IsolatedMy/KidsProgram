<template>
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-row type="flex">
        <el-col :span="2">
          <el-menu-item index="1" @click.native="main">
            <i class="el-icon-s-home"></i>
          </el-menu-item>
        </el-col>
        <el-col :span="20"></el-col>
        <el-col :span="2">
          <el-menu-item index="2">

          </el-menu-item>
        </el-col>
      </el-row>
    </el-menu>
    <div class="outer_label">
      <img class="inner_label login_logo" src="../assets/game_logo.png">
    </div>
    <div class="login_form">
      <div>
        <el-row type="flex">
          <el-col><el-button class="game_btn" @click.native="level1" round>1</el-button></el-col>
          <el-col>
            <el-button class="game_btn" @click.native="level2" v-if="loginStatus" round>2</el-button>
            <el-button class="game_btn_without" @click.native="hint" v-else round>2</el-button>
          </el-col>
          <el-col>
            <el-button class="game_btn" @click.native="level3" v-if="loginStatus" round>3</el-button>
            <el-button class="game_btn_without" @click.native="hint" v-else round>3</el-button>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col>
            <el-button class="game_btn" @click.native="level4" v-if="loginStatus" round>4</el-button>
            <el-button class="game_btn_without" @click.native="hint" v-else round>4</el-button>
          </el-col>
          <el-col>
            <el-button class="game_btn" @click.native="level5" v-if="loginStatus" round>5</el-button>
            <el-button class="game_btn_without" @click.native="hint" v-else round>5</el-button>
          </el-col>
          <el-col><el-button class="game_btn" :disabled="!loginStatus" round>6</el-button></el-col>
        </el-row>
        <div style="margin-top: 10px"></div>
        <span style="float: right;color: #A9A9AB">版权归属@软工苟命组</span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activeIndex: '1',
      loginStatus: false
    }
  },
  methods: {
    main() {
      this.$router.push('/');
    },
    back() {
      this.$router.push(-1);
    },
    level1() {
      this.$router.push('/game/level1');
    },
    level3() {
      this.$router.push('/game/level3');
    },
    level4() {
      this.$router.push('/game/level4');
    },
    level2() {
      this.$router.push('/game/level2');
    },
    level5() {
      this.$router.push('/game/level5');
    },
    retn() {
      this.$router.go(-1);
    },
    hint() {
      this.$message.warning("未登录状态下不可试玩该关卡");
    }
  },
  created() {

  },
  mounted() {
    let authorization = localStorage.getItem('Authorization');
    if (authorization)
      this.loginStatus = true;
    else
      this.loginStatus = false;
  }
}
</script>

<style scoped>
  .row-bg {
    position:relative;
    right: 150%;
  }
  .login_logo {
    height: 100%;
  }
  .login_form {
    position: relative;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 600px; height: 400px;
    margin: auto;
    z-index: 1;
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
  .game_btn {
    margin-bottom: 20px;
  }
  .game_btn_without {
    margin-bottom: 20px;
    background-color: gray;
  }
  #ret {
    margin-top: 20px;
  }
</style>
