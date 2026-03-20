<template>

  <div class="bg-[#282c34] rounded-lg">

    <div class="flex items-center justify-between">
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
      </div>

      <div class="circle">
        <span class="text-center text-white" >xml预览</span>
      </div>

      <div />
    </div>

    <button class="absolute top-6 right-4 py-1 px-2 text-xs bg-white/20 text-white
            border-none rounded cursor-pointer transition-colors duration-200"
            @click="copyCode" :disabled="!code">
      {{ copyStatus }}
    </button>

    <pre class="bg-[#282c34]">
      <code :class="'language-' + language" ref="code">
        {{ code }}
      </code>
    </pre>

  </div>

</template>

<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // 选择你喜欢的主题

export default {
  name: 'CodeHighlight',
  props: {
    language: {
      type: String,
      default: 'xml'
    },
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      copyStatus: '复制' // 可切换为“复制成功”、“复制失败”
    };
  },
  mounted() {
    this.highlight();
  },
  watch: {
    code: {
      handler() {
        this.$nextTick(() => {
          this.highlight();
        });
      }
    }
  },
  methods: {
    highlight() {
      const codeElement = this.$refs.code;
      if (codeElement && this.code) {
        // 清除上一次高亮标记，允许重新高亮
        delete codeElement.dataset.highlighted;
        hljs.highlightElement(codeElement);
      }
    },
    async copyCode() {
      if (!this.code) return;

      try {
        await navigator.clipboard.writeText(this.code);
        this.copyStatus = '复制成功';
        setTimeout(() => {
          this.copyStatus = '复制';
        }, 2000);
      } catch (err) {
        console.error('复制失败: ', err);
        this.copyStatus = '复制失败';
        setTimeout(() => {
          this.copyStatus = '复制';
        }, 2000);
      }
    }
  }
};
</script>

<style>
.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 8px;
  font-size: 12px;
  background-color: #ffffff3a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}
</style>
