<template>
  <div class="card flex flex-col items-center overflow-hidden">
    <div class="flex flex-col items-center gap-2">
      <span class="text-xl font-medium">下拉查看更多</span>
      <span class="animate-bounce h-8 w-8 bg-primary text-primary-contrast rounded-full inline-flex items-center justify-center">
                <i class="pi pi-arrow-down" />
      </span>
    </div>

    <div class="w-64 h-64 mt-2 DBox" >
      <svg viewBox="0 0 1000 1000">
        <path class="DPath" d="M0,0 L1000,0 L1000,1000 L0,1000 Z" />
      </svg>

      <div class="DContent">
        <Card class="w-52 h-52" style="overflow: hidden">
          <template #header >
            <div class="w-32 h-32">
              <img alt="user header" src="../assets/logo.png" />
            </div>
          </template>
          <template #title>Advanced Card</template>
        </Card>
      </div>



    </div>

    <div class="h-[50rem]"></div>

    <div class="flex flex-wrap justify-center gap-8">

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 slide-in-from-l-64 animate-duration-3000', leaveClass: 'animate-leave fade-out-0' }"
          class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
        <div class="rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center">
          <i class="pi pi-user !text-2xl"></i>
        </div>
        <span class="text-2xl font-bold">Individual</span>
        <span class="text-muted-color text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      </div>

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 animate-duration-3000', leaveClass: 'animate-leave fade-out-0' }"
          class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4" @click="Jump">
        <div class="rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center">
          <i class="pi pi-users !text-2xl"></i>
        </div>
        <span class="text-2xl font-bold">进入菜单</span>
        <span class="text-muted-color text-center">————进入菜单————</span>
      </div>

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 slide-in-from-r-64 animate-duration-3000', leaveClass: 'animate-leave fade-out-0' }"
          class="flex flex-col border border-surface shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
        <div class="rounded-full bg-primary text-primary-contrast w-12 h-12 flex items-center justify-center">
          <i class="pi pi-building !text-2xl"></i>
        </div>
        <span class="text-2xl font-bold">Enterprise</span>
        <span class="text-muted-color text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      </div>

    </div>

    <div class="h-[1rem]"></div>

    <div class="flex flex-wrap justify-center gap-8">

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 slide-in-from-t-64 animate-duration-3000' }" class="flex flex-col border border-primary-200 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" size="xlarge" />
        <span class="text-2xl font-medium">Jenna Thompson</span>
        <span class="text-muted-color text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      </div>

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 slide-in-from-b-64 animate-duration-3000' }" class="flex flex-col border border-primary-200 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png" shape="circle" size="xlarge" />
        <span class="text-2xl font-medium">Isabel Garcia</span>
        <span class="text-muted-color text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      </div>

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 slide-in-from-t-64 animate-duration-3000' }" class="flex flex-col border border-primary-200 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" size="xlarge" />
        <span class="text-2xl font-medium">Xavier Mason</span>
        <span class="text-muted-color text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      </div>

    </div>

    <div class="h-[1rem]"></div>

    <div class="flex flex-wrap justify-center gap-8">
      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 spin-in-[360deg] slide-in-from-t-0 animate-duration-3000' }"
          class="flex flex-col bg-primary text-primary-contrast border-primary shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
        <span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">850K</span>
        <span class="text-2xl font-bold">Customers</span>
        <span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      </div>

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-50 slide-in-from-t-0 animate-duration-3000' }"
          class="flex flex-col bg-primary text-primary-contrast border-primary shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
        <span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">$1.5M</span>
        <span class="text-2xl font-bold">Revenue</span>
        <span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      </div>

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 spin-in-[-360deg] slide-in-from-t-0 animate-duration-3000' }"
          class="flex flex-col bg-primary text-primary-contrast border-primary shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
        <span class="bg-white/20 text-xl font-medium rounded-xl px-4 py-2">140K</span>
        <span class="text-2xl font-bold">Sales</span>
        <span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      </div>

    </div>

    <div class="h-[1rem]"></div>

    <div class="flex flex-wrap justify-center gap-8">
      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-50 animate-duration-3000' }" class="flex flex-col bg-purple-500 text-white border-purple-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
        <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
          <i class="pi pi-wifi !text-2xl"></i>
        </div>
        <span class="text-2xl font-bold">Bandwidth</span>
        <span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      </div>

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-75 animate-duration-3000' }" class="flex flex-col bg-teal-500 text-white border-teal-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
        <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
          <i class="pi pi-database !text-2xl"></i>
        </div>
        <span class="text-2xl font-bold">Storage</span>
        <span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
      </div>

      <div v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 zoom-in-[2] animate-duration-3000' }" class="flex flex-col bg-indigo-500 text-white border-indigo-500 shadow-lg justify-center items-center max-w-80 rounded-2xl p-8 gap-4">
        <div class="rounded-full border-2 border-white w-12 h-12 flex items-center justify-center">
          <i class="pi pi-arrows-v !text-2xl"></i>
        </div>
        <span class="text-2xl font-bold">Requests</span>
        <span class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
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
    Jump() {
      this.$router.push("/user");
    }
  }
}
</script>

<style scoped>

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
}

@keyframes flowMove {
  0%    { stroke-dashoffset: 4000; }
  100%  { stroke-dashoffset: 0; }
}

</style>
