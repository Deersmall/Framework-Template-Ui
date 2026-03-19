<template>
  <process-panel :form-data="formData" :form-columns="formColumns" />
</template>

<script>

import { getElement } from "../../bpmn/utils/element"
import ProcessPanel from '@/components/panel/processPanel'

export default {

  props:["modeler","elementId"],
  components: { ProcessPanel },

  data(){
    return{
      formData:{
        name:"",

        assignee:"",
        candidateUsers:"",
        priority:"",
        remark:"",
      }
    }
  },

  computed: {
    formColumns() {
      return [
        { prop: "name", label: "节点名称" },

        { prop: "assignee", label: "审批人" },
        { prop: "candidateUsers", label: "候选人" },
        { prop: "remark", label: "备注" },
      ];
    },
  },

  watch:{

    elementId:{
      immediate:true,
      handler(){
        this.load()
      }
    },
    'formData.name':{
      handler(newVal,oldVal){
        this.updProperties("name",newVal);
      }
    },
    'formData.assignee':{
      handler(newVal,oldVal){
        this.updProperties("camunda:assignee",newVal);
      }
    },
    'formData.candidateUsers':{
      handler(newVal,oldVal){
        this.updProperties("camunda:candidateUsers",newVal);
      }
    },
    'formData.remark':{
      handler(newVal,oldVal){
        this.updProperties("camunda:remark",newVal);
      }
    }

  },

  methods:{

    load(){

      const element = getElement(this.modeler,this.elementId)

      if(!element) return

      const bo = element.businessObject


// ⚠️ 一定要用浅拷贝，避免 Proxy 问题
      this.formData = {
        name: bo["name"] || "",
        assignee: bo.$attrs["camunda:assignee"] || "",
        candidateUsers: bo.$attrs["camunda:candidateUsers"] || "",
        remark: bo.$attrs["camunda:remark"] || "",
      }

    },


    updProperties(propertiesId,propertiesVal){

      const modeling = this.modeler.get("modeling")
      const element = getElement(this.modeler,this.elementId)

      if(!element) return

      modeling.updateProperties(element,
          { [propertiesId]: propertiesVal }
      );

    }

  }

}

</script>
