<template>

  <div>

    <h3>任务配置</h3>

    <label>审批人</label>

    <input
        v-model="assignee"
        @input="update"
    />

  </div>

</template>

<script>

import {
  getElement,
  getCustomExtension,
  updateExtension
} from "../../bpmn/utils/element";

export default{

  props:["modeler","elementId"],

  data(){

    return{
      assignee:""
    }

  },

  watch:{
    elementId:{
      immediate:true,
      handler(){
        this.load();
      }
    }
  },

  methods:{

    load(){

      const element =
          getElement(this.modeler,this.elementId);

      const ext =
          getCustomExtension(element);

      if(ext){
        this.assignee = ext.assignee || "";
      }

    },

    update(){

      const element =
          getElement(this.modeler,this.elementId);

      updateExtension(
          this.modeler,
          element,
          {
            assignee:this.assignee
          }
      );

    }

  }

}

</script>
