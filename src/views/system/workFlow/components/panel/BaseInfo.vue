<template>

  <div>

    <h3>节点信息</h3>

    <label>节点名称</label>

    <input
        v-model="name"
        @input="update"
    />

  </div>

</template>

<script>

import { getElement }
  from "../../bpmn/utils/element";

export default{

  props:["modeler","elementId"],

  data(){
    return{
      name:""
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

      this.name =
          element.businessObject.name || "";

    },

    update(){

      const element =
          getElement(this.modeler,this.elementId);

      const modeling =
          this.modeler.get("modeling");

      modeling.updateProperties(
          element,
          { name:this.name }
      );

    }

  }

}

</script>
