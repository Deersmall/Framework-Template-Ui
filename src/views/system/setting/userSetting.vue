<template>
  <div>

    <div>
      <ConfirmDialog group="headless">
        <template #container="{ message, acceptCallback, rejectCallback }">
          <div class="flex flex-col items-center p-8 bg-surface-0 dark:bg-surface-900 rounded" style="width: 400px">
            <div class="rounded-full bg-primary text-primary-contrast inline-flex justify-center items-center h-24 w-24 -mt-20">
              <img class="rounded-full h-24 w-24" src="@/assets/images/touxiang.png">
            </div>
            <span class="font-bold text-2xl block mb-2 mt-6">{{ message.header }}</span>
            <Password class="block mb-2 mt-2" v-model="formData.password" toggleMask :promptLabel="message.message" weakLabel="弱" mediumLabel="中" strongLabel="强" />
            <div class="flex items-center gap-2 mb-2 mt-12">
              <Button label="确认" @click="acceptCallback" class="w-32 block mb-2 mt-6"></Button>
              <Button label="取消" variant="outlined" @click="rejectCallback" class="w-32 block mb-2 mt-6"></Button>
            </div>
          </div>
        </template>
      </ConfirmDialog>
    </div>


    <deer-view :loading="loading" menu-name="用户管理" :btn-list="btnList"
               :is-query-form="true" :query-form="queryForm" :query-columns="queryColumns"
               @getList="getList" @handleQuery="handleQuery" @handleReset="handleReset" >
      <template #content>
        <deer-table :data="data" :columns="tableColumns" @handleSelectionChange="handleSelectionChange" @handleCurrentChange="handleCurrentChange" >
          <template #handle="{ scope }">
            <el-button v-permission="'role:edit'" size="small" type="success"  plain @click="handleUpd(scope.row)">修改信息</el-button>
            <el-button v-permission="'role:edit'" size="small" color="#626aef" plain @click="ResetPassword(scope.row)">重置密码</el-button>
          </template>
        </deer-table>
      </template>
    </deer-view>
  </div>

  <!--  添加角色弹窗-->
  <Dialog v-model:visible="dialogVisible" :header="dialogTitle" modal style="width: 60vw;"  @hide="close" >
    <deer-form ref="deerForm" :form-data="formData" :form-columns="formColumns" :form-rules="formRules" />

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </span>
    </template>
  </Dialog>


</template>

<script>

import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';

import Password from 'primevue/password';



import {getUser, add, upd, del, updatePassword } from "@/api/system/sysUser";
import {ElMessage} from "element-plus";


export default {
  name: 'userSetting',
  components: {
    Button,
    Dialog,
    ConfirmDialog,
    Password
  },


  data() {
    return {

      /** region 主要内容 */

      loading: false,

      ids: [],

      queryForm: {
        userName: '',
        nickName: '',
        status: '',
        pageNum: 1,
        pageSize: 10,
      },

      data: {},

      /** endregion 主要内容 */

      /** region 添加角色弹窗设置 */

      // 标题
      dialogTitle: '',
      // 开关
      dialogVisible: false,
      passwordType: false,

      // 表单数据
      formData: {},
      // 表单验证
      formRules: {
        userName: [ { required: true, message: '请输入用户账号', trigger: 'blur' } ],
        nickName: [ { required: true, message: '请输入用户昵称', trigger: 'blur' } ],
        password: [ { required: true, message: '请输入账号密码', trigger: 'blur' } ],
        status: [ { required: true, message: '请选择是否启用', trigger: 'blur' } ],
      },

      /** endregion 添加角色弹窗设置 */

    }
  },

  created() {
    this.initializeData()
    this.getList();
  },

  computed: {
    btnList() {
      return [
        {
          key:'add',
          type:'success',
          title:'添加',
          click:this.handleAdd,
          permission:"user:add",
        },
        {
          key:'del',
          type:'danger',
          title:'删除',
          click:this.handleDel,
          permission:"user:del",
        },

      ]
    },
    queryColumns() {
      return [
        {type: 'input', label: '账号', prop: 'userName', placeholder: '请输入账号', required: false, span: 6},
        {type: 'input', label: '昵称', prop: 'nickName', placeholder: '请输入昵称', required: false, span: 6},
        {type: 'select', label: '状态', prop: 'status', options: [{ label: '启用', value: 0 }, { label: '禁用', value: 1 }], span: 6},
      ];
    },
    tableColumns() {
      return [
        { type: "selection", width: '50'},
        { type: "index", title: '序号', width: '50'},
        { field: "userName", title: "账号", width: '100'},
        { field: "nickName", title: "昵称", width: '100'},
        { slots: "status", title: "状态", width: '50'},     // 插槽列
        { field: "remark", title: "备注", width: '100'},
        { slots: "handle", title: "操作", width: '180'},     // 插槽列
      ];
    },
    formColumns() {
      return [
        {type: 'input', label: '账号', prop: 'userName', placeholder: '请输入账号', span: 12},
        {type: 'input', label: '昵称', prop: 'nickName', placeholder: '请输入昵称', span: 12},
        // {type: 'input', label: '密码', prop: 'password', placeholder: '请输入密码', span: 12},
        {type: 'radio', label: '状态', prop: 'status', options: [{ label: '启用', value: 0 }, { label: '禁用', value: 1 }], span: 12},
        {type: 'input', label: '备注', prop: 'remark', placeholder: '请输入备注', span: 12},
      ];
    },
  },

  methods: {

    /** 初始化数据 */
    initializeData() {
    },

    /** 选中数据 */
    handleSelectionChange(val) {
      this.ids = val.map((item) => item.userId);
    },

    /** 切换页数 */
    handleCurrentChange(val) {
      this.queryForm.pageNum = val;
      this.getList();
    },

    /** 查询 */
    getList() {
      this.loading = true;

      getUser(this.queryForm).then(({data}) => {
        this.data = data;
        this.loading = false;
      }).catch(e => {})
    },

    /** 查询按钮点击事件 */
    handleQuery() {
      this.queryForm.pageNum = 1;
      this.queryForm.pageSize = 10;

      this.getList();
    },

    /** 重置按钮点击事件 */
    handleReset() {
      this.queryForm = {
        userName: '',
        nickName: '',
        status: '',
        pageNum: 1,
        pageSize: 10,
      }
      this.getList();
    },


    /** 新增按钮点击事件 */
    handleAdd() {
      this.formColumns = []

      this.dialogTitle = '添加用户'
      this.dialogVisible = true;
    },

    /** 修改按钮点击事件 */
    handleUpd(data) {
      this.formData = data

      this.dialogTitle = '修改用户'
      this.dialogVisible = true;
    },

    /** 删除按钮点击事件 */
    handleDel() {
      let ids = this.ids;
      if (ids.length) {
        del(ids).then(res => {
          this.getList();
        }).catch(err => {})
      }
    },

    /** 新增 || 修改 */
    saveOrUpdate() {
      this.$refs.deerForm.validate().then(isValid => {
        // 表单校验
        if (isValid) {
          // 深拷贝表单对象 formData 不修改原数据
          let data = JSON.parse(JSON.stringify(this.formData));

          if (data.userId){
            /** 修改 */
            upd(data).then(res => {
              ElMessage.success('修改成功');
              this.close();
              this.getList();
            }).catch(err => {})
          }else {
            /** 新增 */
            add(data).then(res => {
              ElMessage.success('添加成功');
              this.close();
              this.getList();
            }).catch(err => {})
          }
        }
      }).catch(error => {
        ElMessage.error("表单验证未通过，请确认表单信息")
      });
    },

    ResetPassword(row){
      this.formData = row
      this.formData.password = ''
      this.$confirm.require({
          group: 'headless',
        header: '重置密码',
        message: '请输入账号为：' + row.userName + '的新密码',
        accept: () => {
          // 确认后事件
          updatePassword(this.formData).then(row => {
            ElMessage.success('修改成功');
          }).catch(err => {})
        },
        reject: () => {
          // 取消后事件
          this.formData = {};
        }
      });
    },

    /** 弹窗取消方法 */
    close() {
      this.formData = {};
      this.dialogVisible = false;
      this.selectedData = [];
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

.queryFormBtn{
  display: flex;
  justify-content: flex-end;
  margin-right: 3vw;
}

</style>
