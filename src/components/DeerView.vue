<template>

  <div class="menu-management-container">

    <div class="header">
      <div>
        <h2>{{ menuName }}</h2>
      </div>
      <div class="header-btn">
        <el-divider content-position="right">
          <template v-for="(btn, btnIndex) in btnList">
            <el-button :type="btn.type" @click="btn.click">{{ btn.title }}</el-button>
          </template>
          <el-button :icon="Refresh" circle @click="getList"/>
        </el-divider>
      </div>
    </div>


    <div class="content"
         v-loading="loading"
         element-loading-text="加载中..."
         element-loading-background="rgba(0, 0, 0, 0.3)">

      <slot name="content" />

    </div>

  </div>

</template>

<script>
import {markRaw} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {Delete,Refresh} from '@element-plus/icons-vue';

import {addMenu, getMenuTree, removeMenu, updateById} from "@/api/system/sysMenu.js";

export default {

  name: 'DeerView',

  components: {
    Refresh
  },

  props: {
    menuName: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false
    },
    btnList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      Refresh: Refresh,
    }
  },

  created() {
  },

  computed: {
  },

  methods: {
    getList(records) {
      this.$emit("getList", records);
    },
  },

}
</script>

<style scoped lang="scss">

.menu-management-container {
  padding: 2vh 2vw;
}

.header {
  margin-bottom: 20px;
  padding-bottom: 15px;
  padding: 1em 2em;

  h2 {
    display: flex;
    align-items: center;
    color: #888;
  }
}

.content {
  margin-top: 20px;
}

</style>


