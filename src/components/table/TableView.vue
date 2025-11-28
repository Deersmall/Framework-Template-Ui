<template >

  <template>
    <slot name="querySection">
      <span>sdhjsh</span>
    </slot>
  </template>

  <template>
    <el-table :data="tableData" border >
      <slot v-for="(item, index) in tableSchema">
        <el-table-column :prop="item.field" :label="item.title" :min-width="item.width" />

      </slot>
    </el-table>

  </template>

</template>



<script>
export default {
  name: 'TableView',

  data() {
    return {
      tableSchema:[
          {field: 'date' , title: '时间' , width: '200'},
          {field: 'name' , title: '名称' , width: '200'},
          {field: 'address' , title: '地点' , width: '200'},
          ],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.listTable{
  flex: 6;
  height: 100%;
  width: 98%;
  margin: 5px 0;
}
</style>
