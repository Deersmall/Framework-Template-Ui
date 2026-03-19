<template>

  <div>

    <div class="flex p-2 gap-1">
      <div>
        <span class="bg-red-500 inline-block center w-3 h-3 rounded-full" />
      </div>
      <div class="circle">
        <span class="bg-yellow-500 inline-block center w-3 h-3 rounded-full" />
      </div>
      <div class="circle">
        <span class="bg-green-500 box inline-block center w-3 h-3 rounded-full" />
      </div>
      <div class="circle">
        <span class="font-bold italic" >{{ title }}</span>
      </div>
    </div>


    <div class="wave-group mt-8" v-for="(item, index) in formColumns" :key="index">
      <input required="" type="text" class="input" v-model="formData[item.prop]" />
      <span class="bar"></span>
      <label class="label">
          <span v-for="(char, idx) in item.label.split('')"
                :key="idx" class="label-char" :style="{ '--index': idx }"
          >{{ char }}</span>
      </label>
    </div>

  </div>
</template>

<script>

import "@/style/inputStyle.css";

export default{
  name: 'processPanel',
  props: {

    // 标题
    title: {
      type: String,
      default: ''
    },

    // 表单数据
    formData: {
      type: Object,
      default: () => ({})
    },

    // 表单配置
    formColumns: {
      type: Array,
      default: () => []
    },

  },
}

</script>

