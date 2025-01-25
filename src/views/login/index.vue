<template>
  <div class="login">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />

    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <form class="form">
        <div class="form-item">
          <input
            class="inp"
            maxlength="11"
            placeholder="请输入手机号码"
            type="text"
            v-model="mobile"
          />
        </div>
        <div class="form-item">
          <input
            class="inp"
            maxlength="5"
            placeholder="请输入图形验证码"
            type="text"
            v-model="picCode"
          />
          <img v-if="picUrl" :src="picUrl" alt="" @click="getPicCode" />
        </div>
        <div class="form-item">
          <input class="inp" v-model="msgCode" placeholder="请输入短信验证码" type="text" />
          <button @click="getCode">
            {{ second === totalSecond ? '获取验证码' : `${second}秒后重新获取` }}
          </button>
        </div>
      </form>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, getPhoneCode, codeLogin } from '@/api/login'
export default {
  name: 'loginIndex',
  data () {
    return {
      picKey: '',
      picUrl: '',
      totalSecond: 60,
      second: 60,
      timer: null,

      mobile: '',
      picCode: '',

      msgCode: ''
    }
  },
  created () {
    this.getPicCode()
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      const {
        data: { base64, key }
      } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
    },
    // 获取短信验证码
    async getCode (event) {
      event.preventDefault()
      if (!this.validFn()) return
      if (!this.timer && this.second === this.totalSecond) {
        const res = await getPhoneCode(
          this.picCode,
          this.picKey,
          this.mobile
        )
        if (res.status === 200) {
          this.$toast('验证码发送成功')
        }
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    // 登录
    async  login () {
      if (!this.validFn()) return
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的验证码')
        return
      }
      const res = await codeLogin(false, this.mobile, {}, this.msgCode)
      // if (res.status !== 200) {
      //   this.$toast(res.message)
      //   return
      // }
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')

      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    },
    validFn () {
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号码')
        return false
      }
      if (!/^[0-9a-zA-Z]{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.login {
  background-color: #fff;
  height: 100vh;
  .container {
    padding: 49px 29px;

    .title {
      margin-bottom: 20px;
      h3 {
        font-size: 26px;
        font-weight: normal;
      }
      p {
        line-height: 40px;
        font-size: 14px;
        color: #b8b8b8;
      }
    }

    .form-item {
      border-bottom: 1px solid #f3f1f2;
      padding: 8px;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      .inp {
        display: block;
        border: none;
        outline: none;
        height: 32px;
        font-size: 14px;
        flex: 1;
        background-color: transparent;
      }
      img {
        width: 94px;
        height: 31px;
      }
      button {
        height: 31px;
        border: none;
        font-size: 13px;
        color: #4a90e2;
        background-color: transparent;
        padding-right: 9px;
      }
    }

    .login-btn {
      width: 100%;
      height: 42px;
      margin-top: 39px;
      // 蓝色登录按钮
      background: linear-gradient(90deg, #4a90e2 0%, #4a90e2 100%);
      color: #fff;
      border-radius: 39px;
      box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
      letter-spacing: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
