<template>
  <div class="bodyOfManage">
    <div class="leftNavbar" :style="{width: withOfIconType}">
      <!--            头像区-->
      <div class="profileArea">
        <el-row class="block-col-2">
          <el-col :span="8">
            <el-dropdown trigger="click">
              <img v-if="user.sysUser.userName"  src="@/assets/images/touxiang.png">
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="userLogout">退出登录</el-dropdown-item>
                  <!--                             <el-dropdown-item>Action 2</el-dropdown-item>-->
                  <!--                             <el-dropdown-item>Action 3</el-dropdown-item>-->
                  <!--                             <el-dropdown-item>Action 4</el-dropdown-item>-->
                  <!--                             <el-dropdown-item>Action 5</el-dropdown-item>-->
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </div>

<!--           导航栏区-->
      <div class="barArea">
<!--               文字导航栏-->
        <transition name="animate__animated animate__bounce"
                    enter-active-class="animate__fadeInUp"
                    leave-active-class="animate__zoomOut"
                    appear >
          <div v-show="flagOfShow" style="width: 100%;position: absolute">
            <div class="accordion">
              <div v-for="(item, index) in menuItems"
                  :key="index"
                  class="accordion-item">
                <!-- 菜单标题（可点击部分） -->
                <div class="accordion-header" @click="toggleMenu(index)">
                  <el-button type="text" @click="isOpen(index)">{{ item.menuName }}</el-button>
                </div>

                <!-- 子菜单（带过渡效果） -->
                <transition
                    name="slide"
                    @enter="enter"
                    @leave="leave"
                    @after-enter="afterEnter">
                  <div v-show="isOpen(index)" class="accordion-content">
                    <router-link v-for="(subItem, subIndex) in item.children"
                                 :key="subIndex"
                                  :to="subItem.path"
                                  class="submenu-link">
                      {{ subItem.menuName }}
                    </router-link>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </transition>
        <transition
            name="animate__animated animate__bounce"
            enter-active-class="animate__fadeInUp"
            leave-active-class="animate__zoomOut"
            appear >
<!--              图标导航栏-->
          <div v-show="!flagOfShow" style="width: 100%;">
            <el-tooltip class="item" effect="dark"  content="主页" placement="right">
              <router-link style="font-size: 20px" :to="{name:'Home'}"  active-class="active2">
                <li class="el-icon-s-home"></li>
              </router-link>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="其它" placement="right">
              <router-link style="font-size: 20px" to="#" active-class="active2">
                <li class="el-icon-coffee-cup"></li>
              </router-link>
            </el-tooltip>
<!--                  <el-tooltip class="item" effect="dark" content="温度检测" placement="right">-->
<!--                  <router-link style="font-size: 20px" :to="{name:'TemperatureDetection'}" active-class="active2"><li class="el-icon-sunny"></li></router-link>-->
<!--                  </el-tooltip>-->
          </div>
        </transition>
      </div>

<!--           转换格式按钮-->
      <div class="changeArea" @click="changeToIcon">
        <ul class="dv">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
    import request from "@/utils/request";

    export default {
        name: "LeftNavBar",
        data(){
            return{

              activeIndex: null, // 当前展开的菜单索引
              menuItems: [],



              withOfIconType:'100px',
              flagOfShow:true,
              flagOfPersonalCenter:true,
              user: JSON.parse(sessionStorage.getItem("loginUserInfo"))?JSON.parse(sessionStorage.getItem("loginUserInfo")):{},
            }
        },

        created() {
          let LoginUser = JSON.parse(sessionStorage.getItem("loginUserInfo"));
          this.menuItems = LoginUser.sysUser.menus;
        },
        methods:{
          // 切换菜单展开状态
          toggleMenu(index) {
            this.activeIndex = this.activeIndex === index ? null : index;
          },

          // 检查菜单是否展开
          isOpen(index) {
            return this.activeIndex === index;
          },

          // 过渡动画钩子
          enter(el) {
            el.style.height = 'auto';
            const height = getComputedStyle(el).height;
            el.style.height = '0';
            setTimeout(() => {
              el.style.height = height;
            });
          },

          leave(el) {
            el.style.height = getComputedStyle(el).height;
            setTimeout(() => {
              el.style.height = '0';
            });
          },

          afterEnter(el) {
            el.style.height = 'auto';
          },



          changeToIcon(){
                //文字导航栏
                // if(this.withOfIconType=== '100px') {
                //     this.withOfIconType='80px';
                //     this.flagOfShow= false
                // }else{
                //  //图标样式导航栏
                //     this.withOfIconType='100px';
                //     this.flagOfShow=true
                // }
                this.flagOfShow= !this.flagOfShow
            },

          userLogout(){
            request.post("/system/auth/logout").then(ref => {
              this.$router.push("/login");// 重定向
            }).catch((err)=>{
              console.log(err);
            });
          },

          personalCenterApper(){
                // this.flagOfPersonalCenter = !this.flagOfPersonalCenter
                // this.$bus.$emit("personalCenterChange",this.flagOfPersonalCenter)
              console.log('aaa')
          }
        },

        mounted() {
        //    绑定全局事件
        //     this.$bus.$on('updataAdurl',(data)=>{
        //
        //         this.user.adurl = data;
        //         console.log("@@@@@"+data)
        //     })
        },
        beforeDestroy() {
        //    解绑事件
            this.$bus.$off('updataAdurl')
        }

    }
</script>

<style lang="scss" scoped>
    .active{
        background-color: rgba(37,123,94,0.2);
        color: #257B5E;
    }
    .active2{
        color: #257B5E;
    }
    a{
        position: relative;
        text-decoration: none;
        display: block;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #3C3F41;
    }
    a::before{
        display: block;
        content: "";
        width: 3px;
        height: 50px;
        position: absolute;
        border-radius: 10px;
    }
    a:hover::before{
        background-color: #69717A;
    }
    .bodyOfManage{
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .leftNavbar{
        transition: 0.5s linear;
        overflow: hidden;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        height: 90vh;
        width: 9vw !important;
        background-color: #f7fbff;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .profileArea{

        width: 100%;
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .profileArea:hover img{
        cursor: pointer;
    }
    .barArea{
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        flex: 7;
        font-weight: bold;
        position: relative;
    }
    .profileArea img{
        border-radius: 10px;
        width: 50px;
        height:50px;
    }
    .changeArea{
        flex: 2;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      .dv {
        width: 5em;
        height: 5em;
        display: flex;
        justify-content: space-between;
      }

      .dv li {
        list-style:none;
        --c: lemonchiffon;
        --h: 10%;
        --t: 45%;
        width: 6px;
        background-color: var(--c);
        border-radius: 0.5em;
        position: relative;
        height: var(--h);
        top: var(--t);
      }

      .dv li:nth-child(1),
      .dv li:nth-child(9) {
        --c: orangered;
        --h: 1.1em;
        --t: 1.2em;
      }

      .dv li:nth-child(2),
      .dv li:nth-child(8) {
        --c: gold;
        --h: 2.5em;
        --t: 0.5em;
      }

      .dv li:nth-child(3),
      .dv li:nth-child(7) {
        --c: limegreen;
        --h: 3.5em;
        --t: 0em;
      }

      .dv li:nth-child(4),
      .dv li:nth-child(6) {
        --c:dodgerblue;
        --h: 3.4em;
        --t: 0.5em;
      }

      .dv li:nth-child(5) {
        --c: mediumpurple;
        --h: 3.4em;
        --t: 1em;
      }
    }

    .treeClass {
      background-color: #f7fbff;

      .el-tree-node__content{
        white-space:5vw !important;;
      }

    }


    .accordion {
      width: 250px;
      font-family: Arial, sans-serif;
    }

    .accordion-item {
      border-bottom: 1px solid #eee;
    }

    .accordion-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 15px;
      background-color: #f7fbff;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .accordion-header:hover {
      background-color: #ffffff;
    }

    .title-link {
      flex-grow: 1;
      text-decoration: none;
      color: #2c3e50;
      font-weight: bold;
    }

    //.indicator {
    //  padding-left: 10px;
    //  font-size: 12px;
    //}

    .accordion-content {
      background-color: #fff;
      overflow: hidden;
    }

    .submenu-link {
      display: block;
      width: 9vw;
      text-align: center;
      font-size: 75%;
      text-decoration: none;
      color: #409eff;
      transition: all 0.2s;
    }

    .submenu-link:hover {
      //background-color: #f0f4f8;
      background-color: #f1f3ff;
      color: #f67bb5;
    }

    .submenu-link.router-link-exact-active {
      width: 9vw;
      text-align: center;
      color: #b76fff;
      background-color: #f1f3ff;
    }

    /* 过渡动画 */
    .slide-enter-active,
    .slide-leave-active {
      transition: height 1s ease-in-out;
      overflow: hidden;
    }

    .slide-enter,
    .slide-leave-to {
      height: 0 !important;
    }


</style>
