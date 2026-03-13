<template>

  <div class="panel">

    <ProcessInfo v-if="!elementId" :modeler="modeler"/>

    <div v-else>

      <BaseInfo :modeler="modeler" :elementId="elementId"/>

      <TaskConfig v-if="isUserTask" :modeler="modeler" :elementId="elementId"/>

    </div>

  </div>

</template>

<script>

import ProcessInfo from "./ProcessInfo.vue";
import BaseInfo from "./BaseInfo.vue";
import TaskConfig from "./TaskConfig.vue";

import { getElement } from "../../bpmn/utils/element";

export default{

  props:["modeler","elementId"],

  components:{
    ProcessInfo,
    BaseInfo,
    TaskConfig
  },

  computed:{

    isUserTask(){

      const element = getElement(
          this.modeler,
          this.elementId
      );

      return element?.type === "bpmn:UserTask";

    }

  }

}

</script>

<style>

.panel{
}

</style>
