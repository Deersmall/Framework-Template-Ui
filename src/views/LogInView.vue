<template>
  <div class="bigBox">
    <div class="box">
      <!-- 滑动盒子 -->
      <div class="pre-box" ref="preRef">
        <h1>WELCOME</h1>
        <p>JOIN US!</p>
        <div class="img-box">
          <img :src="flag == true ? imgList[1] : imgList[0]" alt="">
        </div>
        <span class="switchPrompt" @click="mySwitch">{{ switchPrompt }}</span>
      </div>
      <!-- 注册盒子 -->
      <div class="register-form">
        <!-- 标题盒子 -->
        <div class="title-box">
          <h1>注册</h1>
        </div>
        <!-- 输入框盒子 -->
        <div class="input-box">
          <input v-model="sysUser.userName" type="text" placeholder="用户名">
          <input v-model="sysUser.password" type="password" placeholder="密码">
          <input v-model="sysUser.verifyPassword" type="password" placeholder="确认密码">
        </div>
        <!-- 按钮盒子 -->
        <div class="btn-box">
          <button @click="register">注册</button>
          <!-- 绑定点击事件 -->
        </div>
      </div>
      <!-- 登录盒子 -->
      <div class="login-form">
        <!-- 标题盒子 -->
        <div class="title-box">
          <h1>登录</h1>
        </div>
        <!-- 输入框盒子 -->
        <div class="input-box">
          <input v-model="sysUser.userName" type="text" placeholder="用户名">
          <input v-model="sysUser.password" type="password" placeholder="密码">
        </div>
        <!-- 按钮盒子 -->
        <div class="btn-box">
          <button @click="login">登录</button>
        </div>
        <div class="Visitor-login">
          <span @click="VisitorLogin">游客登录</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import request from "@/utils/request";
import CryptoJS from  "crypto-js"
import { ElMessage } from 'element-plus'

const { ref } = require("@vue/reactivity");
const preRef = ref((''))
const imgList = ref([require('@/assets/img/wuwu.jpeg'),require('@/assets/img/waoku.jpg')])
let flag = ref(true)

export default {
  name: "Login",
  components: {  },
  data() {
    return {
      sysUser:{
        userName:'',
        password:'',
        verifyPassword:'',
      },

      switchPrompt:"没有账号?去注册",
    };
  },


  created() {
    /*打开页面触发*/
  },
  methods:{


    // 用户登录
    login() {
      request.post("/system/auth/login",this.sysUser).then(res => {
        if (res.code === 200){
          sessionStorage.setItem("loginUserInfo",JSON.stringify(res.data.loginUserInfo));
          debugger
          this.$router.push("/main/home");// 重定向
        }
      }).catch((err)=>{
        console.log(err);
      });

    },

    // 游客登录
    VisitorLogin(){
      request.post("/deerLogin/visitorLogin").then(ref => {
        if (ref.code === 200){
          this.$router.push("/main/home");// 重定向
        }
      }).catch((err)=>{
        console.log(err);
      });
    },

    // 用户注册
    register() {
      // 密码不为空 且 两个密码相等
      if (!this.sysUser.password || !this.sysUser.verifyPassword) throw "aaa";
       if(this.sysUser.password == this.sysUser.verifyPassword) {
        let aesEncryptPsd = this.aesMinEncrypt("Deer_Small_85866","Deer_Small_85800",this.sysUser.password);
        let postData = JSON.parse(JSON.stringify(this.sysUser));
        postData.password = aesEncryptPsd

        request.post("/deerLogin/register",postData).then(ref => {
          if (ref.code === 200){
            ElMessage({
              message: '用户  ' + ref.data.id + '  注册成功，可切换至登录页进行登录',
              type: 'success',
            })
          }

          console.log(ref)
        }).catch((err)=>{
          console.log(err);
        });

      }
    },

    // 加密算法
    aesMinEncrypt(key, iv, psd){
      let _psd = CryptoJS.enc.Utf8.parse(psd);
      let  _key = CryptoJS.enc.Utf8.parse(key);
      let _iv = CryptoJS.enc.Utf8.parse(iv);
      let encrypted = CryptoJS.AES.encrypt(_psd, _key, {
        iv: _iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    },

    // 登录/注册 切换
    mySwitch(){
     // 初始化数据
      this.sysUser = {
        userName:'',
        password:'',
        verifyPassword:'',
      }

      if (flag.value) {
        preRef.value.style.background = '@c9e0ed'
        preRef.value.style.transform = 'translateX(100%)'
        this.switchPrompt = "已有账号?去登录"
      }else {
        preRef.value.style.background = '@edd4dc'
        preRef.value.style.transform = 'translateX(0%)'
        this.switchPrompt = "没有账号?去注册"
      }
      flag.value = !flag.value
    }

  }
}
</script>

<script setup>
// const { ref } = require("@vue/reactivity");
// const preRef = ref((''))
// const imgList = ref([require('@/assets/img/wuwu.jpeg'),require('@/assets/img/waoku.jpg')])
// let flag = ref(true)
// let switchPrompt = "没有账号?去注册"
// const mySwitch = () => {
//   if (flag.value) {
//     preRef.value.style.background = '@c9e0ed'
//     preRef.value.style.transform = 'translateX(100%)'
//     switchPrompt = "已有账号?去登录"
//   }else {
//     preRef.value.style.background = '@edd4dc'
//     preRef.value.style.transform = 'translateX(0%)'
//     switchPrompt = "没有账号?去注册"
//
//   }
//   flag.value = !flag.value
// }
</script>

<style lang="scss" scoped>
/* 去除input的轮廓 */
input {
  outline: none;
}

.bigBox {
  margin: 0;
  padding: 0;
  /* 溢出隐藏 */
  height: 100vh;
  overflow-x: hidden;
  display: flex;
  /* 渐变方向从左到右 */
  background: linear-gradient(to right, rgb(247, 209, 215), rgb(191, 227, 241));
}

//span {
//  position: absolute;
//  z-index: 0;
//  bottom: 0;
//  border-radius: 50%;
//  /* 径向渐变 */
//  background: radial-gradient(circle at 72% 28%, #fff 3px, #ff7edf 8%, #5b5b5b, #aad7f9 100%);
//  /* 泡泡内阴影 */
//  box-shadow: inset 0 0 6px #fff,
//  inset 3px 0 6px #eaf5fc,
//  inset 2px -2px 10px #efcde6,
//  inset 0 0 60px #f9f6de,
//  0 0 20px #fff;
//  /* 动画 */
//  animation: myMove 4s linear infinite;
//}


@keyframes myMove {
  0% {
    transform: translateY(0%);
    opacity: 1;
  }

  50% {
    transform: translate(10%, -1000%);
  }

  75% {
    transform: translate(-20%, -1200%);
  }

  99% {
    opacity: .9;
  }

  100% {
    transform: translateY(-1800%) scale(1.5);
    opacity: 0;
  }
}

/* 最外层的大盒子 */
.box {
  width: 1050px;
  height: 600px;
  display: flex;
  /* 相对定位 */
  position: relative;
  z-index: 2;
  margin: auto;
  /* 设置圆角 */
  border-radius: 8px;
  /* 设置边框 */
  border: 1px solid rgba(255, 255, 255, .6);
  /* 设置盒子阴影 */
  box-shadow: 2px 1px 19px rgba(0, 0, 0, .1);
}

/* 滑动的盒子 */
.pre-box {
  /* 宽度为大盒子的一半 */
  width: 50%;
  /* width: var(--width); */
  height: 100%;
  /* 绝对定位 */
  position: absolute;
  /* 距离大盒子左侧为0 */
  left: 0;
  /* 距离大盒子顶部为0 */
  top: 0;
  z-index: 99;
  border-radius: 4px;
  background-color: #edd4dc;
  box-shadow: 2px 1px 19px rgba(0, 0, 0, .1);
  /* 动画过渡，先加速再减速 */
  transition: 0.5s ease-in-out;
}

/* 滑动盒子的标题 */
.pre-box h1 {
  margin-top: 150px;
  text-align: center;
  /* 文字间距 */
  letter-spacing: 5px;
  color: white;
  /* 禁止选中 */
  user-select: none;
  /* 文字阴影 */
  text-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
}

/* 滑动盒子的文字 */
.pre-box {
  p{
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 20px 0;
    /* 禁止选中 */
    user-select: none;
    font-weight: bold;
    color: white;
    text-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
  }

  .switchPrompt{
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding: 5px 20px;
    /* 禁止选中 */
    user-select: none;
    font-weight: bold;
    color: white;
    text-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
  }
  .switchPrompt:hover{
    border-radius: 25px;
    background-color: #bfb0d7;
  }
}



/* 图片盒子 */
.img-box {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  /* 设置为圆形 */
  border-radius: 50%;
  /* 设置用户禁止选中 */
  user-select: none;
  overflow: hidden;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, .1);
}

/* 图片 */
.img-box img {
  width: 100%;
  transition: 0.5s;
}

/* 登录和注册盒子 */
.login-form,
.register-form {
  flex: 1;
  height: 100%;
}

/* 标题盒子 */
.title-box {
  height: 300px;
  line-height: 500px;

}

/* 标题 */
.title-box h1 {
  text-align: center;
  color: white;
  /* 禁止选中 */
  user-select: none;
  letter-spacing: 5px;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, .1);

}

/* 输入框盒子 */
.input-box {
  display: flex;
  /* 纵向布局 */
  flex-direction: column;
  /* 水平居中 */
  align-items: center;

  /* 输入框 */
  input {
    width: 60%;
    height: 40px;
    margin-bottom: 20px;
    text-indent: 10px;
    border: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 120px;
    /* 增加磨砂质感 */
    backdrop-filter: blur(10px);
  }

  input:focus {
    /* 光标颜色 */
    color: #666bbb;

  }

  /* 聚焦时隐藏文字 */
  input:focus::placeholder {
    opacity: 0;
  }
}

/* 按钮盒子 */
.btn-box {
  display: flex;
  justify-content: center;
}

/* 按钮 */
button {
  width: 100px;
  height: 30px;
  margin: 0 7px;
  line-height: 30px;
  border: none;
  border-radius: 4px;
  background-color: #69b3f0;
  color: white;
}

/* 按钮悬停时 */
button:hover {
  /* 鼠标小手 */
  cursor: pointer;
  /* 透明度 */
  opacity: .8;
}

/* 按钮文字 */
.btn-box p {
  height: 30px;
  line-height: 30px;
  /* 禁止选中 */
  user-select: none;
  font-size: 14px;
  color: white;

}

.btn-box p:hover {
  cursor: pointer;
  border-bottom: 1px solid white;
}
.Visitor-login {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: row;
  height: 20%;
  margin: 0 30px;
  /* 禁止选中 */
  user-select: none;
  font-size: 14px;
  color: #000000;
}
.Visitor-login span:hover {
  transform: scale(1.1);
  cursor: pointer;
  border-bottom: 2px solid #ffffff;
  background-color: #b0cfe9;
}
</style>
