<template>
  <process-panel :form-data="formData" :form-columns="formColumns" />
</template>

<script>

import { getElement } from "../../bpmn/utils/element";
import ProcessPanel from '@/components/panel/processPanel'


export default{

  props:["modeler","elementId"],
  components: { ProcessPanel },


  data(){
    return{
      formData: {
        name:""
      },
    }
  },

  computed: {
    formColumns() {
      return [
        { prop: "name", label: "节点名称" },
      ];
    },
  },

  watch:{
    elementId:{
      immediate:true,
      handler(){
        this.load();
      }
    },

    'formData.name':{
      handler(newVal,oldVal){
        this.updProperties("name",newVal);
      }
    }
  },

  methods:{

    load(){
      const element = getElement(this.modeler,this.elementId);
      this.formData.name = element.businessObject.name || "";
    },

    updProperties(propertiesId,propertiesVal){

      const modeling = this.modeler.get("modeling");
      const element = getElement(this.modeler,this.elementId);

      if(!element) return

      modeling.updateProperties(element,
          { [propertiesId]: propertiesVal }
      );

    }

  }

}

</script>
