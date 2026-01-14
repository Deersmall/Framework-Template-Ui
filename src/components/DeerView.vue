<template>

  <div class="menu-management-container">

    <div class="header">
<!--      菜单名称-->
      <div>
        <h2>{{ menuName }}</h2>
      </div>

<!--      功能按钮-->
      <div class="header-btn">
        <el-divider class="divider" content-position="right">
          <template v-for="(btn, btnIndex) in btnList">
            <el-button v-permission="btn.permission" :type="btn.type" @click="btn.click">{{ btn.title }}</el-button>
          </template>
<!--          <el-button :icon="Refresh" circle @click="getList"/>-->
          <Button style="margin-left: 2vw" icon="pi pi-spin pi-sync" severity="contrast" rounded variant="outlined" aria-label="Star" size="small" @click="getList" />
        </el-divider>
      </div>

<!--      条件查询-->
      <div v-if="isQueryForm" class="header-query">
        <deer-form :form-data="queryForm" :form-columns="queryColumns" >
          <template #actions>
            <div class="queryFormBtn">
              <el-button type="primary" @click="handleQuery(queryForm)">查询</el-button>
              <el-button @click="handleReset">重置</el-button>
            </div>
          </template>
        </deer-form>
      </div>
    </div>

<!--    菜单内容-->
    <div class="content"
         v-loading="loading"
         element-loading-text="加载中..."
         element-loading-background="rgba(0, 0, 0, 0.3)">

<!--      内容插槽-->
      <slot name="content" />

    </div>

  </div>

</template>

<script>
import {Delete,Refresh} from '@element-plus/icons-vue';
import Button from 'primevue/button';


export default {

  name: 'DeerView',

  components: {
    Delete,
    Refresh,
    Button
  },

  props: {
    loading: {
      type: Boolean,
      default: false
    },
    menuName: {
      type: String,
      default: "",
    },
    btnList: {
      type: Array,
      default: () => [],
    },
    isQueryForm: {
      type: Boolean,
      default: false
    },
    queryForm: {
      type: Object,
      default: () => {},
    },
    queryColumns: {
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
    // 刷新按钮点击事件
    getList(records) {
      this.$emit("getList", records);
    },
    // 查询按钮点击事件
    handleQuery(records) {
      this.$emit("handleQuery", records);
    },
    // 重置按钮点击事件
    handleReset(records) {
      this.$emit("handleReset", records);
    },
  },

}
</script>

<style scoped lang="scss">

.menu-management-container {
  padding: 2vh 2vw;
}

.header {

  h2 {
    display: flex;
    align-items: center;
    color: #888;
  }

  ::v-deep .header-btn {
    .divider {
      .el-divider__text {
        background-color: #ffffff00 !important;

        .el-button {
          margin-left: 3vw;
        }
      }
    }
  }

  ::v-deep .header-query {
    margin: 2vw 1vh 1vh 1vh;
    padding: 1%;
    background-color: #ffffff6a;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 5px 5px 10px rgba(0, 0, 0, .2);

    .queryFormBtn{
      display: flex;
      justify-content: flex-end;
      margin-right: 3vw;
    }

    .el-input {
      --el-input-bg-color: #ffffff00 !important;
    }
  }
}

.content {
  margin-top: 2vh;
}

</style>


