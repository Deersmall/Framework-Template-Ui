<template>

  <div class="panel">

    <ProcessInfo v-if="!elementId" :modeler="modeler" />

    <div v-else>

      <BaseInfo v-if="!isUserTask" :modeler="modeler" :elementId="elementId"/>

      <TaskConfig v-else :modeler="modeler" :elementId="elementId"/>

    </div>

  </div>

</template>

<script>

import ProcessInfo from "./ProcessInfo.vue";
import BaseInfo from "./BaseInfo.vue";
import TaskConfig from "./TaskConfig.vue";

import { getElement } from "../../bpmn/utils/element";
import ProcessPanel from "@/components/panel/processPanel";

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
  height: 100%;
  background-color: #ffffff;
  border-left: 1px #e0e0e0 solid;
}

</style>
