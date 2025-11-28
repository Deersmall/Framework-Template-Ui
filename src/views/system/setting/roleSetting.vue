<template>

  <deer-view menu-name="角色管理" :btn-list="btnList" :loading="loading" @getList="getList()" >
    <template #content>
      <deer-table :data="data" :columns="columns" @handleCurrentChange="handleCurrentChange" >
        <template #handle="{ scope }">
          <el-button size="small" color="#626aef" plain>分配账户</el-button>
          <el-button size="small" color="#00b6ff" plain>分配权限</el-button>
        </template>
      </deer-table>
    </template>
  </deer-view>

</template>

<script>

import DeerView from '@/components/DeerView.vue'
import DeerTable from '@/components/DeerTable.vue'

import { getList } from "@/api/system/sysRole.js";

export default {
  name: 'roleSetting',
  components: {
    DeerView,
    DeerTable,
  },

  data() {
    return {
      loading: false,
      typeTest:'0',

      data: {
        records: [],
        current: 1,
        size: 10,
      },
    }
  },

  created() {
    this.getList();
  },

  computed: {
    btnList() {
      return [
        {
          key:'add',
          type:'success',
          title:'添加',
          click:this.add,
        },
        {
          key:'del',
          type:'danger',
          title:'删除',
          click:this.del,
        },

      ]
    },
    columns() {
      return [
        { type: "selection", width: '50'},
        { type: "index", tiele: '序号', width: '50'},
        { field: "roleName", title: "角色", width: '100'},
        { slots: "status", title: "状态", width: '100'},     // 插槽列
        { slots: "handle", title: "操作", width: '180'},     // 插槽列
      ];
    }
  },

  methods: {
    /** 切换页数 */
    handleCurrentChange(val) {
      this.data.current = val;
      this.getList();
    },

    /** 查询 */
    getList() {
      this.loading = true;
      let data = {
        pageNum: this.data.current,
        pageSize: this.data.size,
      }

      getList(data).then(({data}) => {
        this.data = data;
        this.loading = false;
      }).catch(e => {})
    },
    add() {
      this.typeTest = '1';
    },
    del() {
      this.typeTest = '2';
    },
  }

}
</script>

<style scoped lang="scss">

.menu-management-container {
  padding: 2vh 2vw;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;
  padding: 1em 2em;

  .header-btn {
    display: flex;
  }

  h2 {
    display: flex;
    align-items: center;
    color: #303133;
    margin: 0;
  }

  h2 i {
    margin-right: 10px;
    font-size: 24px;
  }
}

</style>


