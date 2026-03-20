
<template>

  <el-container class="container">
    <el-header>
      <div style="display: flex; padding: 10px 0px; justify-content: space-between;">
        <div style="width: 20vw; display: flex;align-items: center; justify-content: space-between;">
          <el-upload action="" :before-upload="openBpmn" style="margin-top: 10px;">
            <el-tooltip effect="dark" content="加载xml" placement="bottom">
              <Button icon="pi pi-file-check" severity="contrast" variant="outlined" size="small" />
            </el-tooltip>
          </el-upload>
          <el-tooltip effect="dark" content="新建" placement="bottom">
            <Button icon="pi pi-plus-circle" severity="contrast" variant="outlined" size="small" @click="newDiagram" />
          </el-tooltip>
          <el-tooltip effect="dark" content="自适应屏幕" placement="bottom">
            <Button icon="pi pi-window-minimize" severity="contrast" variant="outlined" size="small" @click="fitViewport" />
          </el-tooltip>
          <el-tooltip effect="dark" content="放大" placement="bottom">
            <Button icon="pi pi-search-plus" severity="contrast" variant="outlined" size="small" @click="zoomViewport(true)" />
          </el-tooltip>
          <el-tooltip effect="dark" content="缩小" placement="bottom">
            <Button icon="pi pi-search-minus" severity="contrast" variant="outlined" size="small" @click="zoomViewport(false)" />
          </el-tooltip>
          <el-tooltip effect="dark" content="后退" placement="bottom">
            <Button icon="pi pi-arrow-circle-left" severity="contrast" variant="outlined" size="small" @click="modeler.get('commandStack').undo()" />
          </el-tooltip>
          <el-tooltip effect="dark" content="前进" placement="bottom">
            <Button icon="pi pi-arrow-circle-right" severity="contrast" variant="outlined" size="small" @click="modeler.get('commandStack').redo()" />
          </el-tooltip>
        </div>
        <div>
          <!--            <el-button size="mini" icon="el-icon-s-check" @click="verifyXML">校验xml</el-button>-->
          <el-button size="mini" icon="el-icon-view" @click="showXML">查看xml</el-button>
          <el-button size="mini" icon="el-icon-download" @click="saveXML(true)">下载xml</el-button>
          <el-button size="mini" icon="el-icon-picture" @click="saveImg(true)">下载svg</el-button>
          <el-button size="mini" type="primary" @click="save">保存模型</el-button>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-main>
        <!-- 左侧画布容器 -->
        <div id="canvas" class="canvas" ref="canvas"></div>
      </el-main>
      <el-aside width="16rem">
        <!-- 右侧属性面板容器 -->
        <PropertyPanel v-if="modelerReady" :modeler="modeler" :elementId="currentElementId"/>
      </el-aside>
    </el-container>
  </el-container>

    <el-drawer v-model="xmlOpen" direction="rtl" :with-header="false" size="60%">
      <el-scrollbar>
        <CodeHighlight language="xml" :code="xmlData" />
      </el-scrollbar>
    </el-drawer>

</template>


<script>
import "bpmn-js/dist/assets/diagram-js.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css"
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css"
import PropertyPanel from "./panel/PropertyPanel.vue";

import {createModeler, importXML, } from "../bpmn/modeler";

import getInitXml from '../init/init'

import Button from 'primevue/button';
import CodeHighlight from '@/components/codeBlock/codeHighlight';




export default{

  components:{
    Button,
    PropertyPanel,
    CodeHighlight
  },

  data(){

    return{
      modeler: null,          // 存储 modeler 实例
      zoom: 1,

      modelerReady:false,
      currentElementId:null,

      // region 在线查看xml
      xmlTitle: '',
      xmlOpen: false,
      xmlData: '',
      // endregion

    }

  },

  async mounted(){

    this.modeler = createModeler(this.$refs.canvas);

    await importXML(getInitXml());

    this.modelerReady = true;

    this.initEvents();

  },

  methods:{

    initEvents(){

      const eventBus = this.modeler.get("eventBus");

      eventBus.on("selection.changed",(e)=>{

        const element = e.newSelection[0];

        this.currentElementId = element ? element.id : null;

      });

    },

    /** region 按钮方法 */

    // 加载xml（导入流程图）
    openBpmn(file) {
      const reader = new FileReader()
      reader.readAsText(file, 'utf-8')
      reader.onload = async () => {
        await importXML(reader.result);
      }
      return false
    },

    // 新建流程图
    async newDiagram() {
      await importXML(getInitXml());
    },

    // 自适应屏幕
    fitViewport() {
      this.zoom = this.modeler.get('canvas').zoom('fit-viewport')
      const bbox = document.querySelector('.container .viewport').getBBox()
      const currentViewbox = this.modeler.get('canvas').viewbox()
      const elementMid = {
        x: bbox.x + bbox.width / 2 - 65,
        y: bbox.y + bbox.height / 2
      }
      this.modeler.get('canvas').viewbox({
        x: elementMid.x - currentViewbox.width / 2,
        y: elementMid.y - currentViewbox.height / 2,
        width: currentViewbox.width,
        height: currentViewbox.height
      })
      this.zoom = bbox.width / currentViewbox.width * 1.8
    },

    // 放大缩小
    zoomViewport(zoomIn = true) {
      this.zoom = this.modeler.get('canvas').zoom()
      this.zoom += (zoomIn ? 0.1 : -0.1)
      this.modeler.get('canvas').zoom(this.zoom)
    },

    // 查看xml
    async showXML() {
      try {
        const xml = await this.saveXML()

        this.xmlTitle = '在线查看xml';
        this.xmlData = xml;

        this.xmlOpen = true;
      } catch (err) {
        console.log(err)
      }
    },

    // 下载xml
    async saveXML(download = false) {
      try {
        const { xml } = await this.modeler.saveXML({ format: true })
        if (download) {
          this.downloadFile(`${this.getProcessElement().name}.bpmn20.xml`, xml, 'application/xml')
        }
        return xml
      } catch (err) {
        console.log(err)
      }
    },

    // 下载svg
    async saveImg(download = false) {
      try {
        const { svg } = await this.modeler.saveSVG({ format: true })
        if (download) {
          this.downloadFile(this.getProcessElement().name, svg, 'image/svg+xml')
        }
        return svg
      } catch (err) {
        console.log(err)
      }
    },

    // 保存模型
    async save() {
      const process = this.getProcess()
      const xml = await this.saveXML()
      const svg = await this.saveImg()
      const result = { process, xml, svg }
      this.$emit('save', result)
      window.parent.postMessage(result, '*')
    },

    // 调用下载
    downloadFile(filename, data, type) {
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(new Blob([data], {type: type}));
      a.href = url
      a.download = filename
      a.click()
      window.URL.revokeObjectURL(url)
    },
    getProcessElement() {
      const rootElements = this.modeler.getDefinitions().rootElements
      for (let i = 0; i < rootElements.length; i++) {
        if (rootElements[i].$type === 'bpmn:Process') return rootElements[i]
      }
    },

    // 对外 api
    getProcess() {
      const element = this.getProcessElement()
      return {
        id: element.id,
        name: element.name,
        category: element.$attrs['flowable:processCategory']
      }
    },
    /** endregion 按钮方法 */


  }

}

</script>

<style lang="scss" scoped>

.container{
  position: absolute;
  width: 100%;
  height: 100%;
}

.el-header {
  background-color: #fafafa;
}

.el-main {
  padding: 0 !important;

  .canvas {
    height: 100%;
    background-color: #fafafa;

    ::v-deep .djs-palette {
      top: 10vh;
    }

  }
}

.el-aside {
  .properties-panel {
    height: 100%;
    background-color: #fafafa;
    border-left: 1px solid #cecece;
    overflow-y: auto;  /* 内容过多时滚动 */
  }
}


</style>
