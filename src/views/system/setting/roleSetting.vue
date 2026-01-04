<template>

  <div>
    <deer-view :loading="loading" menu-name="角色管理" :btn-list="btnList"
               :is-query-form="true" :query-form="queryForm" :query-columns="queryColumns"
               @getList="getList" @handleQuery="handleQuery" @handleReset="handleReset" >
      <template #content>
        <deer-table :data="data" :columns="tableColumns" @handleSelectionChange="handleSelectionChange" @handleCurrentChange="handleCurrentChange" >
          <template #handle="{ scope }">
            <el-button v-permission="'role:edit'" size="small" type="success" plain @click="handleUpd(scope.row)">修改</el-button>
            <el-button v-permission="'role:assignAccounts'" size="small" color="#626aef" plain @click="assignAccounts(scope.row)">分配账户</el-button>
            <el-button v-permission="'role:assignPermissions'" size="small" color="#0079ff" plain @click="assignPermissions(scope.row)">分配权限</el-button>
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

<!--  分配用户-->
  <Dialog v-model:visible="dialogVisible2" :header="dialogTitle2" modal style="width: 70vw;"  @hide="close" >
    <div>
      <deer-form :form-data="userQueryForm" :form-columns="userQueryColumns" >
        <template #actions>
          <div class="queryFormBtn">
            <el-button type="primary" @click="handleQuery2(userQueryForm)">查询</el-button>
            <el-button @click="handleReset2">重置</el-button>
          </div>
        </template>
      </deer-form>
    </div>
    <deer-table :data="userOptions" :columns="userTableColumns" :border="false" @handleCurrentChange="handleCurrentChange" >
      <template #handle="{ scope }">
        <el-button v-if="!roleBoundUser.includes(scope.row.userId)" size="small" type="success" plain @click="bindUser(scope.row)">绑定</el-button>
        <el-button v-else size="small" type="danger" plain @click="unBindUser(scope.row)">解绑</el-button>
      </template>
    </deer-table>
  </Dialog>


<!--  分配权限-->
  <Dialog v-model:visible="dialogVisible3" :header="dialogTitle3" modal style="width: 45rem;"  @hide="close" >
    <el-cascader-panel v-model="selectedData" :options="menuOptions" :props="cascaderProps" />

    <template #footer>
        <span class="dialog-footer">
          <el-button @click="close">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdate2">确 定</el-button>
        </span>
    </template>
  </Dialog>

</template>

<script>


import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

import {getPage, add, upd, del, getRoleMenus, getRoleBoundUser, assignPermissions} from "@/api/system/sysRole.js";
import {ElMessage} from "element-plus";
import {getMenuTree} from "@/api/system/sysMenu";
import {getAllUser} from "@/api/system/sysUser";

export default {
  name: 'roleSetting',
  components: {
    Button,
    Dialog,
  },

  data() {
    return {

      dialogTitle2:'',
      dialogVisible2:false,
      roleBoundUser:[],
      userOptions:[],
      userQueryForm: {
        userName:'',
        nickName:'',
        pageNum: 1,
        pageSize: 10,
      },

      /** region 主要内容 */

      loading: false,

      ids: [],

      queryForm: {
        roleName: '',
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

      // 表单数据
      formData: {},
      // 表单验证
      formRules: {
        roleName: [ { required: true, message: '请输入角色名称', trigger: 'blur' } ],
        status: [ { required: true, message: '请选择是否启用', trigger: 'blur' } ],
      },

      /** endregion 添加角色弹窗设置 */

      /** region 分配菜单/权限 弹窗设置 */

      // 标题
      dialogTitle3: '',
      // 开关
      dialogVisible3: false,

      cascaderProps: {
        multiple: true, // 多选
        emitPath: false, // 不返回路径
        checkStrictly: true, // 父子不严格关联
        value: 'menuId',
        label: 'menuName',
        children: 'children'
      },

      selectedData: [],
      menuOptions: [],

      /** endregion 分配菜单/权限 弹窗设置 */

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
          permission:"role:add",
        },
        {
          key:'del',
          type:'danger',
          title:'删除',
          click:this.handleDel,
          permission:"role:del",
        },

      ]
    },
    queryColumns() {
      return [
        {type: 'input', label: '角色', prop: 'roleName', placeholder: '请输入角色', required: false, span: 6},
        {type: 'select', label: '状态', prop: 'status', options: [{ label: '启用', value: 0 }, { label: '禁用', value: 1 }], span: 6},
      ];
    },
    userQueryColumns() {
      return [
        {type: 'input', label: '账号', prop: 'userName', placeholder: '请输入账号', required: false, span: 6},
        {type: 'input', label: '昵称', prop: 'nickName', placeholder: '请输入昵称', required: false, span: 6},
      ];
    },
    tableColumns() {
      return [
        { type: "selection", width: '50'},
        { type: "index", title: '序号', width: '50'},
        { field: "roleName", title: "角色", width: '100'},
        { slots: "status", title: "状态", width: '50'},     // 插槽列
        { field: "remark", title: "备注", width: '100'},
        { slots: "handle", title: "操作", width: '180'},     // 插槽列
      ];
    },
    userTableColumns() {
      return [
        { type: "index", title: '序号', width: '50'},
        { field: "userName", title: "账号", width: '100'},
        { field: "nickName", title: "昵称", width: '100'},
        { slots: "handle", title: "操作", width: '180'},     // 插槽列
      ];
    },
    formColumns() {
      return [
        {type: 'input', label: '角色', prop: 'roleName', placeholder: '请输入角色', span: 12},
        {type: 'radio', label: '状态', prop: 'status', options: [{ label: '启用', value: 0 }, { label: '禁用', value: 1 }], span: 12},
        {type: 'input', label: '备注', prop: 'remark', placeholder: '请输入备注', span: 12},
      ];
    },
  },

  methods: {

    /** 初始化数据 */
    initializeData() {
      // 获取菜单树
      getMenuTree().then(({data}) => {
        this.menuOptions = data;
      }).catch(e => {})
    },

    /** 选中数据 */
    handleSelectionChange(val) {
      this.ids = val.map((item) => item.roleId);
    },

    /** 切换页数 */
    handleCurrentChange(val) {
      this.queryForm.pageNum = val;
      this.getList();
    },

    /** 查询 */
    getList() {
      this.loading = true;

      getPage(this.queryForm).then(({data}) => {
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

    async handleQuery2() {
      this.userQueryForm.pageNum = 1;
      this.userQueryForm.pageSize = 10;

      this.userOptions = (await getAllUser(this.userQueryForm)).data
    },

    /** 重置按钮点击事件 */
    handleReset() {
      this.queryForm = {
        roleName: '',
        status: '',
        pageNum: 1,
        pageSize: 10,
      }
      this.getList();
    },

    async handleReset2() {
      this.userQueryForm = {
        userName:'',
        nickName:'',
        pageNum: 1,
        pageSize: 10,
      }
      this.userOptions = (await getAllUser(this.userQueryForm)).data
    },

    /** 新增按钮点击事件 */
    handleAdd() {
      this.dialogTitle = '添加角色'
      this.dialogVisible = true;
    },

    /** 修改按钮点击事件 */
    handleUpd(data) {
      this.formData = data

      this.dialogTitle = '修改角色'
      this.dialogVisible = true;
    },

    /** 删除按钮点击事件 */
    handleDel() {
      let ids = this.ids;
      if (ids) {
        del(ids).then(res => {
          this.getList();
        }).catch(err => {})
      }
    },

    /** 分配用户按钮点击事件 */
    async assignAccounts(data) {
      // 查询用户
      this.userOptions = (await getAllUser(this.userQueryForm)).data
      // 查询角色已绑定用户
      this.roleBoundUser = (await getRoleBoundUser(data)).data || [];

      this.dialogTitle2 = '分配用户'
      this.dialogVisible2 = true;
    },

    /** 分配权限按钮点击事件 */
    assignPermissions(data) {
      this.formData = data

      getRoleMenus(data).then(({data}) => {
        this.selectedData = data;
        this.dialogTitle3 = '分配菜单/权限'
        this.dialogVisible3 = true;
      }).catch(err => {});
    },

    /** 绑定用户 */
    bindUser(data) {
    },

    /** 解绑用户 */
    unBindUser(data) {

    },

    /** 新增 || 修改 */
    saveOrUpdate() {
      this.$refs.deerForm.validate().then(isValid => {
        // 表单校验
        if (isValid) {
          // 深拷贝表单对象 formData 不修改原数据
          let data = JSON.parse(JSON.stringify(this.formData));

          if (data.roleId){
            /** 修改 */
            upd(data).then(res => {
              this.close();
              this.getList();
            }).catch(err => {})
          }else {
            /** 新增 */
            add(data).then(res => {
              this.close();
              this.getList();
            }).catch(err => {})
          }
        }
      }).catch(error => {
        ElMessage.error("表单验证未通过，请确认表单信息")
      });
    },

    saveOrUpdate2() {
      let roleId = this.formData.roleId;
      let selectedData = this.selectedData.map(item => item);

      let data = {
        roleId: roleId,
        menuIds: selectedData
      }

      assignPermissions(data).then(res => {
        this.getList();
        this.close();
      }).catch(err => {})
    },

    /** 弹窗取消方法 */
    close() {
      this.formData = {};
      this.dialogVisible = false;
      this.dialogVisible2 = false;
      this.dialogVisible3 = false;
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
