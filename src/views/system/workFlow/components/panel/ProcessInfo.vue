<template>
  <process-panel :form-data="formData" :form-columns="formColumns" />
</template>

<script>

import "@/style/inputStyle.css";
import ProcessPanel from '@/components/panel/processPanel'

export default{

  props:["modeler"],
  components: { ProcessPanel },

  data(){

    return{
      formData: {
        name:"",
        id:"",
      },
    }

  },

  computed: {
    formColumns() {
      return [
        { prop: "id", label: "流程Id" },
        { prop: "name", label: "流程名称" },
      ];
    },
  },

  mounted(){
    this.load();
  },

  watch:{
    'formData.id':{
      handler(newVal,oldVal){
        this.updProperties("id",newVal);

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
      const process = this.getProcess();
      this.formData.id = process.businessObject.id;
      this.formData.name = process.businessObject.name;
    },

    getProcess(){
      const canvas = this.modeler.get("canvas");
      return canvas.getRootElement();
    },


    updProperties(propertiesId,propertiesVal){

      const modeling = this.modeler.get("modeling");

      modeling.updateProperties(this.getProcess(),
          { [propertiesId]: propertiesVal }
      );

    },

  }

}

</script>
