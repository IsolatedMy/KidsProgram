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
          <el-col>
            <el-button class="game_btn_finish" @click.native="level1" v-if="finishStatus[0]" round>1</el-button>
            <el-button class="game_btn" @click.native="level1" v-else-if="unlockStatus[0]" round>1</el-button>
            <el-button class="game_btn_without" @click.native="hint" v-else round>1</el-button>
          </el-col>
          <el-col>
            <el-button class="game_btn_finish" @click.native="level2" v-if="finishStatus[1]" round>2</el-button>
            <el-button class="game_btn" @click.native="level2" v-else-if="unlockStatus[1]" round>2</el-button>
            <el-button class="game_btn_without" @click.native="hint" v-else round>2</el-button>
          </el-col>
          <el-col>
            <el-button class="game_btn_finish" @click.native="level3" v-if="finishStatus[2]" round>3</el-button>
            <el-button class="game_btn" @click.native="level3" v-else-if="unlockStatus[2]" round>3</el-button>
            <el-button class="game_btn_without" @click.native="hint" v-else round>3</el-button>
          </el-col>
          <el-col>
            <el-button class="game_btn_finish" @click.native="level4" v-if="finishStatus[3]" round>4</el-button>
            <el-button class="game_btn" @click.native="level4" v-else-if="unlockStatus[3]" round>4</el-button>
            <el-button class="game_btn_without" @click.native="hint" v-else round>4</el-button>
          </el-col>
          <el-col>
            <el-button class="game_btn_finish" @click.native="level5" v-if="finishStatus[4]" round>5</el-button>
            <el-button class="game_btn" @click.native="level5" v-else-if="unlockStatus[4]" round>5</el-button>
            <el-button class="game_btn_without" @click.native="hint" v-else round>5</el-button>
          </el-col>
          <el-col>
            <el-button class="game_btn_finish" @click.native="level6" v-if="finishStatus[5]" round>6</el-button>
            <el-button class="game_btn" @click.native="level6" v-else-if="unlockStatus[5]" round>6</el-button>
            <el-button class="game_btn_without" @click.native="hint" v-else round>6</el-button>
          </el-col>
        </el-row>
        <div style="margin-top: 10px"></div>
        <span style="position: absolute; top:90%; left: 40%; color: #A9A9AB">版权归属@软工苟命组</span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      activeIndex: '1',
      loginStatus: false,
      max_level: 0,
      unlockStatus: [],
      finishStatus: []
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
    level6() {

    },
    retn() {
      this.$router.go(-1);
    },
    hint() {
      if (!this.loginStatus)
        this.$message.warning("未登录状态下不可试玩该关卡");
      else
        this.$message.warning("请先通关之前的关卡");
    }
  },
  created() {

  },
  mounted() {
    // let authorization = localStorage.getItem('Authorization');
    let localstorage = require('../../static/localstorage');
    let authorization = localstorage.get('Authorization');
    if (authorization)
      this.loginStatus = true;
    else
      this.loginStatus = false;

    if (this.loginStatus) {
      this.$axios({
        method: "post",
        url: this.HOST + "/progress/query/",
        data: ({

        })
      })
      .then((response) => {
        let data = response.data;
        this.max_level = parseInt(data);
        for (let i = 0; i < 6; i = i + 1) {
          if (i < this.max_level) {
            this.unlockStatus[i] = true;
          }
          else {
            this.unlockStatus[i] = false;
          }
          if (i < this.max_level - 1) {
            this.finishStatus[i] = true;
          }
          else {
            this.finishStatus[i] = false;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
    else {
      this.max_level = 1;
      this.unlockStatus[0] = true;
      this.finishStatus[0] = false;
    }
    this.$forceUpdate();
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
    top: 20%;
    right: 0;
    bottom: 0;
    width: 600px; 
    height: 400px;
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
  .game_btn_finish {
    margin-bottom: 20px;
    background-color: greenyellow;
  }
  .game_btn_without {
    margin-bottom: 20px;
    background-color: gray;
  }
  .game_btn {
    margin-bottom: 20px;
  }
  #ret {
    margin-top: 20px;
  }
</style>
