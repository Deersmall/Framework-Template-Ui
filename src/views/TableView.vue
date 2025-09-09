<template>
  <div class="mainBodyOfHome">
    <!--    数据展示-->
    <div class="dataDisplayOfHome">
      <el-button round>Round</el-button>
      <el-button type="primary" round>Primary</el-button>
      <el-button type="success" round>Success</el-button>
      <el-button type="info" round>Info</el-button>
      <el-button type="warning" round>Warning</el-button>
      <el-button type="danger" round>Danger</el-button>
    </div>
    <!--        数据可视化区域-->
    <div class="visualizationOfHome">
      <ranks-list class="ranks-list"></ranks-list>
    </div>

  </div>

</template>

<script>

import request from "@/utils/request";
import RanksList from "@/views/tableViews/RanksList";

export default {
  name: 'TableView',
  components: {RanksList},

  data(){
    return {
    }
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
.mainBodyOfHome{
  display: flex;
  width: 100%;
  height: 100%;
  //background-image: radial-gradient(circle farthest-side at 10% 90%, #f8e2e4, #f0e2fd 70%, #d9e2ef);
  background-image: radial-gradient(circle farthest-side at 0% 80%, #f1faff, #e9d9f8 60%, #efe7fa);
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.dataDisplayOfHome{
  //flex: 3;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: center;
  padding: 5vh 2.5vw 2vh 2.5vw;
}
.visualizationOfHome{
  flex: 6;
  width: 95%;
  margin: 20px 0;
  border-radius: 25px;
  background-color: #ffffff;
  box-shadow: 2px 2px 15px #bbb;

}

</style>
