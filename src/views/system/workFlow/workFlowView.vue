<template>

  <div>

    <BpmnEditor/>

  </div>

</template>

<script>

import BpmnEditor from "./components/BpmnEditor.vue";

import { saveXML }
  from "./bpmn/modeler";

export default{

  components:{BpmnEditor},

  methods:{

    async save(){

      const xml = await saveXML();

      console.log(xml);

    }

  }

}

</script>
