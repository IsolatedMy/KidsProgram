<template>
  <div>
    <el-carousel ref="carousel" :autoplay="false" indicator-position="outside" arrow="always" height="900px">
      <el-carousel-item>
        <img src="../../assets/tutorial-1.png" height="500px" width="80%" @click="setActiveItem(0)"/>
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/tutorial-2.png" height="500px" width="80%" @click="setActiveItem(1)"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  methods: {
    setActiveItem(index) {
      if (index == 0) {
        this.$refs.carousel.setActiveItem(1)
      } else if (index == 1) {
        this.$router.push('/game/level1');
      }
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
