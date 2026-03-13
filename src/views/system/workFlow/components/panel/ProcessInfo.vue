<template>

  <div>

    <h3>流程信息</h3>

    <div>
      <label>流程名称</label>
      <input v-model="name" @input="updateName"/>
    </div>

    <div>
      <label>流程ID</label>
      <input v-model="id" @change="updateId"/>
    </div>

  </div>

</template>

<script>

export default{

  props:["modeler"],

  data(){

    return{
      name:"",
      id:""
    }

  },

  mounted(){

    this.load();

  },

  methods:{

    getProcess(){

      const canvas = this.modeler.get("canvas");

      return canvas.getRootElement();

    },

    load(){

      const process = this.getProcess();

      this.name =
          process.businessObject.name || "";

      this.id =
          process.businessObject.id;

    },

    updateName(){

      const modeling =
          this.modeler.get("modeling");

      modeling.updateProperties(
          this.getProcess(),
          { name:this.name }
      );

    },

    updateId(){

      const modeling =
          this.modeler.get("modeling");

      modeling.updateProperties(
          this.getProcess(),
          { id:this.id }
      );

    }

  }

}

</script>
