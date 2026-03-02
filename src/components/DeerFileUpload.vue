<template>
  <FileUpload name="files" :url="url" :accept="acceptType"
              :maxFileSize="10485760" invalidFileSizeMessage="上传文件需要小于10Mb"
              :fileLimit="1" invalidFileLimitMessage="最大上传1个文件" :multiple="false"
              @before-send="beforeSend"
              @upload="onUpload($event)">
    <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
      <!--          控件按钮-->
      <div class="flex gap-2">
        <Button @click="chooseCallback()" label="选择" severity="info" />
        <Button @click="importTemplateDownload" label="模板下载" severity="info" />
        <Button @click="uploadEvent(uploadCallback)" label="上传" severity="success" :disabled="!files || files.length === 0"></Button>
        <Button @click="clearCallback()" label="取消" severity="danger" :disabled="!files || files.length === 0"></Button>
      </div>
    </template>

    <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback, messages }">
      <div class="flex flex-col gap-8 pt-4">
        <Message v-for="message of messages" :key="message" :class="{ 'mb-8': !files.length && !uploadedFiles.length}" severity="error">
          {{ message }}
        </Message>

        <div v-if="uploadedFiles.length > 0">
          <h5>完成</h5>
          <div style="display: grid;grid-template-columns: repeat(1, 1fr);">
            <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size"
                 class="rounded-border border m-2" style="display: flex;justify-content: space-between;align-items: center;">
              <span class="w-96 max-w-96 font-semibold text-ellipsis whitespace-nowrap overflow-hidden">{{ file.name }}</span>
              <div>{{ formatSize(file.size) }}</div>
              <Badge value="完成" severity="success" />
              <Button class="mr-8" icon="pi pi-times" @click="removeUploadedFileCallback(index)" variant="outlined" rounded severity="danger" />
            </div>
          </div>
        </div>


        <div v-if="files.length > 0">
          <h5>待处理</h5>
          <div style="display: grid;grid-template-columns: repeat(1, 1fr);">
            <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                 class="rounded-border border m-2" style="display: flex;justify-content: space-between;align-items: center;">
              <div class="w-96 max-w-96 font-semibold text-ellipsis whitespace-nowrap overflow-hidden">{{ file.name }}</div>
              <span>{{ formatSize(file.size) }}</span>
              <Badge value="待处理" severity="warn" />
              <Button class="mr-8" icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" variant="outlined" rounded severity="danger" />
            </div>

          </div>
        </div>


      </div>
    </template>

    <template #empty>
      <!--          内容为空时显示-->
      <div class="flex items-center justify-center flex-col">
        <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" />
        <p class="mt-6 mb-0">把文件拖到这里上传。</p>
      </div>
    </template>
  </FileUpload>
</template>


<script>
import Button from 'primevue/button';
import Badge from 'primevue/badge';
import FileUpload from 'primevue/fileupload';

import {getToken} from "@/utils/loginUserInfo";

export default {
  name: 'DeerFileUpload',

  components: {
    Button,
    Badge,
    FileUpload,
  },

  props: {
    url: {
      type: String,
      default: "",
    },
    acceptType: {
      type: String,
      default: "",
    },
    // files: {
    //   type: Array,
    //   default: () => [],
    // },
  },


  watch: {},

  data() {
    return {};
  },

  created() {},

  methods:{

    /** 模板下载 */
    importTemplateDownload(records) {
      this.$emit("importTemplateDownload", records);
    },

    // onSelectedFiles(event) {
    //   this.files = event.files;
    // },

    /** 上传前操作 */
    beforeSend(event) {
      // 在这里添加或修改 Authorization 头
      event.xhr.setRequestHeader('Authorization', getToken());
    },

    /** 上传 */
    uploadEvent(callback) {
      callback();
    },

    /** 上传回调 */
    onUpload() {
      this.$toast.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    },

    /** 待处理文件删除 */
    onRemoveTemplatingFile(file, removeFileCallback, index) {
      removeFileCallback(index);
    },

    /** 格式大小 */
    formatSize(bytes) {
      const k = 1024;
      const dm = 3;
      const sizes = this.$primevue.config.locale.fileSizeTypes;

      if (bytes === 0) {
        return `0 ${sizes[0]}`;
      }

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

      return `${formattedSize} ${sizes[i]}`;
    },

    onClearTemplatingUpload(clear) {
      clear();
    },



  },

}

</script>

<style lang="scss" scope>
</style>
