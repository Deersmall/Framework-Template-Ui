<template>
  <div class="Deer">

    <div class="DeerTable">
      <el-table :data="data.records" :border="border" table-layout="fixed" @selection-change="handleSelectionChange">

        <el-table-column
            v-if="columns"
            v-for="item in columns"
            :key="item.field || item.type || item.slots"
            :type="item.type"
            :prop="item.field"
            :label="item.title"
            :min-width="item.width">

          <!-- 插槽列 -->
          <template v-if="item.slots" #default="scope">
            <slot :name="item.slots" :scope="scope" :$index="scope.$index"></slot>
<!--            <slot :name="item.slots" :scope="scope"> </slot>-->
          </template>

          <!-- 状态插槽列 -->
          <template v-if="item.slots === 'status'" #default="scope">
            <el-tag :type="scope.row.status === 0 ? 'success' : 'danger'">
              {{ scope.row.status === 0 ? '启用' : '禁用' }}
            </el-tag>
          </template>

        </el-table-column>

      </el-table>
    </div>

    <div class="DeerTablePage">
<!--      <el-pagination background layout="prev, pager, next" :current-page.sync="pageNum" :total="data.length" />-->
      <el-pagination
          @current-change="handleCurrentChange"
          :current-page="data.current"
          :page-sizes="[10, 20, 50]"
          :page-size="data.size"
          layout="prev, pager, next, jumper , total"
          :total="data.total"
          background />
    </div>

  </div>
</template>


<script>
export default {
  name: 'DeerTable',

  props: {
    border:{
      type:Boolean,
      default: true,
    },
    data: {
      type: Object,
      default: () => {},
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },


  watch: {},

  data() {
    return {
      pageNum: 1,
    };
  },

  created() {},

  methods:{
    handleSelectionChange(records) {
      this.$emit("handleSelectionChange", records);
    },
    handleCurrentChange(records) {
      this.$emit("handleCurrentChange", records);
    },
  },

}

</script>

<style lang="scss" scope>

  .Deer {

    margin: 1%;
    padding: 1%;
    background-color: #ffffff6a;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 5px 5px 10px rgba(0, 0, 0, .2);

    .DeerTable {
      height: 49vh;
      margin-top: 2vh;

      .el-table {
        --el-table-bg-color: #ffffff00 !important;
        --el-table-header-bg-color: #ffffff00 !important;
        --el-table-tr-bg-color: #ffffff00 !important;

        --el-table-border-color: #dddddd !important;
      }

     }




    .DeerTablePage {
      display: flex;
      align-items: center;
      justify-content: center;

      margin-bottom: 1vh;
    }

  }

</style>
