<template>
  <el-form ref="formRef" :model="formData" :rules="formRules" :label-width="labelWidth" :label-position="labelPosition">
    <el-row gutter="24">
      <el-col v-for="(item, index) in formColumns" :key="index" :span="item.span || span">

        <el-form-item :label="item.label" :prop="item.prop" :required="item.required">
          <!-- 输入框 -->
          <el-input
              v-if="item.type === 'input' || item.type === 'textarea'"
              v-model="formData[item.prop]"
              :type="item.type === 'textarea' ? 'textarea' : 'text'"
              :placeholder="item.placeholder || `请输入${item.label}`"
              :clearable="item.clearable !== false"
              :disabled="item.disabled"
              :show-password="item.password"
          />

          <!-- 数字输入框 -->
          <el-input-number
              v-else-if="item.type === 'number'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder || `请输入${item.label}`"
              :min="item.min"
              :max="item.max"
              :precision="item.precision"
              :disabled="item.disabled" />

          <!-- 选择器 -->
          <el-select
              v-else-if="item.type === 'select'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder || `请选择${item.label}`"
              :multiple="item.multiple"
              :disabled="item.disabled"
              @change="item.change ? item.change(formData[item.prop]) : null"
              clearable
              filterable >

            <el-option
                v-for="option in item.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
                :disabled="option.disabled" />

          </el-select>

          <!-- 日期选择器 -->
          <el-date-picker
              v-else-if="item.type === 'date'"
              v-model="formData[item.prop]"
              :type="item.dateType || 'date'"
              :placeholder="item.placeholder || `请选择${item.label}`"
              :format="item.format"
              :value-format="item.valueFormat"
              clearable
              :disabled="item.disabled"
              :range-separator="item.rangeSeparator"
              :start-placeholder="item.startPlaceholder"
              :end-placeholder="item.endPlaceholder" />

          <!-- 时间选择器 -->
          <el-time-picker
              v-else-if="item.type === 'time'"
              v-model="formData[item.prop]"
              :placeholder="item.placeholder || `请选择${item.label}`"
              :format="item.format"
              :value-format="item.valueFormat"
              clearable
              :disabled="item.disabled" />

          <!-- 开关 -->
          <el-switch
              v-else-if="item.type === 'switch'"
              v-model="formData[item.prop]"
              :active-text="item.activeText"
              :inactive-text="item.inactiveText"
              :active-value="item.activeValue !== undefined ? item.activeValue : true"
              :inactive-value="item.inactiveValue !== undefined ? item.inactiveValue : false"
              :disabled="item.disabled" />

          <!-- 单选框 -->
          <el-radio-group
              v-else-if="item.type === 'radio'"
              v-model="formData[item.prop]"
              :disabled="item.disabled" >
            <el-radio-button
                v-for="option in item.options"
                :key="option.value"
                :label="option.value"
                :border="item.border" >
              {{ option.label }}
            </el-radio-button>
          </el-radio-group>

          <!-- 复选框 -->
          <el-checkbox-group
              v-else-if="item.type === 'checkbox'"
              v-model="formData[item.prop]"
              :disabled="item.disabled" >
            <el-checkbox
                v-for="option in item.options"
                :key="option.value"
                :label="option.value"
                :border="item.border" >
              {{ option.label }}
            </el-checkbox>
          </el-checkbox-group>

          <!-- 颜色选择器 -->
          <el-color-picker
              v-else-if="item.type === 'color'"
              v-model="formData[item.prop]"
              :disabled="item.disabled"
              :show-alpha="item.showAlpha"
              :color-format="item.colorFormat" />

          <!-- 上传 -->
          <el-upload
              v-else-if="item.type === 'upload'"
              class="upload-demo"
              :action="item.action"
              :multiple="item.multiple"
              :limit="item.limit"
              :file-list="formData[item.prop]"
              :on-success="item.onSuccess"
              :on-error="item.onError"
              :on-remove="item.onRemove"
              :before-upload="item.beforeUpload"
              :disabled="item.disabled"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" v-if="item.tip">{{ item.tip }}</div>
          </el-upload>

          <!-- 插槽 -->
          <slot
              v-else-if="item.type === 'slot'"
              :name="item.slotName"
              :form-data="formData"
              :item="item" />

        </el-form-item>

      </el-col>
    </el-row>

    <!-- 表单操作按钮插槽 -->
    <div class="form-actions" v-if="$slots.actions">
      <slot name="actions"></slot>
    </div>
  </el-form>

</template>

<script>
export default {
  name: 'DeerForm',
  props: {
    // 表单配置
    formColumns: {
      type: Array,
      default: () => []
    },
    // 表单数据
    formData: {
      type: Object,
      default: () => ({})
    },
    // 表单验证规则
    formRules: {
      type: Object,
      default: () => ({})
    },
    // 布局相关
    labelWidth: {
      type: String,
      default: '100px'
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    gutter: {
      type: Number,
      default: 20
    },
    span: {
      type: Number,
      default: 24
    },
  },
  methods: {
    // 验证表单
    validate() {
      return this.$refs.formRef.validate();
    },
    // 重置表单
    resetFields() {
      this.$refs.formRef.resetFields();
    },
    // 清除验证
    clearValidate() {
      this.$refs.formRef.clearValidate();
    }
  }
}
</script>

<style scoped>
</style>
