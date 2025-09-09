<template>

  <div class="menu-management-container">

    <div class="header">
      <div>
        <h2><i class="el-icon-menu"></i> 菜单管理</h2>
      </div>
      <div class="header-btn">
        <el-button type="primary" @click="addTopLevelMenu">添加目录</el-button>
        <el-button :icon="Refresh" circle @click="getMenuTree"/>
      </div>
    </div>

    <div class="menu-list"
         v-loading="loading"
         element-loading-text="加载中..."
         element-loading-background="rgba(0, 0, 0, 0.05)">
      <!-- 一级菜单 -->
      <el-collapse accordion>
        <el-collapse-item
            v-for="(menu, index) in sortedMenus"
            :key="menu.menuId"
            :name="menu.menuName"
            class="first-level-item"
        >
          <template #title>
            <div class="menu-header">
              <div class="menu-info">
                <el-tag type="success" size="small" class="menu-type">目录</el-tag>
                <span class="menu-title">{{ menu.menuName }}</span>
                <span class="menu-path">{{ menu.path }}</span>
                <el-tag :type="menu.status === 0 ? '' : 'danger'" size="small" class="menu-order">状态: {{ menu.status === 0 ? '启用' : '禁用' }}</el-tag>
                <el-tag type="info" size="small" class="menu-order">排序: {{ menu.orderNum }}</el-tag>
              </div>
              <div class="menu-actions" @click.stop>
                <el-button size="small" icon="el-icon-plus" @click="addSecondLevelMenu(menu)">添加菜单</el-button>
                <el-button size="small" icon="el-icon-edit" @click="editMenu(menu)">编辑</el-button>
                <el-button size="small" icon="el-icon-delete" type="danger" @click="deleteMenu(menu, index)">删除</el-button>
              </div>
            </div>
          </template>

          <div class="menu-content">
            <!-- 二级菜单 -->
            <el-collapse accordion v-if="menu.children && menu.children.length">
              <el-collapse-item
                  v-for="(secondMenu, secondIndex) in sortedChildren(menu.children)"
                  :key="secondMenu.menuId"
                  :name="secondMenu.menuName"
                  class="second-level-item"
              >
                <template #title>
                  <div class="menu-header">
                    <div class="menu-info">
                      <el-tag size="small" class="menu-type">菜单</el-tag>
                      <span class="menu-title">{{ secondMenu.menuName }}</span>
                      <span class="menu-path">{{ secondMenu.path }}</span>
                      <el-tag :type="secondMenu.status === 0 ? '' : 'danger'" size="small" class="menu-order">状态: {{ secondMenu.status === 0 ? '启用' : '禁用' }}</el-tag>
                      <el-tag type="info" size="small" class="menu-order">排序: {{ secondMenu.orderNum }}</el-tag>

                    </div>
                    <div class="menu-actions" @click.stop>
                      <el-button size="small" icon="el-icon-plus" @click="addThirdLevelMenu(menu, secondMenu)">添加权限</el-button>
                      <el-button size="small" icon="el-icon-edit" @click="editMenu(secondMenu, menu)">编辑</el-button>
                      <el-button size="small" icon="el-icon-delete" type="danger" @click="deleteSecondLevelMenu(menu, secondIndex)">删除</el-button>
                    </div>
                  </div>
                </template>

                <div class="menu-content">
                  <!-- 三级菜单 -->
                  <div v-if="secondMenu.children && secondMenu.children.length" class="third-level-list">
                    <div
                        v-for="(thirdMenu, thirdIndex) in sortedChildren(secondMenu.children)"
                        :key="thirdMenu.menuId"
                        class="third-level-item"
                    >
                      <div class="menu-header">
                        <div class="menu-info">
                          <el-tag size="small" class="menu-type">权限</el-tag>
                          <span class="menu-title">{{ thirdMenu.menuName }}</span>
                          <span class="menu-path">{{ thirdMenu.permission }}</span>
                          <el-tag :type="thirdMenu.status === 0 ? '' : 'danger'" size="small" class="menu-order">状态: {{ thirdMenu.status === 0 ? '启用' : '禁用' }}</el-tag>
                          <el-tag type="info" size="small" class="menu-order">排序: {{ thirdMenu.orderNum }}</el-tag>
                        </div>
                        <div class="menu-actions">
                          <el-button size="small" icon="el-icon-edit" @click="editMenu(thirdMenu, secondMenu, menu)">编辑</el-button>
                          <el-button size="small" icon="el-icon-delete" type="danger" @click="deleteThirdLevelMenu(menu, secondIndex, thirdIndex)">删除</el-button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-else class="empty-menu">
                    <i class="el-icon-folder-opened"></i>
                    <p>暂无三级菜单</p>
                    <el-button size="small" icon="el-icon-plus" @click="addThirdLevelMenu(menu, secondMenu)">添加三级菜单</el-button>
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>

            <div v-else class="empty-menu">
              <i class="el-icon-folder-opened"></i>
              <p>暂无二级菜单</p>
              <el-button size="small" icon="el-icon-plus" @click="addSecondLevelMenu(menu)">添加二级菜单</el-button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>

      <div v-if="menus.length === 0" class="empty-menu main-empty">
        <i class="el-icon-folder-opened"></i>
        <p>暂无菜单项</p>
        <el-button type="primary" icon="el-icon-plus" @click="addTopLevelMenu">添加顶级菜单</el-button>
      </div>
    </div>

    <!-- 添加/编辑菜单对话框 -->
    <el-dialog
        :title="dialogTitle"
        v-model="dialogVisible"
        width="500px"
        :close-on-click-modal="false" >

      <el-form :model="currentMenu" label-width="80px" :rules="formRules" ref="menuFormRef" >

        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="currentMenu.menuName" placeholder="请输入菜单名称"></el-input>
        </el-form-item>

        <el-form-item label="路由路径" prop="path" v-if="isMenuType">
          <el-input v-model="currentMenu.path" placeholder="请输入路由路径，如：/Deer"></el-input>
        </el-form-item>

        <el-form-item label="权限字符" prop="permission" v-if="!isMenuType">
          <el-input v-model="currentMenu.permission" placeholder="请输入权限字符，如：Deer:test"></el-input>
        </el-form-item>

        <el-form-item label="菜单状态" prop="status">
          <el-radio-group v-model="currentMenu.status">
            <el-radio-button :label= "0">启用</el-radio-button>
            <el-radio-button :label= "1">禁用</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="排序号" prop="orderNum">
          <el-input-number v-model="currentMenu.orderNum" :min="1" :max="100"></el-input-number>
        </el-form-item>

      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveMenu">确 定</el-button>
        </span>
      </template>

    </el-dialog>

  </div>

</template>

<script>

import {addMenu, getMenuTree, removeMenu, updateById} from "@/api/system/sysMenu.js";
import {ElMessage, ElMessageBox} from "element-plus";
import {markRaw} from "vue";

import {Delete,Refresh} from '@element-plus/icons-vue';


export default {
  name: 'SettingView',
  components: {
    Refresh
  },
  data() {
    return {
      Refresh: Refresh,
      loading: true,
      // menuFormRef: null,
      // 是否显示弹出框
      dialogVisible: false,
      // 编辑模式
      isEditing: false,
      // 弹出框类型
      isMenuType: true,
      // 弹出框表单数据
      currentMenu: {
        menuId: null,
        menuName: '',
        path: '',
        permission: '',
        orderNum: 1,
        menuType: 0,
        status: 0,
        parentId: null,
        grandParentId: null
      },
      // 菜单
      menus: [],

      // 表单必选条件
      formRules: {
        menuName: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入路由路径', trigger: 'blur' }
        ],
        orderNum: [
          { required: true, message: '请输入排序号', trigger: 'blur' }
        ]
      },
      // 弹出框标题
      dialogTitle: '添加菜单'
    }
  },

  created() {
    this.getMenuTree()
  },

  computed: {
    sortedMenus() {
      return [...this.menus].sort((a, b) => a.orderNum - b.orderNum)
    }
  },

  methods: {

    sortedChildren(children) {
      return [...children].sort((a, b) => a.orderNum - b.orderNum)
    },

    getMenuTree() {
      this.loading = true;
      getMenuTree().then(({data}) => {
        this.menus = data;
        this.loading = false;
      }).catch(e => {})
    },

    // 添加顶级菜单
    addTopLevelMenu() {
      this.resetCurrentMenu()
      this.currentMenu.menuType = 0
      this.currentMenu.orderNum = this.menus.length + 1

      this.isEditing = false

      this.dialogTitle = '添加目录'
      this.dialogVisible = true
    },

    // 添加二级菜单
    addSecondLevelMenu(parentMenu) {
      this.resetCurrentMenu()
      this.currentMenu.menuType = 1
      this.currentMenu.parentId = parentMenu.menuId
      this.currentMenu.orderNum = (parentMenu.children?.length || 0) + 1

      this.isEditing = false

      this.dialogTitle = '添加菜单'
      this.dialogVisible = true
    },

    // 添加三级菜单
    addThirdLevelMenu(grandParentMenu, parentMenu) {
      this.resetCurrentMenu()
      this.currentMenu.menuType = 2
      this.currentMenu.parentId = parentMenu.menuId
      this.currentMenu.grandParentId = grandParentMenu.menuId
      this.currentMenu.orderNum = (parentMenu.children?.length || 0) + 1

      this.isEditing = false
      this.isMenuType = false

      this.dialogTitle = '添加权限'
      this.dialogVisible = true
    },

    // 编辑菜单
    editMenu(menu, parentMenu = null, grandParentMenu = null) {
      Object.assign(this.currentMenu, menu)
      this.currentMenu.parentId = parentMenu ? parentMenu.menuId : null
      this.currentMenu.grandParentId = grandParentMenu ? grandParentMenu.menuId : null
      this.isEditing = true
      if (this.currentMenu.menuType === 2){
        this.isMenuType = false
      }else {
        this.isMenuType = true
      }
      this.isMenuType = true
      this.dialogTitle = '编辑菜单'
      this.dialogVisible = true
    },

    // 保存菜单
    saveMenu() {
      this.$refs.menuFormRef.validate(async (valid) => {
        if (!valid) return

        try {
          if (this.isEditing) {

            let data = JSON.parse(JSON.stringify(this.currentMenu))

            updateById(data).then(ref => {
              // 更新现有菜单
              this.updateMenuInTree(this.menus, this.currentMenu)
              ElMessage.success('菜单更新成功')
            }).catch( err =>{
              console.log(err);
            });

          } else {
            // 添加新菜单
            const newMenu = {
              menuId: null,
              menuName: this.currentMenu.menuName,
              path: this.currentMenu.path,
              orderNum: this.currentMenu.orderNum,
              menuType: this.currentMenu.menuType,
              status: this.currentMenu.status,
              parentId: null,
              permission: this.currentMenu.permission,
              children: []
            }

            if (this.currentMenu.menuType === 0) {
              // 添加新目录
              addMenu(newMenu).then(({data}) => {
                // this.menus.push(data);
                this.getMenuTree();
                ElMessage.success('目录添加成功');
              }).catch(e => {})

            } else if (this.currentMenu.menuType === 1) {
              // 目标树节点(目录)
              const parent = this.findMenuById(this.menus, this.currentMenu.parentId)

              if (parent) {
                if (!parent.children) {
                  parent.children = []
                }

                // 添加父节点id
                newMenu.parentId = parent.menuId;

                // 添加新菜单
                addMenu(newMenu).then(({data}) => {
                  // parent.children.push(data)
                  this.getMenuTree();
                  ElMessage.success('菜单添加成功');
                }).catch(e => {})

              }
            } else if (this.currentMenu.menuType === 2) {
              // 目标树节点（菜单）
              const grandParent = this.findMenuById(this.menus, this.currentMenu.grandParentId)

              if (grandParent) {
                // 目标树节点（权限）
                const parent = this.findMenuById(grandParent.children, this.currentMenu.parentId)

                if (parent) {
                  if (!parent.children) {
                    parent.children = []
                  }

                  // 添加父节点id
                  newMenu.parentId = parent.menuId;

                  // 添加新权限
                  addMenu(newMenu).then(({data}) => {
                    // parent.children.push(data)
                    this.getMenuTree();
                    ElMessage.success('权限添加成功');
                  }).catch(e => {})

                }
              }
            }
          }
          // 关闭弹窗
          this.dialogVisible = false
        } catch (error) {
          console.log('表单验证失败', error)
        }
      })
    },

    // 在树中查找菜单
    findMenuById(tree, id) {
      for (let i = 0; i < tree.length; i++) {
        if (tree[i].menuId === id) {
          return tree[i]
        }

        if (tree[i].children && tree[i].children.length > 0) {
          const found = this.findMenuById(tree[i].children, id)
          if (found) return found
        }
      }
      return null
    },

    // 在树中更新菜单
    updateMenuInTree(tree, menu) {
      for (let i = 0; i < tree.length; i++) {
        if (tree[i].menuId === menu.menuId) {
          tree[i].menuName = menu.menuName
          tree[i].path = menu.path
          tree[i].permission = menu.permission
          tree[i].status = menu.status
          tree[i].orderNum = menu.orderNum
          return true
        }

        if (tree[i].children && tree[i].children.length > 0) {
          if (this.updateMenuInTree(tree[i].children, menu)) {
            return true
          }
        }
      }
      return false
    },

    // 删除目录
    deleteMenu(menu, index) {
      let ids = [];
      ids.push(menu.menuId);
      if (menu.children.length > 0){
        menu.children.forEach(x => {
          if (x.children.length > 0){
            x.children.forEach(y => {
              ids.push(y.menuId);
            })
          }
          ids.push(x.menuId);
        })
      }
      const vnode = <img src="@/assets/logo.png" height="80" width="80"/>
      ElMessageBox.confirm(`确定要删除菜单"${menu.menuName}"吗？此操作也会删除所有子菜单。`, '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            icon: markRaw(vnode),
          }
      ).then(() => {
        // 删除目录
        removeMenu(ids).then(res => {
          this.getMenuTree();
          this.$message.success('菜单删除成功')
        }).catch(e => {
          // 删除失败操作
        })
      }).catch(() => {
        // 用户取消删除
      })
    },

    // 删除二级菜单
    deleteSecondLevelMenu(parentMenu, index) {
      const menu = parentMenu.children[index]
      // 需要删除的id
      let ids = [];
      ids.push(menu.menuId);
      if (menu.children.length > 0){
        menu.children.forEach(x => {
          ids.push(x.menuId)
        })
      }

      ElMessageBox.confirm(`确定要删除菜单"${menu.menuName}"吗？此操作也会删除所有子菜单。`, '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            icon: markRaw(Delete),
          }
      ).then(() => {
        // 删除菜单
        removeMenu(ids).then(res => {
          this.getMenuTree();
          this.$message.success('菜单删除成功')
        }).catch(e => {
          // 删除失败操作
        })
      }).catch(() => {
        // 用户取消删除
      })
    },

    // 删除三级菜单
    deleteThirdLevelMenu(grandParentMenu, parentIndex, index) {
      // 菜单树节点
      const menu = grandParentMenu.children[parentIndex].children[index]

      ElMessageBox.confirm(`确定要删除菜单"${menu.menuName}"吗？`, '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            icon: markRaw(Delete),
          }
      ).then(() => {
        // 删除权限
        removeMenu([menu.menuId]).then(res => {
          this.getMenuTree();
          this.$message.success('权限删除成功')
        }).catch(e => {
          // 删除失败操作
        })
      }).catch(() => {
        // 用户取消操作
      });
    },

    // 重置当前菜单表单
    resetCurrentMenu() {
      this.currentMenu = {
        menuId: null,
        menuName: '',
        path: '',
        permission: null,
        orderNum: 1,
        menuType: null,
        status: 0,
        parentId: null,
        grandParentId: null
      }

      if (this.$refs.menuFormRef) {
        this.$nextTick(() => {
          this.$refs.menuFormRef.resetFields()
        })
      }
    }
  },

}
</script>

<style scoped lang="scss">


.menu-management-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
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
}

.header h2 {
  display: flex;
  align-items: center;
  color: #303133;
  margin: 0;
}

.header h2 i {
  margin-right: 10px;
  font-size: 24px;
}

.menu-list {
  margin-top: 20px;
}

.menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 0;
}

.menu-info {
  display: flex;
  align-items: center;
  flex: 1;
  flex-wrap: wrap;
  gap: 10px;
}

.menu-type {
  min-width: 60px;
  text-align: center;
}

.menu-title {
  font-weight: bold;
  min-width: 10vw;
}

.menu-path {
  color: #606266;
  font-family: monospace;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-right: 7vw;
}

.menu-order {
  min-width: 70px;
  text-align: center;
  margin-right: 1vw;
}

.menu-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.sort-buttons {
  margin-left: 10px;
}

.menu-content {
  padding: 10px 0 10px 30px;
}

/* 各级菜单样式 */
.first-level-item {
  margin-bottom: 10px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.first-level-item /deep/ .el-collapse-item__header {
  flex-direction: row-reverse !important;
  padding: 0 15px;
  font-weight: bold;
  background-color: #f5f7fa;
  border-bottom: 1px solid #ebeef5;
  position: relative;
  padding-left: 40px; /* 为图标留出空间 */
}

.first-level-item ::v-deep .el-collapse-item__content {
  padding-bottom: 10px;
}

.second-level-item {
  margin-bottom: 10px;
  border: 1px solid #e6e8eb;
  border-radius: 4px;
}

.second-level-item ::v-deep .el-collapse-item__header {
  flex-direction: row-reverse !important;
  padding: 0 15px;
  background-color: #f9f9f9;
  position: relative;
  padding-left: 40px; /* 为图标留出空间 */
}

.third-level-list {
  border-left: 3px solid #dcdfe6;
  padding-left: 15px;
}

.third-level-item {
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 8px;
  border: 1px solid #ebeef5;
}

.third-level-item:last-child {
  margin-bottom: 0;
}

/* 空状态样式 */
.empty-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-color: #f8f9fa;
  border: 1px dashed #dcdfe6;
  border-radius: 4px;
  color: #909399;
  text-align: center;
}

.empty-menu.main-empty {
  margin-top: 20px;
  padding: 50px;
}

.empty-menu i {
  font-size: 36px;
  margin-bottom: 10px;
}

.empty-menu p {
  margin: 0 0 15px 0;
}

/* 调整折叠面板图标位置 */
::v-deep .el-collapse-item__arrow {
  position: absolute;
  left: 15px;
  margin-right: 0;
}

::v-deep .el-collapse-item__arrow.el-icon-arrow-right {
  transform: rotate(0deg);
  transition: transform 0.3s;
}

::v-deep .el-collapse-item__header.is-active .el-collapse-item__arrow.el-icon-arrow-right {
  transform: rotate(90deg);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header .el-button {
    margin-top: 10px;
  }

  .menu-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .menu-info {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 10px;
    gap: 5px;
  }

  .menu-actions {
    width: 100%;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .sort-buttons {
    margin-left: 0;
    margin-top: 5px;
  }
}

</style>


