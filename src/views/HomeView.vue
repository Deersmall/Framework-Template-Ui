<template>
  <div class="card flex flex-col items-center overflow-hidden">

    <div class="h-[1rem]"></div>

    <div class="flex flex-wrap justify-center gap-8">

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 spin-in-[-360deg] slide-in-from-t-0 animate-duration-3000' }"
           class="w-64 h-64 mt-8 DBox" @click="JumpUrl('http://deer-small.xyz:3000')">
        <svg viewBox="0 0 1000 1000">
          <path class="DPath" d="M0,0 L1000,0 L1000,1000 L0,1000 Z" />
        </svg>

        <div class="DContent">
          <Card class="w-52 h-52" style="overflow: hidden">
            <template #header>
              <div class="w-24 h-24">
                <img alt="user header" src="../assets/logo.png" />
              </div>
            </template>
            <template #title>进入农场</template>
          </Card>
        </div>

      </div>

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 slide-in-from-t-64 animate-duration-3000' }"
           class="w-64 h-64 mt-8 DBox" >
        <svg viewBox="0 0 1000 1000">
          <path class="DPath" d="M0,0 L1000,0 L1000,1000 L0,1000 Z" />
        </svg>

        <div class="DContent">
          <Card class="w-52 h-52" style="overflow: hidden">
            <template #header >
              <div class="w-24 h-24">
                <img alt="user header" src="../assets/logo.png" />
              </div>
            </template>
            <template #title>Advanced Card</template>
          </Card>
        </div>

      </div>

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 spin-in-[360deg] slide-in-from-t-0 animate-duration-3000' }"
           class="w-64 h-64 mt-8 DBox" >
        <svg viewBox="0 0 1000 1000">
          <path class="DPath" d="M0,0 L1000,0 L1000,1000 L0,1000 Z" />
        </svg>

        <div class="DContent">
          <Card class="w-52 h-52" style="overflow: hidden">
            <template #header >
              <div class="w-24 h-24">
                <img alt="user header" src="../assets/logo.png" />
              </div>
            </template>
            <template #title>Advanced Card</template>
          </Card>
        </div>

      </div>

    </div>

    <div class="flex flex-wrap justify-center gap-8">

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 slide-in-from-l-64 animate-duration-3000', leaveClass: 'animate-leave fade-out-0' }"
           class="w-64 h-64 mt-8 DBox" >
        <svg viewBox="0 0 1000 1000">
          <path class="DPath" d="M0,0 L1000,0 L1000,1000 L0,1000 Z" />
        </svg>

        <div class="DContent">
          <Card class="w-52 h-52" style="overflow: hidden">
            <template #header >
              <div class="w-24 h-24">
                <img alt="user header" src="../assets/logo.png" />
              </div>
            </template>
            <template #title>Advanced Card</template>
          </Card>
        </div>

      </div>

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-[2] animate-duration-3000' }"
           class="w-64 h-64 mt-8 DBox" @click="JumpRouter('/user')">
        <svg viewBox="0 0 1000 1000">
          <path class="DPath" d="M0,0 L1000,0 L1000,1000 L0,1000 Z" />
        </svg>

        <div class="DContent">
          <Card class="w-52 h-52" style="overflow: hidden">
            <template #header >
              <div class="w-24 h-24">
                <img alt="user header" src="../assets/logo.png" />
              </div>
            </template>
            <template #title>
              进入主页
              <span>siuahduij</span>
            </template>
          </Card>
        </div>

      </div>

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 slide-in-from-r-64 animate-duration-3000', leaveClass: 'animate-leave fade-out-0' }"
           class="w-64 h-64 mt-8 DBox" >
        <svg viewBox="0 0 1000 1000">
          <path class="DPath" d="M0,0 L1000,0 L1000,1000 L0,1000 Z" />
        </svg>

        <div class="DContent">
          <Card class="w-52 h-52" style="overflow: hidden">
            <template #header >
              <div class="w-24 h-24">
                <img alt="user header" src="../assets/logo.png" />
              </div>
            </template>
            <template #title>Advanced Card</template>
          </Card>
        </div>

      </div>

    </div>

    <div class="flex flex-wrap justify-center gap-8">

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 spin-in-[360deg] slide-in-from-t-0 animate-duration-3000' }"
           class="w-64 h-64 mt-8 DBox" >
        <svg viewBox="0 0 1000 1000">
          <path class="DPath" d="M0,0 L1000,0 L1000,1000 L0,1000 Z" />
        </svg>

        <div class="DContent">
          <Card class="w-52 h-52" style="overflow: hidden">
            <template #header >
              <div class="w-24 h-24">
                <img alt="user header" src="../assets/logo.png" />
              </div>
            </template>
            <template #title>Advanced Card</template>
          </Card>
        </div>

      </div>

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 slide-in-from-b-64 animate-duration-3000' }"
           class="w-64 h-64 mt-8 DBox" >
        <svg viewBox="0 0 1000 1000">
          <path class="DPath" d="M0,0 L1000,0 L1000,1000 L0,1000 Z" />
        </svg>

        <div class="DContent">
          <Card class="w-52 h-52" style="overflow: hidden">
            <template #header >
              <div class="w-24 h-24">
                <img alt="user header" src="../assets/logo.png" />
              </div>
            </template>
            <template #title>Advanced Card</template>
          </Card>
        </div>

      </div>

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 spin-in-[-360deg] slide-in-from-t-0 animate-duration-3000' }"
           class="w-64 h-64 mt-8 DBox" >
        <svg viewBox="0 0 1000 1000">
          <path class="DPath" d="M0,0 L1000,0 L1000,1000 L0,1000 Z" />
        </svg>

        <div class="DContent">
          <Card class="w-52 h-52" style="overflow: hidden">
            <template #header >
              <div class="w-24 h-24">
                <img alt="user header" src="../assets/logo.png" />
              </div>
            </template>
            <template #title>Advanced Card</template>
          </Card>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import Card from 'primevue/card';

export default {
  name: 'HomeView',
  components: {Card},

  data(){
    return {

      data:{

      }
    }
  },

  methods: {
    JumpRouter(router) {
      this.$router.push(router);
    },

    JumpUrl(url) {
      window.open(url, '_blank');
    }
  }
}
</script>

<style lang="scss" scoped>

.DBox {
  border: 1px solid #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.DBox:hover {
  transform: translateY(-10px);
}

.DPath {
  fill: none;
  stroke-dasharray: 1000;
  stroke-dashoffset: 4000;
}

.DBox:hover .DPath {
  stroke: #c4b5fd;
  stroke-width: 10;
  animation: flowMove 5s linear infinite;
}

.DContent {
  position: absolute;

  ::v-deep .p-card-header {
    display: flex;
    justify-content: center;
  }
}

@keyframes flowMove {
  0%    { stroke-dashoffset: 4000; }
  100%  { stroke-dashoffset: 0; }
}

</style>
